import { useState, useEffect } from 'react';
import pagesService from '../services/pages';
import type { PageWithSections } from '../types/strapi';

export function usePage(route: string) {
  const [page, setPage] = useState<PageWithSections | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const data = await pagesService.getPageByRoute(route);
        setPage(data);
      } catch (err) {
        setError(err as Error);
        console.error('Error loading page:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [route]);

  return { page, loading, error };
}
