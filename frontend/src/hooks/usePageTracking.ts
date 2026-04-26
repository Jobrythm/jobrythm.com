import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, sendDuration } from '../services/analytics';

export function usePageTracking(): void {
  const location = useLocation();
  const viewIdRef = useRef<number>(0);
  const startTimeRef = useRef<number>(Date.now());
  const prevPageRef = useRef<string>('');

  useEffect(() => {
    const page = location.pathname;

    // Skip admin routes to avoid polluting analytics
    if (page.startsWith('/admin-page')) return;

    const referrer = prevPageRef.current || undefined;

    trackPageView(page, referrer).then(({ id }) => {
      viewIdRef.current = id;
      startTimeRef.current = Date.now();
    });

    return () => {
      if (viewIdRef.current > 0) {
        sendDuration(viewIdRef.current, Date.now() - startTimeRef.current);
        viewIdRef.current = 0;
      }
      prevPageRef.current = page;
    };
  }, [location.pathname]);

  useEffect(() => {
    const handleUnload = () => {
      if (viewIdRef.current > 0) {
        sendDuration(viewIdRef.current, Date.now() - startTimeRef.current);
      }
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);
}
