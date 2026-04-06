import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Production catalog — cameras, audio, streaming',
  description:
    'Bookable equipment and production packages at Studio C — ATEM, Pocket 6K, Hollyland, and live streaming infrastructure.',
};

const ROWS = [
  { sku: 'CAM-POCKET6K', name: 'Blackmagic Pocket Cinema Camera 6K', cat: 'Camera', note: 'Cinema RAW / ProRes — primary A-cam.' },
  { sku: 'SW-ATEM-ISO', name: 'ATEM Mini Extreme ISO', cat: 'Switching', note: '8 inputs, ISO record, streaming bridge.' },
  { sku: 'WL-HOLLY', name: 'Hollyland wireless video + comms', cat: 'Wireless', note: 'Zero-cable talent and director loop.' },
  { sku: 'MIC-AT4050', name: 'Audio-Technica AT4050 / AT2020', cat: 'Audio', note: 'Voice, instruments, room capture.' },
  { sku: 'LIGHT-APUTURE', name: 'Aputure & Godox studio lighting', cat: 'Lighting', note: 'Key, fill, accent — interview and performance.' },
  { sku: 'STREAM-RTMP', name: 'Custom RTMP / restream stack', cat: 'Streaming', note: 'YouTube, Facebook, custom endpoints.' },
] as const;

export default function StudioCatalogPage() {
  return (
    <div
      style={{
        maxWidth: 'var(--container-xl, 1100px)',
        margin: '0 auto',
        padding: 'var(--space-12, 3rem) var(--space-6, 1.5rem)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs, 0.75rem)',
          fontWeight: 700,
          color: 'var(--accent)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: 'var(--space-2)',
        }}
      >
        Studio C
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 700,
          color: 'var(--text)',
          margin: '0 0 var(--space-4)',
        }}
      >
        Production catalog
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
          maxWidth: 640,
          marginBottom: 'var(--space-10)',
        }}
      >
        Reference list for booking conversations — not a shopping cart. Every session is scoped in pre-production.{' '}
        <Link href="/studioc#packages" style={{ color: 'var(--accent)' }}>
          See packages
        </Link>{' '}
        or{' '}
        <a href="mailto:studio@thebigmuddyinn.com" style={{ color: 'var(--accent)' }}>
          email the desk
        </a>
        .
      </p>

      <div style={{ overflowX: 'auto' as const }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
          }}
        >
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th scope="col" style={{ textAlign: 'left', padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>
                SKU
              </th>
              <th scope="col" style={{ textAlign: 'left', padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>
                Item
              </th>
              <th scope="col" style={{ textAlign: 'left', padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>
                Category
              </th>
              <th scope="col" style={{ textAlign: 'left', padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.sku} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.85rem 0.5rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{r.sku}</td>
                <td style={{ padding: '0.85rem 0.5rem', color: 'var(--text)', fontWeight: 600 }}>{r.name}</td>
                <td style={{ padding: '0.85rem 0.5rem', color: 'var(--text-muted)' }}>{r.cat}</td>
                <td style={{ padding: '0.85rem 0.5rem', color: 'var(--text-muted)' }}>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ marginTop: 'var(--space-10)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
        <Link href="/studioc" style={{ color: 'var(--accent)' }}>
          ← Back to Studio C home
        </Link>
      </p>
    </div>
  );
}
