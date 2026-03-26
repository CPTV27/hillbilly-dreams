// lib/embedding-pipeline.ts
// Embedding pipeline for the Deep South Data Platform.
// Embeds DirectoryBusiness records and Articles into pgvector via Vertex AI.

import { prisma } from '@/lib/db';
import { generateEmbedding, generateEmbeddings } from '@/lib/vertex-embeddings';
import { chunkAndEmbed } from '@/lib/semantic-chunker';

/**
 * Embed a single DirectoryBusiness record.
 * Constructs descriptive text from business fields, generates a single embedding,
 * and upserts into the Embedding table.
 */
export async function embedDirectoryBusiness(businessId: number): Promise<void> {
  const biz = await prisma.directoryBusiness.findUnique({
    where: { id: businessId },
  });

  if (!biz) throw new Error(`DirectoryBusiness ${businessId} not found`);

  // Construct rich text for embedding
  const text = [
    `${biz.name} in ${biz.city}, ${biz.state}.`,
    `Category: ${biz.category}.`,
    biz.subcategory ? `Subcategory: ${biz.subcategory}.` : '',
    biz.description,
    biz.address ? `Address: ${biz.address}` : '',
    biz.spotlight ? `Editorial: ${biz.spotlight}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const vector = await generateEmbedding(text);
  const vectorStr = `[${vector.join(',')}]`;

  // Upsert embedding — raw SQL because Prisma doesn't support vector type natively
  await prisma.$executeRawUnsafe(
    `INSERT INTO "Embedding" ("entityType", "entityId", "chunkIndex", "content", "vector", "model", "createdAt")
     VALUES ($1, $2, $3, $4, $5::vector, $6, NOW())
     ON CONFLICT ("entityType", "entityId", "chunkIndex")
     DO UPDATE SET "content" = $4, "vector" = $5::vector, "model" = $6, "createdAt" = NOW()`,
    'directory_business',
    String(businessId),
    0,
    text,
    vectorStr,
    'text-embedding-005'
  );
}

/**
 * Embed an Article using the semantic chunker.
 * Long articles get split into overlapping chunks, each embedded separately.
 */
export async function embedArticle(articleId: number): Promise<number> {
  const article = await prisma.article.findUnique({
    where: { id: articleId },
  });

  if (!article || !article.body) throw new Error(`Article ${articleId} not found or has no body`);

  const text = [article.title, article.excerpt || '', article.body].join('\n\n');

  const chunks = await chunkAndEmbed(text, generateEmbedding);

  // Upsert each chunk
  for (const chunk of chunks) {
    const vectorStr = `[${chunk.vector.join(',')}]`;
    await prisma.$executeRawUnsafe(
      `INSERT INTO "Embedding" ("entityType", "entityId", "chunkIndex", "content", "vector", "model", "createdAt")
       VALUES ($1, $2, $3, $4, $5::vector, $6, NOW())
       ON CONFLICT ("entityType", "entityId", "chunkIndex")
       DO UPDATE SET "content" = $4, "vector" = $5::vector, "model" = $6, "createdAt" = NOW()`,
      'article',
      String(articleId),
      chunk.id,
      chunk.text,
      vectorStr,
      'text-embedding-005'
    );
  }

  return chunks.length;
}

/**
 * Reindex all DirectoryBusiness records and published Articles.
 * Returns counts of processed entities and any errors.
 */
export async function reindexAll(): Promise<{ businesses: number; articles: number; errors: string[] }> {
  const errors: string[] = [];
  let businesses = 0;
  let articles = 0;

  // Embed all active directory businesses
  const allBusinesses = await prisma.directoryBusiness.findMany({
    where: { active: true },
    select: { id: true, name: true },
  });

  for (const biz of allBusinesses) {
    try {
      await embedDirectoryBusiness(biz.id);
      businesses++;
      console.log(`[embedding] Indexed business: ${biz.name}`);
    } catch (err) {
      const msg = `Failed to embed business ${biz.id} (${biz.name}): ${err}`;
      console.error(`[embedding] ${msg}`);
      errors.push(msg);
    }
  }

  // Embed all published articles
  const allArticles = await prisma.article.findMany({
    where: { status: 'published' },
    select: { id: true, title: true },
  });

  for (const article of allArticles) {
    try {
      const chunks = await embedArticle(article.id);
      articles++;
      console.log(`[embedding] Indexed article: ${article.title} (${chunks} chunks)`);
    } catch (err) {
      const msg = `Failed to embed article ${article.id} (${article.title}): ${err}`;
      console.error(`[embedding] ${msg}`);
      errors.push(msg);
    }
  }

  return { businesses, articles, errors };
}
