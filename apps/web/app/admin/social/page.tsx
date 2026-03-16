'use client';

// apps/web/app/admin/social/page.tsx
// Social media management — accounts, posts, AI content generation

import { useState, useEffect, useCallback } from 'react';

// ── Types ──

interface SocialAccount {
  id: number;
  platform: string;
  handle: string;
  brand: string;
  status: string;
  notes: string | null;
  createdAt: string;
  _count?: { posts: number };
}

interface SocialPost {
  id: number;
  accountId: number;
  content: string;
  mediaUrls: string[];
  postUrl: string | null;
  status: string;
  scheduledAt: string | null;
  publishedAt: string | null;
  sourceType: string | null;
  tags: string[];
  createdAt: string;
  account?: { platform: string; handle: string; brand: string };
}

const PLATFORMS = ['twitter', 'tiktok', 'instagram', 'threads', 'bluesky', 'linkedin'];
const BRANDS = ['bigmuddy', 'radio', 'magazine', 'touring', 'economics'];
const POST_STATUSES = ['all', 'draft', 'ready', 'published'];

const PLATFORM_LABELS: Record<string, string> = {
  twitter: 'Twitter/X',
  tiktok: 'TikTok',
  instagram: 'Instagram',
  threads: 'Threads',
  bluesky: 'Bluesky',
  linkedin: 'LinkedIn',
};

// ── Component ──

