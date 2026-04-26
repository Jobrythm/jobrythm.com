import { useState, useEffect } from 'react';
import settingsService from '../services/settings';

export function useSettings() {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const data = await settingsService.getSettings();
        setSettings(data);
      } catch (err) {
        setError(err as Error);
        console.error('Error loading settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading, error };
}

export function useSetting(key: string, defaultValue: string = '') {
  const [value, setValue] = useState<string>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        setLoading(true);
        const data = await settingsService.getSetting(key);
        setValue(data || defaultValue);
      } catch (err) {
        console.error(`Error loading setting ${key}:`, err);
        setValue(defaultValue);
      } finally {
        setLoading(false);
      }
    };

    fetchSetting();
  }, [key, defaultValue]);

  return { value, loading };
}
