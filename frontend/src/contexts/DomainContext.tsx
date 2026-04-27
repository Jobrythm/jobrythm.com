import { createContext, useContext, useState, type ReactNode } from 'react';

const STORAGE_KEY = 'jobrythm_root_domain';
const DEFAULT_DOMAIN = 'jobrythm.app';

interface DomainContextValue {
  rootDomain: string;
  setRootDomain: (domain: string) => void;
  appBaseUrl: string;
  loginUrl: string;
  signupUrl: string;
}

const DomainContext = createContext<DomainContextValue>({
  rootDomain: DEFAULT_DOMAIN,
  setRootDomain: () => {},
  appBaseUrl: `https://${DEFAULT_DOMAIN}`,
  loginUrl: `https://${DEFAULT_DOMAIN}/login`,
  signupUrl: `https://${DEFAULT_DOMAIN}/register`,
});

export const useDomain = () => useContext(DomainContext);

export const DomainProvider = ({ children }: { children: ReactNode }) => {
  const [rootDomain, setRootDomainState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_DOMAIN;
  });

  const setRootDomain = (domain: string) => {
    localStorage.setItem(STORAGE_KEY, domain);
    setRootDomainState(domain);
  };

  const appBaseUrl = `https://${rootDomain}`;
  const loginUrl = `${appBaseUrl}/login`;
  const signupUrl = `${appBaseUrl}/register`;

  return (
    <DomainContext.Provider value={{ rootDomain, setRootDomain, appBaseUrl, loginUrl, signupUrl }}>
      {children}
    </DomainContext.Provider>
  );
};

export default DomainContext;