export default function SocialAdminPage() {
  // Tab state
  const [tab, setTab] = useState<'posts' | 'accounts' | 'generate'>('posts');

  // Accounts
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [accountsLoading, setAccountsLoading] = useState(true);

  // New account form
  const [newPlatform, setNewPlatform] = useState('twitter');
  const [newHandle, setNewHandle] = useState('');
  const [newBrand, setNewBrand] = useState('bigmuddy');
  const [accountError, setAccountError] = useState('');
  const [accountSuccess, setAccountSuccess] = useState('');

  // Posts
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postFilter, setPostFilter] = useState('all');

  // New/edit post
  const [editPost, setEditPost] = useState<Partial<SocialPost> | null>(null);
  const [postContent, setPostContent] = useState('');
  const [postAccountId, setPostAccountId] = useState<number | null>(null);
  const [postStatus, setPostStatus] = useState('draft');
  const [postUrl, setPostUrl] = useState('');
  const [postTags, setPostTags] = useState('');
  const [postError, setPostError] = useState('');
  const [postSuccess, setPostSuccess] = useState('');
  const [postSaving, setPostSaving] = useState(false);

  // AI Generate
  const [genPlatform, setGenPlatform] = useState('twitter');
  const [genBrand, setGenBrand] = useState('bigmuddy');
  const [genPrompt, setGenPrompt] = useState('');
  const [genSource, setGenSource] = useState('');
  const [genResults, setGenResults] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState('');

  // ── Fetch ──

  const fetchAccounts = useCallback(async () => {
    try {
      const res = await fetch('/api/social/accounts');
      const json = await res.json();
      setAccounts(json.data ?? []);
    } catch {
      // silent
    } finally {
      setAccountsLoading(false);
    }
  }, []);

  const fetchPosts = useCallback(async () => {
    try {
      const url = postFilter === 'all'
        ? '/api/social/posts'
        : `/api/social/posts?status=${postFilter}`;
      const res = await fetch(url);
      const json = await res.json();
      setPosts(json.data ?? []);
    } catch {
      // silent
    } finally {
      setPostsLoading(false);
    }
  }, [postFilter]);

  useEffect(() => { fetchAccounts(); }, [fetchAccounts]);
  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  // ── Account handlers ──

  async function handleCreateAccount(e: React.FormEvent) {
    e.preventDefault();
    if (!newHandle.trim()) return;
    setAccountError('');
    setAccountSuccess('');

    try {
      const res = await fetch('/api/social/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform: newPlatform, handle: newHandle.trim(), brand: newBrand }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setAccountError(data.error ?? 'Failed to create account');
      } else {
        setAccountSuccess(`Added ${PLATFORM_LABELS[newPlatform]} account: ${newHandle}`);
        setNewHandle('');
        await fetchAccounts();
      }
    } catch {
      setAccountError('Network error');
    }
  }

  async function handleDeleteAccount(id: number, label: string) {
    if (!confirm(`Delete ${label}? All posts will be removed.`)) return;
    try {
      await fetch(`/api/social/accounts/${id}`, { method: 'DELETE' });
      await fetchAccounts();
      await fetchPosts();
    } catch {
      alert('Failed to delete account');
    }
  }

  // ── Post handlers ──

  function startNewPost() {
    setEditPost({});
    setPostContent('');
    setPostAccountId(accounts[0]?.id ?? null);
    setPostStatus('draft');
    setPostUrl('');
    setPostTags('');
    setPostError('');
    setPostSuccess('');
  }

  function startEditPost(post: SocialPost) {
    setEditPost(post);
    setPostContent(post.content);
    setPostAccountId(post.accountId);
    setPostStatus(post.status);
    setPostUrl(post.postUrl ?? '');
    setPostTags(post.tags.join(', '));
    setPostError('');
    setPostSuccess('');
  }

  async function handleSavePost(e: React.FormEvent) {
    e.preventDefault();
    if (!postContent.trim() || !postAccountId) return;
    setPostSaving(true);
    setPostError('');
    setPostSuccess('');

    const payload = {
      accountId: postAccountId,
      content: postContent.trim(),
      status: postStatus,
      postUrl: postUrl.trim() || null,
      tags: postTags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    try {
      const isEdit = editPost?.id;
      const res = await fetch(
        isEdit ? `/api/social/posts/${editPost.id}` : '/api/social/posts',
        {
          method: isEdit ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setPostError(data.error ?? 'Failed to save post');
      } else {
        setPostSuccess(isEdit ? 'Post updated' : 'Post created');
        setEditPost(null);
        await fetchPosts();
      }
    } catch {
      setPostError('Network error');
    } finally {
      setPostSaving(false);
    }
  }

  async function handleDeletePost(id: number) {
    if (!confirm('Delete this post?')) return;
    try {
      await fetch(`/api/social/posts/${id}`, { method: 'DELETE' });
      await fetchPosts();
    } catch {
      alert('Failed to delete post');
    }
  }

  async function handleMarkPublished(post: SocialPost) {
    try {
      await fetch(`/api/social/posts/${post.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'published',
          publishedAt: new Date().toISOString(),
          postUrl: post.postUrl,
        }),
      });
      await fetchPosts();
    } catch {
      alert('Failed to update post');
    }
  }

  // ── AI Generate handler ──

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!genPrompt.trim() && !genSource.trim()) return;
    setGenerating(true);
    setGenError('');
    setGenResults([]);

    try {
      const res = await fetch('/api/social/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: genPlatform,
          brand: genBrand,
          prompt: genPrompt.trim(),
          sourceContent: genSource.trim(),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setGenError(data.error ?? 'Generation failed');
      } else {
        const data = await res.json();
        setGenResults(data.posts ?? []);
      }
    } catch {
      setGenError('Network error');
    } finally {
      setGenerating(false);
    }
  }

  function useGeneratedPost(text: string) {
    setTab('posts');
    startNewPost();
    setPostContent(text);
    // Find matching account for the generated platform
    const match = accounts.find((a) => a.platform === genPlatform);
    if (match) setPostAccountId(match.id);
  }

  // ── Render ──

  return (
    <>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Social Media</h1>
          <p className="admin-page-sub">
            {accounts.length} accounts, {posts.length} posts
          </p>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="admin-filter-bar" style={{ marginBottom: 'var(--space-6)' }}>
        {(['posts', 'accounts', 'generate'] as const).map((t) => (
          <button
            key={t}
            className={`admin-filter-btn${tab === t ? ' admin-filter-btn--active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t === 'posts' ? 'Posts' : t === 'accounts' ? 'Accounts' : 'AI Generate'}
          </button>
        ))}
      </div>

      {/* ════════════════════════════════════════════════════════ */}
      {/* POSTS TAB                                               */}
      {/* ════════════════════════════════════════════════════════ */}
      {tab === 'posts' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <div className="admin-filter-bar" style={{ marginBottom: 0 }}>
              {POST_STATUSES.map((s) => (
                <button
                  key={s}
                  className={`admin-filter-btn${postFilter === s ? ' admin-filter-btn--active' : ''}`}
                  onClick={() => setPostFilter(s)}
                >
                  {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
            <button className="admin-btn admin-btn--primary" onClick={startNewPost}>
              New Post
            </button>
          </div>

          {/* Post editor */}
          {editPost !== null && (
            <div className="admin-card" style={{ marginBottom: 'var(--space-5)' }}>
              <form onSubmit={handleSavePost}>
                <h3 style={{ margin: '0 0 var(--space-4)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>
                  {editPost.id ? 'Edit Post' : 'New Post'}
                </h3>
                <div className="social-editor-row">
                  <div className="admin-form-group" style={{ flex: 1 }}>
                    <label className="admin-label">Account</label>
                    <select
                      value={postAccountId ?? ''}
                      onChange={(e) => setPostAccountId(parseInt(e.target.value, 10))}
                      className="admin-select"
                    >
                      <option value="" disabled>Select account...</option>
                      {accounts.map((a) => (
                        <option key={a.id} value={a.id}>
                          {PLATFORM_LABELS[a.platform] ?? a.platform} — {a.handle} ({a.brand})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Status</label>
                    <select value={postStatus} onChange={(e) => setPostStatus(e.target.value)} className="admin-select">
                      <option value="draft">Draft</option>
                      <option value="ready">Ready</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Content</label>
                  <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="admin-textarea"
                    rows={4}
                    placeholder="Write your post..."
                    maxLength={2200}
                  />
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-disabled)', textAlign: 'right' }}>
                    {postContent.length} chars
                  </div>
                </div>
                <div className="social-editor-row">
                  <div className="admin-form-group" style={{ flex: 1 }}>
                    <label className="admin-label">Post URL (paste after publishing)</label>
                    <input
                      type="url"
                      value={postUrl}
                      onChange={(e) => setPostUrl(e.target.value)}
                      className="admin-input"
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                  <div className="admin-form-group" style={{ flex: 1 }}>
                    <label className="admin-label">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={postTags}
                      onChange={(e) => setPostTags(e.target.value)}
                      className="admin-input"
                      placeholder="#bigmuddy, #blues, #mississippi"
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                  <button type="submit" className="admin-btn admin-btn--primary" disabled={postSaving || !postContent.trim() || !postAccountId}>
                    {postSaving ? 'Saving...' : editPost.id ? 'Update Post' : 'Create Post'}
                  </button>
                  <button type="button" className="admin-btn admin-btn--ghost" onClick={() => setEditPost(null)}>
                    Cancel
                  </button>
                  {postError && <span style={{ color: 'var(--error)', fontSize: 'var(--text-sm)' }}>{postError}</span>}
                  {postSuccess && <span style={{ color: 'var(--success)', fontSize: 'var(--text-sm)' }}>{postSuccess}</span>}
                </div>
              </form>
            </div>
          )}

          {/* Post list */}
          {postsLoading ? (
            <div className="admin-empty"><p className="admin-empty__text">Loading posts...</p></div>
          ) : posts.length === 0 ? (
            <div className="admin-empty">
              <p className="admin-empty__text">No posts yet. Create one or use AI Generate.</p>
            </div>
          ) : (
            <div className="social-posts-list">
              {posts.map((post) => (
                <div key={post.id} className="social-post-card admin-card">
                  <div className="social-post-card__header">
                    <span className={`admin-badge admin-badge--${post.status === 'published' ? 'success' : post.status === 'ready' ? 'info' : 'default'}`}>
                      {post.status}
                    </span>
                    <span className="social-post-card__platform">
                      {PLATFORM_LABELS[post.account?.platform ?? ''] ?? post.account?.platform} — {post.account?.handle}
                    </span>
                    <span className="social-post-card__date">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="social-post-card__content">{post.content}</p>
                  {post.tags.length > 0 && (
                    <div className="social-post-card__tags">
                      {post.tags.map((t) => <span key={t} className="social-post-card__tag">{t}</span>)}
                    </div>
                  )}
                  {post.postUrl && (
                    <a href={post.postUrl} target="_blank" rel="noopener noreferrer" className="social-post-card__link">
                      View post
                    </a>
                  )}
                  <div className="social-post-card__actions">
                    <button className="admin-btn admin-btn--ghost" onClick={() => startEditPost(post)}>Edit</button>
                    {post.status !== 'published' && (
                      <button className="admin-btn admin-btn--ghost" onClick={() => handleMarkPublished(post)}>
                        Mark Published
                      </button>
                    )}
                    <button className="admin-btn admin-btn--danger" onClick={() => handleDeletePost(post.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ════════════════════════════════════════════════════════ */}
      {/* ACCOUNTS TAB                                            */}
      {/* ════════════════════════════════════════════════════════ */}
      {tab === 'accounts' && (
        <>
          <div className="admin-card" style={{ marginBottom: 'var(--space-5)' }}>
            <h3 style={{ margin: '0 0 var(--space-4)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>
              Add Account
            </h3>
            <form onSubmit={handleCreateAccount}>
              <div className="social-editor-row">
                <div className="admin-form-group">
                  <label className="admin-label">Platform</label>
                  <select value={newPlatform} onChange={(e) => setNewPlatform(e.target.value)} className="admin-select">
                    {PLATFORMS.map((p) => <option key={p} value={p}>{PLATFORM_LABELS[p]}</option>)}
                  </select>
                </div>
                <div className="admin-form-group" style={{ flex: 1 }}>
                  <label className="admin-label">Handle</label>
                  <input
                    type="text"
                    value={newHandle}
                    onChange={(e) => setNewHandle(e.target.value)}
                    className="admin-input"
                    placeholder="@bigmuddymedia"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Brand</label>
                  <select value={newBrand} onChange={(e) => setNewBrand(e.target.value)} className="admin-select">
                    {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button type="submit" className="admin-btn admin-btn--primary" disabled={!newHandle.trim()}>
                    Add Account
                  </button>
                </div>
              </div>
            </form>
            {accountError && <div className="media-upload-msg media-upload-msg--error">{accountError}</div>}
            {accountSuccess && <div className="media-upload-msg media-upload-msg--success">{accountSuccess}</div>}
          </div>

          {accountsLoading ? (
            <div className="admin-empty"><p className="admin-empty__text">Loading accounts...</p></div>
          ) : accounts.length === 0 ? (
            <div className="admin-empty"><p className="admin-empty__text">No accounts yet. Add your first one above.</p></div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Platform</th>
                    <th>Handle</th>
                    <th>Brand</th>
                    <th>Posts</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((a) => (
                    <tr key={a.id}>
                      <td>{PLATFORM_LABELS[a.platform] ?? a.platform}</td>
                      <td><strong>{a.handle}</strong></td>
                      <td>{a.brand}</td>
                      <td>{a._count?.posts ?? 0}</td>
                      <td><span className={`admin-badge admin-badge--${a.status === 'active' ? 'success' : 'default'}`}>{a.status}</span></td>
                      <td>
                        <button
                          className="admin-btn admin-btn--danger"
                          style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-1) var(--space-2)' }}
                          onClick={() => handleDeleteAccount(a.id, `${a.platform}/${a.handle}`)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* ════════════════════════════════════════════════════════ */}
      {/* AI GENERATE TAB                                         */}
      {/* ════════════════════════════════════════════════════════ */}
      {tab === 'generate' && (
        <>
          <div className="admin-card">
            <h3 style={{ margin: '0 0 var(--space-4)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>
              AI Content Generator
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
              Generate platform-specific social posts from a prompt or source content. Each brand has its own voice.
            </p>
            <form onSubmit={handleGenerate}>
              <div className="social-editor-row">
                <div className="admin-form-group">
                  <label className="admin-label">Platform</label>
                  <select value={genPlatform} onChange={(e) => setGenPlatform(e.target.value)} className="admin-select" disabled={generating}>
                    {PLATFORMS.map((p) => <option key={p} value={p}>{PLATFORM_LABELS[p]}</option>)}
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Brand Voice</label>
                  <select value={genBrand} onChange={(e) => setGenBrand(e.target.value)} className="admin-select" disabled={generating}>
                    {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Prompt / Direction</label>
                <input
                  type="text"
                  value={genPrompt}
                  onChange={(e) => setGenPrompt(e.target.value)}
                  className="admin-input"
                  placeholder="Promote the new city guide for Clarksdale..."
                  disabled={generating}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Source Content (optional — paste article, newsletter, etc.)</label>
                <textarea
                  value={genSource}
                  onChange={(e) => setGenSource(e.target.value)}
                  className="admin-textarea"
                  rows={4}
                  placeholder="Paste article text, newsletter copy, event description, or other content to transform into social posts..."
                  disabled={generating}
                />
              </div>
              <button
                type="submit"
                className="admin-btn admin-btn--primary"
                disabled={generating || (!genPrompt.trim() && !genSource.trim())}
              >
                {generating ? 'Generating...' : 'Generate Posts'}
              </button>
              {genError && <div className="media-upload-msg media-upload-msg--error" style={{ marginTop: 'var(--space-3)' }}>{genError}</div>}
            </form>
          </div>

          {/* Generated results */}
          {genResults.length > 0 && (
            <div style={{ marginTop: 'var(--space-5)' }}>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
                Generated Options
              </h3>
              <div className="social-gen-results">
                {genResults.map((text, i) => (
                  <div key={i} className="social-gen-card admin-card">
                    <p className="social-gen-card__text">{text}</p>
                    <div className="social-gen-card__meta">
                      <span>{text.length} chars</span>
                      <button className="admin-btn admin-btn--primary" onClick={() => useGeneratedPost(text)}>
                        Use This
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <style>{`
        .social-editor-row {
          display: flex;
          gap: var(--space-4);
          flex-wrap: wrap;
        }

        /* ── Post list ── */
        .social-posts-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }
        .social-post-card__header {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-3);
        }
        .social-post-card__platform {
          font-size: var(--text-sm);
          color: var(--text-muted);
          font-weight: 600;
        }
        .social-post-card__date {
          font-size: var(--text-xs);
          color: var(--text-disabled);
          margin-left: auto;
        }
        .social-post-card__content {
          font-size: var(--text-sm);
          line-height: 1.6;
          color: var(--text);
          margin: 0 0 var(--space-3);
          white-space: pre-wrap;
        }
        .social-post-card__tags {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
          margin-bottom: var(--space-3);
        }
        .social-post-card__tag {
          font-size: var(--text-xs);
          background: var(--surface-2);
          color: var(--text-muted);
          padding: 2px var(--space-2);
          border-radius: var(--radius-sm);
        }
        .social-post-card__link {
          font-size: var(--text-xs);
          color: var(--accent);
          display: inline-block;
          margin-bottom: var(--space-3);
        }
        .social-post-card__actions {
          display: flex;
          gap: var(--space-2);
        }
        .social-post-card__actions .admin-btn {
          font-size: var(--text-xs) !important;
          padding: var(--space-1) var(--space-2) !important;
        }

        /* ── Generated results ── */
        .social-gen-results {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }
        .social-gen-card__text {
          font-size: var(--text-sm);
          line-height: 1.6;
          color: var(--text);
          margin: 0 0 var(--space-3);
          white-space: pre-wrap;
        }
        .social-gen-card__meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: var(--text-xs);
          color: var(--text-disabled);
        }

        /* ── Badges ── */
        .admin-badge {
          display: inline-block;
          font-size: var(--text-xs);
          font-weight: 600;
          padding: 2px var(--space-2);
          border-radius: var(--radius-sm);
          text-transform: capitalize;
        }
        .admin-badge--success {
          background: var(--success-muted);
          color: var(--success);
        }
        .admin-badge--info {
          background: hsl(210 80% 95%);
          color: hsl(210 80% 40%);
        }
        .admin-badge--default {
          background: var(--surface-2);
          color: var(--text-muted);
        }

        @media (max-width: 640px) {
          .social-editor-row {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
