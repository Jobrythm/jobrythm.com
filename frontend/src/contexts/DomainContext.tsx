import { createContext, useContext, useState, type ReactNode } from 'react';

const STORAGE_KEY = 'jobrythm_root_domain';
const DEMO_URL_KEY = 'jobrythm_demo_url';
const DEFAULT_DOMAIN = 'jobrythm.app';
// Set VITE_DEMO_URL in your .env file (e.g. a Calendly link). Falls back to the contact page.
const DEFAULT_DEMO_URL =
  (import.meta.env.VITE_DEMO_URL as string | undefined) || '/contact';

/** Allow only http/https URLs to prevent javascript: injection. */
function sanitizeUrl(url: string, fallback: string): string {
  if (!url) return fallback;
  try {
    const parsed = new URL(url, window.location.origin);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return url;
    }
  } catch {
    // relative URL — allow as-is (e.g. "/contact")
    if (url.startsWith('/')) return url;
  }
  return fallback;
}

/** Allow only valid domain characters to prevent injection via rootDomain. */
function sanitizeDomain(domain: string): string {
  // Allow letters, numbers, hyphens, dots (standard hostname characters)
  return /^[a-zA-Z0-9.-]+$/.test(domain) ? domain : DEFAULT_DOMAIN;
}

interface DomainContextValue {
  rootDomain: string;
  setRootDomain: (domain: string) => void;
  appBaseUrl: string;
  loginUrl: string;
  signupUrl: string;
  demoUrl: string;
  setDemoUrl: (url: string) => void;
}

const DomainContext = createContext<DomainContextValue>({
  rootDomain: DEFAULT_DOMAIN,
  setRootDomain: () => {},
  appBaseUrl: `https://${DEFAULT_DOMAIN}`,
  loginUrl: `https://${DEFAULT_DOMAIN}/login`,
  signupUrl: `https://${DEFAULT_DOMAIN}/register`,
  demoUrl: DEFAULT_DEMO_URL,
  setDemoUrl: () => {},
});

export const useDomain = () => useContext(DomainContext);

export const DomainProvider = ({ children }: { children: ReactNode }) => {
  const [rootDomain, setRootDomainState] = useState<string>(() => {
    return sanitizeDomain(localStorage.getItem(STORAGE_KEY) || DEFAULT_DOMAIN);
  });

  const [demoUrl, setDemoUrlState] = useState<string>(() => {
    const stored = localStorage.getItem(DEMO_URL_KEY) || DEFAULT_DEMO_URL;
    return sanitizeUrl(stored, DEFAULT_DEMO_URL);
  });

  const setRootDomain = (domain: string) => {
    const safe = sanitizeDomain(domain);
    localStorage.setItem(STORAGE_KEY, safe);
    setRootDomainState(safe);
  };

  const setDemoUrl = (url: string) => {
    const safe = sanitizeUrl(url, DEFAULT_DEMO_URL);
    localStorage.setItem(DEMO_URL_KEY, safe);
    setDemoUrlState(safe);
  };

  const appBaseUrl = `https://${rootDomain}`;
  const loginUrl = `${appBaseUrl}/login`;
  const signupUrl = `${appBaseUrl}/register`;

  return (
    <DomainContext.Provider value={{ rootDomain, setRootDomain, appBaseUrl, loginUrl, signupUrl, demoUrl, setDemoUrl }}>
      {children}
    </DomainContext.Provider>
  );
};

export default DomainContext;
