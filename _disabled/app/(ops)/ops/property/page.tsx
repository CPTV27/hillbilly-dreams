export const revalidate = 3600;

export default function PropertyInfo() {
    return (
        <div style={{ maxWidth: '56rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{
                backgroundColor: 'var(--theme-card-bg)',
                padding: '1.5rem 2.5rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--theme-card-border)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.5rem'
            }}>
                <div style={{
                    width: '4rem',
                    height: '4rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--theme-success-bg, rgba(52,211,153,0.15))',
                    borderRadius: '50%',
                    fontSize: '1.875rem',
                    flexShrink: 0
                }}>
                    🏨
                </div>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--theme-text-primary)', letterSpacing: '-0.025em', margin: 0 }}>Property Info</h1>
                    <p style={{ color: 'var(--theme-text-secondary)', marginTop: '0.5rem', fontSize: '1.125rem', margin: '0.5rem 0 0 0' }}>
                        Quick reference guide for property details, suites, and pricing.
                    </p>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <section style={{
                    backgroundColor: 'var(--theme-card-bg)',
                    border: '1px solid var(--theme-card-border)',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--theme-text-primary)', borderBottom: '1px solid var(--theme-card-border)', paddingBottom: '0.5rem', margin: '0 0 1rem 0' }}>The Basics</h2>
                    <dl style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', margin: 0 }}>
                        <div style={{ margin: 0 }}>
                            <dt style={{ color: 'var(--theme-text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>Name</dt>
                            <dd style={{ color: 'var(--theme-text-primary)', fontWeight: 600, margin: 0 }}>The Big Muddy Inn & Blues Room</dd>
                        </div>
                        <div style={{ margin: 0 }}>
                            <dt style={{ color: 'var(--theme-text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>Address</dt>
                            <dd style={{ color: 'var(--theme-text-primary)', fontWeight: 600, margin: 0 }}>411 North Commerce Street<br />Natchez, MS 39120</dd>
                        </div>
                        <div style={{ margin: 0 }}>
                            <dt style={{ color: 'var(--theme-text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>Phone</dt>
                            <dd style={{ color: 'var(--theme-text-primary)', fontWeight: 600, margin: 0 }}>(769) 376-8045</dd>
                        </div>
                        <div style={{ margin: 0 }}>
                            <dt style={{ color: 'var(--theme-text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>Email</dt>
                            <dd style={{ color: 'var(--theme-text-primary)', fontWeight: 600, margin: 0 }}>info@thebigmuddyinn.com</dd>
                        </div>
                        <div style={{ margin: 0 }}>
                            <dt style={{ color: 'var(--theme-text-secondary)', fontWeight: 500, fontSize: '0.875rem' }}>Website</dt>
                            <dd style={{ margin: 0 }}>
                                <a href="https://thebigmuddyinn.com" target="_blank" rel="noreferrer" style={{ color: 'var(--theme-accent)', fontWeight: 600, textDecoration: 'none' }}>thebigmuddyinn.com</a>
                            </dd>
                        </div>
                    </dl>
                </section>

                <section style={{
                    backgroundColor: 'var(--theme-card-bg)',
                    border: '1px solid var(--theme-card-border)',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--theme-text-primary)', borderBottom: '1px solid var(--theme-card-border)', paddingBottom: '0.5rem', margin: '0 0 1rem 0' }}>The 6 Suites</h2>
                    <ul style={{ color: 'var(--theme-text-secondary)', margin: 0, paddingLeft: '1.25rem', lineHeight: 1.6 }}>
                        <li><strong style={{ color: 'var(--theme-text-primary)' }}>Muddy Waters Suite</strong> — Father of modern Chicago blues</li>
                        <li><strong style={{ color: 'var(--theme-text-primary)' }}>John Lee Hooker Suite</strong> — The boogie man</li>
                        <li><strong style={{ color: 'var(--theme-text-primary)' }}>Robert Johnson Suite</strong> — Crossroads king</li>
                        <li><strong style={{ color: 'var(--theme-text-primary)' }}>British Invasion Suite I</strong> — British rockers who brought blues back</li>
                        <li><strong style={{ color: 'var(--theme-text-primary)' }}>British Invasion Suite II</strong> — Companion to Suite I</li>
                        <li><strong style={{ color: 'var(--theme-text-primary)' }}>B.B. King Suite</strong> — King of the Blues</li>
                    </ul>
                </section>

                <section style={{
                    backgroundColor: 'var(--theme-card-bg)',
                    border: '1px solid var(--theme-card-border)',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--theme-text-primary)', borderBottom: '1px solid var(--theme-card-border)', paddingBottom: '0.5rem', margin: '0 0 1rem 0' }}>Pricing & Rates</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '1.5rem' }}>
                        <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted var(--theme-card-border)', paddingBottom: '0.25rem' }}>
                                <dt style={{ color: 'var(--theme-text-secondary)' }}>Base Rate</dt>
                                <dd style={{ color: 'var(--theme-text-primary)', fontWeight: 700, margin: 0 }}>$125/night</dd>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted var(--theme-card-border)', paddingBottom: '0.25rem' }}>
                                <dt style={{ color: 'var(--theme-text-secondary)' }}>Non-Refundable (-10%)</dt>
                                <dd style={{ color: 'var(--theme-text-primary)', fontWeight: 600, margin: 0 }}>$112.50</dd>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted var(--theme-card-border)', paddingBottom: '0.25rem' }}>
                                <dt style={{ color: 'var(--theme-text-secondary)' }}>Advance Purchase (-15%)</dt>
                                <dd style={{ color: 'var(--theme-text-primary)', fontWeight: 600, margin: 0 }}>$106.25</dd>
                            </div>
                        </dl>
                        <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted var(--theme-card-border)', paddingBottom: '0.25rem' }}>
                                <dt style={{ color: 'var(--theme-text-secondary)' }}>Extended Stay (-10%)</dt>
                                <dd style={{ color: 'var(--theme-text-primary)', fontWeight: 600, margin: 0 }}>$112.50</dd>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted var(--theme-card-border)', paddingBottom: '0.25rem' }}>
                                <dt style={{ color: 'var(--theme-text-secondary)' }}>Weekly (-20%)</dt>
                                <dd style={{ color: 'var(--theme-text-primary)', fontWeight: 600, margin: 0 }}>$100.00</dd>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted var(--theme-card-border)', paddingBottom: '0.25rem' }}>
                                <dt style={{ color: 'var(--theme-text-secondary)' }}>Blues Room Package</dt>
                                <dd style={{ color: 'var(--theme-text-primary)', fontWeight: 600, margin: 0 }}>+$50</dd>
                            </div>
                        </dl>
                    </div>
                    <div style={{
                        padding: '1rem',
                        backgroundColor: 'var(--theme-warning-bg, rgba(251,191,36,0.15))',
                        borderRadius: '0.5rem',
                        color: 'var(--theme-warning)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem',
                        border: '1px dashed var(--theme-warning)'
                    }}>
                        <span style={{ fontWeight: 700 }}>Taxes: ~12%</span>
                        <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>MS State: 7% | Adams County: 2% | City of Natchez: 3%</span>
                    </div>
                </section>

                <section style={{
                    backgroundColor: 'var(--theme-card-bg)',
                    border: '1px solid var(--theme-card-border)',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--theme-text-primary)', borderBottom: '1px solid var(--theme-card-border)', paddingBottom: '0.5rem', margin: '0 0 1rem 0' }}>Local Competitors</h2>
                    <ul style={{ color: 'var(--theme-text-secondary)', margin: 0, paddingLeft: '1.25rem', lineHeight: 1.6 }}>
                        <li><strong style={{ color: 'var(--theme-text-primary)' }}>Monmouth Historic Inn</strong> — high-end, antebellum estate</li>
                        <li><strong style={{ color: 'var(--theme-text-primary)' }}>Dunleith Historic Inn</strong> — upscale historic property</li>
                        <li><strong style={{ color: 'var(--theme-text-primary)' }}>The Guest House Hotel</strong> — downtown boutique</li>
                        <li><strong style={{ color: 'var(--theme-text-primary)' }}>Natchez Grand Hotel</strong> — larger hotel, convention-friendly</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
