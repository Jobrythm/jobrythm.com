import { useEffect } from 'react';

/**
 * Canonical site origin used for absolute URLs (canonical, og:url, sitemap).
 * Override at build time by setting VITE_SITE_URL.
 */
export const SITE_URL: string = (
  import.meta.env.VITE_SITE_URL || 'https://jobrythm.com'
).replace(/\/$/, '');

export const SITE_NAME = 'Jobrythm';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

interface SeoProps {
  /** Page title — `| Jobrythm` is appended automatically unless `rawTitle` is true. */
  title: string;
  description: string;
  /** Path beginning with `/`. Defaults to the current `window.location.pathname`. */
  path?: string;
  image?: string;
  /** Set to true to prevent search engines from indexing the page. */
  noindex?: boolean;
  /** When true, `title` is used verbatim without the site-name suffix. */
  rawTitle?: boolean;
  /** Open Graph type, defaults to `website`. */
  ogType?: string;
}

type MetaSelector =
  | { name: string }
  | { property: string };

function upsertMeta(selector: MetaSelector, content: string) {
  const attr = 'name' in selector ? 'name' : 'property';
  const value = 'name' in selector ? selector.name : selector.property;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${value}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Manages per-page SEO tags (title, description, canonical, Open Graph, Twitter,
 * and robots) for the SPA. Render once near the top of each page component.
 */
const Seo = ({
  title,
  description,
  path,
  image,
  noindex = false,
  rawTitle = false,
  ogType = 'website',
}: SeoProps) => {
  useEffect(() => {
    const fullTitle = rawTitle ? title : `${title} | ${SITE_NAME}`;
    const resolvedPath = path ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
    const canonicalUrl = `${SITE_URL}${resolvedPath.startsWith('/') ? resolvedPath : `/${resolvedPath}`}`;
    const ogImage = image || DEFAULT_OG_IMAGE;

    document.title = fullTitle;

    upsertMeta({ name: 'description' }, description);
    upsertMeta(
      { name: 'robots' },
      noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
    );
    upsertCanonical(canonicalUrl);

    upsertMeta({ property: 'og:type' }, ogType);
    upsertMeta({ property: 'og:site_name' }, SITE_NAME);
    upsertMeta({ property: 'og:title' }, fullTitle);
    upsertMeta({ property: 'og:description' }, description);
    upsertMeta({ property: 'og:url' }, canonicalUrl);
    upsertMeta({ property: 'og:image' }, ogImage);

    upsertMeta({ name: 'twitter:card' }, 'summary_large_image');
    upsertMeta({ name: 'twitter:title' }, fullTitle);
    upsertMeta({ name: 'twitter:description' }, description);
    upsertMeta({ name: 'twitter:image' }, ogImage);
  }, [title, description, path, image, noindex, rawTitle, ogType]);

  return null;
};

export default Seo;
