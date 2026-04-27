import { createContext, useContext, useState, type ReactNode } from 'react';

const STORAGE_KEY = 'jobrythm_root_domain';
const DEMO_URL_KEY = 'jobrythm_demo_url';
const DEFAULT_DOMAIN = 'jobrythm.app';
const DEFAULT_DEMO_URL =
  (import.meta.env.VITE_DEMO_URL as string | undefined) || 'https://calendly.com/jobrythm/demo';

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
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_DOMAIN;
  });

  const [demoUrl, setDemoUrlState] = useState<string>(() => {
    return localStorage.getItem(DEMO_URL_KEY) || DEFAULT_DEMO_URL;
  });

  const setRootDomain = (domain: string) => {
    localStorage.setItem(STORAGE_KEY, domain);
    setRootDomainState(domain);
  };

  const setDemoUrl = (url: string) => {
    localStorage.setItem(DEMO_URL_KEY, url);
    setDemoUrlState(url);
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
