import { apiClient } from './api';
import type { Setting, StrapiResponse, StrapiCollectionResponse } from '../types/strapi';

export const settingsService = {
  // Get all settings
  async getSettings(): Promise<Record<string, any>> {
    try {
      const response = await apiClient.get<StrapiCollectionResponse<Setting>>('/settings');
      
      const settings: Record<string, any> = {};
      response.data.forEach((item) => {
        settings[item.attributes.key] = item.attributes.value;
      });
      
      return settings;
    } catch (error) {
      console.error('Error fetching settings:', error);
      return {};
    }
  },

  // Get specific setting by key
  async getSetting(key: string): Promise<string | null> {
    try {
      const response = await apiClient.get<StrapiCollectionResponse<Setting>>(
        '/settings',
        {
          'filters[key][$eq]': key,
        }
      );
      
      return response.data[0]?.attributes.value || null;
    } catch (error) {
      console.error(`Error fetching setting ${key}:`, error);
      return null;
    }
  },

  // Get app domain
  async getAppDomain(): Promise<string> {
    const domain = await this.getSetting('app_domain');
    return domain || 'app.jobrythm.com';
  },
};

export default settingsService;
