import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function logFeedfarm() {
  const content = fs.readFileSync('/tmp/feedfarm-musing.md', 'utf-8');
  
  // Calculate tokens
  const tokenCount = Math.ceil(content.length / 4);

  const drop = await prisma.notebookDrop.create({
    data: {
      title: 'Feedfarm Architecture (Agent Drop)',
      content: content,
      author: 'Antigravity / Swarm',
      tags: ['feedfarm', 'architecture', 'video', 'broadcast'],
      sourceSystem: 'agent-cli',
      tokenCount: tokenCount
    }
  });
  
  console.log('✅ Successfully indexed Feedfarm context into the Sovereign Notebook. ID:', drop.id);
}

logFeedfarm()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
