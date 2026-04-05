# studiocvideo.com — DNS verification checklist

Some networks report **“Could not resolve host”** for `studiocvideo.com`. Compare to a known-good pattern (e.g. `bigmuddytouring.com` on Cloudflare + Vercel).

## Expected pattern (Vercel apex + www)

| Type | Name | Value | Proxy |
|------|------|-------|-------|
| A | `@` | `76.76.21.21` | DNS only (gray cloud) per ChasePierson.TV standard |
| CNAME | `www` | `cname.vercel-dns.com` | DNS only |

## Checks in Cloudflare

1. **Registrar / nameservers** — domain uses Cloudflare DNS.
2. **No conflicting AAAA** — stray IPv6 records pointing elsewhere.
3. **CAA** — allow Let’s Encrypt / Vercel issuance (if CAA records exist).
4. **DNSSEC** — if enabled at registrar, ensure DS matches Cloudflare; mismatch causes intermittent failures on some resolvers.

## Checks off-Cloudflare

- **Vercel** — Project has `studiocvideo.com` and `www.studiocvideo.com` assigned.
- **Propagation** — `dig studiocvideo.com A +short` from external resolver (1.1.1.1, 8.8.8.8) matches `76.76.21.21`.

## GitHub

Track verification and paste `dig` output on **https://github.com/CPTV27/hillbilly-dreams/issues/118**.

---

*Internal — no customer PII.*
