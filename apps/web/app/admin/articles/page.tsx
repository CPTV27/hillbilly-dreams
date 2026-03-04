// apps/web/app/(admin)/articles/page.tsx
// Article list with status filters

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Articles' };

const STATUS_FILTERS = ['All', 'Draft', 'Review', 'Published'];

export default async function ArticlesPage() {
  // TODO: const articles = await prisma.article.findMany({ orderBy: { updatedAt: 'desc' } });

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Articles</h1>
          <p className="admin-page-sub">Magazine content — all status levels</p>
        </div>
        <a href="/articles/new" className="admin-btn admin-btn--primary">+ New Article</a>
      </div>

      <div className="admin-filter-bar">
        {STATUS_FILTERS.map((f) => (
          <button key={f} className={`admin-filter-btn ${f === 'All' ? 'admin-filter-btn--active' : ''}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>City</th>
              <th>Author</th>
              <th>Status</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7}>
                <div className="admin-empty">
                  <p className="admin-empty__text">
                    No articles yet. <a href="/articles/new" style={{ color: 'var(--accent)' }}>Create the first one.</a>
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
