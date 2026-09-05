/**
 * Canonical origin for sitemap, robots and Open Graph tags.
 * Set NEXT_PUBLIC_SITE_URL to the live domain before launch; Cloud Run's own
 * URL is only a fallback so preview deploys still produce valid absolute URLs.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");
