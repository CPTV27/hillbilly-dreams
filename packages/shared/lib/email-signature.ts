// ── HDX Email Signature Generator ──
// Generates inline-styled, email-client-safe HTML signatures.
// Drop the output into any email HTML body — works with Nodemailer, SendGrid, etc.

function esc(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export interface SignatureData {
  name: string;
  title: string;
  company?: string;
  phone?: string;
  email: string;
  website?: string;
  tagline?: string;
  logoUrl: string;
}

export function generateSignatureHtml(data: SignatureData): string {
  const {
    name,
    title,
    company = 'HDX',
    phone,
    email,
    website,
    tagline,
    logoUrl,
  } = data;

  const cleanPhone = phone ? phone.replace(/[^0-9]/g, '') : '';

  return `
<div style="font-family: Arial, sans-serif; color: #1E293B; font-size: 14px; line-height: 1.5;">
  <table cellpadding="0" cellspacing="0" border="0" style="margin: 0; padding: 0; border-collapse: collapse;">
    <tbody>
      <tr>
        <td valign="top" style="padding-right: 20px; border-right: 2px solid #E2E8F0; vertical-align: top;">
          <img src="${esc(logoUrl)}" alt="HDX Logo" width="100" height="100"
               style="display: block; width: 100px; height: 100px; border-radius: 24px;" />
        </td>
        <td valign="top" style="padding-left: 20px; vertical-align: top;">
          <div style="margin-bottom: 8px;">
            <h2 style="margin: 0; font-size: 20px; font-weight: bold; color: #0F172A; letter-spacing: -0.5px;">
              ${esc(name)}
            </h2>
            <p style="margin: 2px 0 0 0; font-size: 14px; color: #475569; font-weight: 500;">
              ${esc(title)} <span style="color: #94A3B8;">|</span> ${esc(company)}
            </p>
          </div>
          ${tagline ? `
          <div style="margin-bottom: 12px; font-size: 13px; font-style: italic; color: #0369A1; font-weight: 600;">
            ${esc(tagline)}
          </div>` : ''}
          <table cellpadding="0" cellspacing="0" border="0" style="margin: 0; padding: 0; border-collapse: collapse; font-size: 13px; color: #64748B;">
            <tbody>
              ${phone ? `
              <tr>
                <td style="padding-bottom: 4px; padding-right: 6px; font-weight: bold; color: #CBD5E1;">M</td>
                <td style="padding-bottom: 4px;">
                  <a href="tel:${esc(cleanPhone)}" style="color: #64748B; text-decoration: none;">${esc(phone)}</a>
                </td>
              </tr>` : ''}
              <tr>
                <td style="padding-bottom: 4px; padding-right: 6px; font-weight: bold; color: #CBD5E1;">E</td>
                <td style="padding-bottom: 4px;">
                  <a href="mailto:${esc(email)}" style="color: #64748B; text-decoration: none;">${esc(email)}</a>
                </td>
              </tr>
              ${website ? `
              <tr>
                <td style="padding-right: 6px; font-weight: bold; color: #CBD5E1;">W</td>
                <td>
                  <a href="https://${esc(website)}" target="_blank" rel="noopener noreferrer"
                     style="color: #0369A1; text-decoration: none; font-weight: 500;">${esc(website)}</a>
                </td>
              </tr>` : ''}
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</div>`.trim();
}
