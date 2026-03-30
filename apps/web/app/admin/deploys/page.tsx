'use client';

import { useEffect, useState } from 'react';

interface DeployItem {
  env: 'production' | 'staging' | 'sandbox';
  name: string;
  branch: string;
  status: 'live' | 'building' | 'pending' | 'error';
  url?: string;
  lastCommit: string;
  lastCommitDate: string;
  features: string[];
}

// This data is fetched from the API — refreshes every 30 seconds
function useDeployData() {
  const [data, setData] = useState<DeployItem[] | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const refresh = async () => {
    try {
      const res = await fetch('/api/admin/deploys');
      if (res.ok) {
        const json = await res.json();
        setData(json.deployments);
        setLastRefresh(new Date());
      }
    } catch (err) {
      console.error('Failed to fetch deploy data:', err);
    }
  };

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 30000); // 30s auto-refresh
    return () => clearInterval(interval);
  }, []);

  return { data, lastRefresh, refresh };
}

const STATUS_COLORS: Record<string, string> = {
  live: '#22c55e',
  building: '#eab308',
  pending: '#8a8074',
  error: '#ef4444',
};

const ENV_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  production: { label: 'PRODUCTION', color: '#22c55e', bg: '#22c55e15' },
  staging: { label: 'STAGING', color: '#eab308', bg: '#eab30815' },
  sandbox: { label: 'SANDBOX', color: '#8a8074', bg: '#8a807415' },
};

export default function DeploysPage() {
  const { data, lastRefresh, refresh } = useDeployData();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary, #0a0a08)',
      color: 'var(--text-primary, #e8e0d4)',
      fontFamily: 'var(--font-body, Inter, sans-serif)',
      padding: '2rem',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}>
          <div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 0.25rem 0',
            }}>
              Deploy Status
            </h1>
            <p style={{
              margin: 0,
              color: '#5a5248',
              fontSize: '0.85rem',
            }}>
              Last refreshed: {lastRefresh.toLocaleTimeString()} &middot; Auto-refreshes every 30s
            </p>
          </div>
          <button
            onClick={refresh}
            style={{
              padding: '0.5rem 1.25rem',
              backgroundColor: '#1a1816',
              border: '1px solid #2a2520',
              borderRadius: '8px',
              color: '#c8943e',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            Refresh Now
          </button>
        </div>

        {!data ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem',
            color: '#5a5248',
          }}>
            Loading deployment status...
          </div>
        ) : (
          <>
            {/* Environment Groups */}
            {(['production', 'staging', 'sandbox'] as const).map(env => {
              const items = data.filter(d => d.env === env);
              if (items.length === 0) return null;
              const config = ENV_LABELS[env];

              return (
                <div key={env} style={{ marginBottom: '2.5rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1rem',
                  }}>
                    <span style={{
                      display: 'inline-block',
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: config.color,
                      boxShadow: env === 'production' ? `0 0 8px ${config.color}60` : 'none',
                    }} />
                    <h2 style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: config.color,
                      margin: 0,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}>
                      {config.label}
                    </h2>
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#5a5248',
                    }}>
                      {items.length} {items.length === 1 ? 'deployment' : 'deployments'}
                    </span>
                  </div>

                  <div style={{
                    display: 'grid',
                    gap: '0.75rem',
                  }}>
                    {items.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: '#151412',
                          border: `1px solid ${item.status === 'error' ? '#ef444440' : '#2a2520'}`,
                          borderRadius: '12px',
                          padding: '1.25rem 1.5rem',
                          display: 'grid',
                          gridTemplateColumns: '1fr auto',
                          gap: '1rem',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '0.5rem',
                          }}>
                            <h3 style={{
                              fontSize: '1.1rem',
                              fontWeight: 600,
                              color: '#ffffff',
                              margin: 0,
                            }}>
                              {item.name}
                            </h3>
                            <span style={{
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              color: STATUS_COLORS[item.status],
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              backgroundColor: `${STATUS_COLORS[item.status]}15`,
                            }}>
                              {item.status}
                            </span>
                          </div>

                          <div style={{
                            fontSize: '0.85rem',
                            color: '#8a8074',
                            marginBottom: '0.5rem',
                          }}>
                            <code style={{
                              backgroundColor: '#0a0a08',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontSize: '0.8rem',
                              color: '#c8943e',
                            }}>
                              {item.branch}
                            </code>
                            <span style={{ margin: '0 0.5rem' }}>&middot;</span>
                            <span>{item.lastCommit}</span>
                            <span style={{ margin: '0 0.5rem' }}>&middot;</span>
                            <span>{item.lastCommitDate}</span>
                          </div>

                          {item.features.length > 0 && (
                            <div style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: '0.375rem',
                            }}>
                              {item.features.map(f => (
                                <span
                                  key={f}
                                  style={{
                                    fontSize: '0.7rem',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    backgroundColor: '#1a1816',
                                    border: '1px solid #2a2520',
                                    color: '#8a8074',
                                  }}
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '0.5rem 1rem',
                              backgroundColor: '#1a1816',
                              border: '1px solid #2a2520',
                              borderRadius: '8px',
                              color: '#c8943e',
                              textDecoration: 'none',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Open &rarr;
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
