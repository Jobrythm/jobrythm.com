import { apiClient } from './api';
import type { Page, PageWithSections, PageSection, StrapiResponse, StrapiCollectionResponse } from '../types/strapi';

export const pagesService = {
  // Get all pages
  async getPages(params?: { populate?: string }): Promise<StrapiCollectionResponse<Page>> {
    return apiClient.get<StrapiCollectionResponse<Page>>('/pages', params);
  },

  // Get page by route
  async getPageByRoute(route: string): Promise<PageWithSections | null> {
    try {
      const response = await apiClient.get<StrapiCollectionResponse<PageWithSections>>(
        '/pages',
        {
          'filters[route][$eq]': route,
          'filters[is_published][$eq]': true,
          populate: 'deep',
        }
      );
      
      return response.data[0] || null;
    } catch (error) {
      console.error('Error fetching page:', error);
      return null;
    }
  },

  // Get page by ID
  async getPageById(id: number): Promise<StrapiResponse<PageWithSections>> {
    return apiClient.get<StrapiResponse<PageWithSections>>(
      `/pages/${id}`,
      { populate: 'deep' }
    );
  },
};

export default pagesService;
