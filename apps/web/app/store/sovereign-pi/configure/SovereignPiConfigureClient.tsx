'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const BASE_PRICE = 299;

const ADDONS = [
  { id: 'battery', name: 'Battery Pack', price: 59, desc: '20,000mAh — 4–6 hours off-grid.' },
  { id: 'solar', name: 'Solar Kit', price: 49, desc: '20W foldable panel. Charges the battery.' },
  { id: 'faraday', name: 'Faraday Shield', price: 39, desc: 'RF-shielded case. EMP protection.' },
  { id: 'hdmi', name: 'Display Cable', price: 9, desc: '6ft HDMI. Any TV as your dashboard.' },
] as const;

const ADDON_SUM = ADDONS.reduce((s, a) => s + a.price, 0);
const BUNDLE_ADDON_PRICE = 129;

export function SovereignPiConfigureClient() {
  const [sel, setSel] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(ADDONS.map((a) => [a.id, false]))
  );

  const toggle = (id: string) => setSel((prev) => ({ ...prev, [id]: !prev[id] }));

  const selectedIds = ADDONS.filter((a) => sel[a.id]);
  const allFour = selectedIds.length === ADDONS.length;
  const addonTotal = allFour ? BUNDLE_ADDON_PRICE : selectedIds.reduce((s, a) => s + a.price, 0);
  const grandTotal = BASE_PRICE + addonTotal;

  const summary = useMemo(() => {
    const lines = [
      'Sovereign Pi — configuration request',
      '',
      `Sovereign Pi Core: $${BASE_PRICE}`,
      ...selectedIds.map((a) => `+ ${a.name}: $${a.price}`),
    ];
    if (allFour) lines.push('', `(Full add-on bundle: $${BUNDLE_ADDON_PRICE} instead of $${ADDON_SUM})`);
    lines.push('', `Estimated total: $${grandTotal}`, '', 'Stripe checkout coming soon — sending via email for now.');
    return lines.join('\n');
  }, [selectedIds, allFour, grandTotal]);

  const mailto = useMemo(() => {
    const q = new URLSearchParams({
      subject: 'Sovereign Pi — cart',
      body: summary,
    });
    return `mailto:listings@hillbillydreamsinc.com?${q.toString()}`;
  }, [summary]);

  return (
    <>
      <style>{`
        .spc-wrap { max-width: 720px; margin: 0 auto; padding: 1.25rem 1rem 4rem; font-family: var(--font-body, system-ui); color: var(--text, #f0ebe0); background: var(--bg, #0f0f0d); min-height: 100vh; box-sizing: border-box; }
        .spc-back { display: inline-block; margin-bottom: 1.5rem; color: var(--accent, #c8943e); text-decoration: none; font-size: 0.85rem; min-height: 44px; line-height: 44px; }
        .spc-eyebrow { color: var(--accent, #c8943e); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 0.5rem; }
        .spc-title { font-size: clamp(1.75rem, 5vw, 2.25rem); font-weight: 700; margin: 0 0 0.75rem; line-height: 1.15; }
        .spc-lede { opacity: 0.65; font-size: 0.95rem; line-height: 1.6; margin: 0 0 2rem; }
        .spc-base { border: 2px solid var(--accent, #c8943e); border-radius: 8px; padding: 1.25rem; margin-bottom: 1.5rem; }
        .spc-base-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap; }
        .spc-base h2 { font-size: 1.05rem; margin: 0 0 0.35rem; }
        .spc-base p { margin: 0; font-size: 0.85rem; opacity: 0.55; }
        .spc-price-big { font-size: 1.5rem; font-weight: 700; color: var(--accent, #c8943e); }
        .spc-addon { display: flex; align-items: stretch; gap: 0.75rem; border: 1px solid var(--border, rgba(200,148,62,0.2)); border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 0.6rem; cursor: pointer; min-height: 44px; }
        .spc-addon input { width: 22px; height: 22px; min-width: 22px; min-height: 22px; margin-top: 10px; accent-color: var(--accent, #c8943e); cursor: pointer; }
        .spc-addon-body { flex: 1; min-width: 0; padding: 8px 0; }
        .spc-addon-body h3 { font-size: 0.95rem; margin: 0 0 0.2rem; }
        .spc-addon-body p { font-size: 0.78rem; opacity: 0.55; margin: 0; line-height: 1.45; }
        .spc-addon-p { font-weight: 700; color: var(--accent, #c8943e); flex-shrink: 0; align-self: center; font-size: 1rem; }
        .spc-total { margin-top: 1.75rem; padding: 1.25rem; border-radius: 8px; background: rgba(200,148,62,0.08); border: 1px solid rgba(200,148,62,0.25); }
        .spc-total-row { display: flex; justify-content: space-between; font-size: 0.9rem; opacity: 0.75; margin-bottom: 0.35rem; }
        .spc-total-grand { display: flex; justify-content: space-between; align-items: baseline; margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid rgba(200,148,62,0.2); }
        .spc-total-grand span:first-child { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent, #c8943e); }
        .spc-total-grand span:last-child { font-size: 1.75rem; font-weight: 800; }
        .spc-actions { margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
        .spc-btn { display: flex; align-items: center; justify-content: center; width: 100%; min-height: 48px; padding: 0.85rem 1.25rem; border-radius: 8px; font-weight: 600; font-size: 0.95rem; text-decoration: none; box-sizing: border-box; border: none; cursor: pointer; font-family: inherit; }
        .spc-btn-primary { background: var(--accent, #c8943e); color: #0a0a0a; }
        .spc-btn-ghost { background: transparent; color: var(--accent, #c8943e); border: 1px solid var(--accent, #c8943e); }
        .spc-note { font-size: 0.75rem; opacity: 0.4; margin-top: 1rem; line-height: 1.5; }
        @media (min-width: 480px) {
          .spc-actions { flex-direction: row; flex-wrap: wrap; }
          .spc-btn { width: auto; flex: 1; min-width: 160px; }
        }
      `}</style>
      <div className="spc-wrap">
        <Link href="/store/sovereign-pi" className="spc-back">
          ← Sovereign Pi
        </Link>
        <p className="spc-eyebrow">Deep South Directory</p>
        <h1 className="spc-title">Configure your Pi</h1>
        <p className="spc-lede">
          Tap add-ons to see your total update live. Pay with Stripe soon — for now we&apos;ll take your list by email and
          follow up same day.
        </p>

        <div className="spc-base">
          <div className="spc-base-row">
            <div>
              <h2>Sovereign Pi Core</h2>
              <p>Pi 5 (8GB) · 256GB NVMe · case · pre-loaded dashboard software</p>
            </div>
            <div className="spc-price-big">${BASE_PRICE}</div>
          </div>
        </div>

        <p className="spc-eyebrow" style={{ marginTop: '0.5rem' }}>
          Add-ons
        </p>
        {ADDONS.map((a) => (
          <label key={a.id} className="spc-addon">
            <input type="checkbox" checked={!!sel[a.id]} onChange={() => toggle(a.id)} />
            <div className="spc-addon-body">
              <h3>{a.name}</h3>
              <p>{a.desc}</p>
            </div>
            <span className="spc-addon-p">+${a.price}</span>
          </label>
        ))}

        {allFour && (
          <p style={{ fontSize: '0.8rem', color: 'var(--accent, #c8943e)', marginTop: '0.5rem' }}>
            Full bundle pricing applied (save ${ADDON_SUM - BUNDLE_ADDON_PRICE} on add-ons).
          </p>
        )}

        <div className="spc-total">
          <div className="spc-total-row">
            <span>Core</span>
            <span>${BASE_PRICE}</span>
          </div>
          <div className="spc-total-row">
            <span>Add-ons {allFour ? '(bundle)' : `(${selectedIds.length} selected)`}</span>
            <span>${addonTotal}</span>
          </div>
          <div className="spc-total-grand">
            <span>Total</span>
            <span>${grandTotal}</span>
          </div>
        </div>

        <div className="spc-actions">
          <a className="spc-btn spc-btn-primary" href={mailto}>
            Add to cart — email order
          </a>
          <Link href="/directory/onboard?addon=sovereign-pi" className="spc-btn spc-btn-ghost">
            Free with DSD membership
          </Link>
        </div>
        <p className="spc-note">Stripe checkout links will replace the email handoff when ready. Prices match the Sovereign Pi product page.</p>
      </div>
    </>
  );
}
