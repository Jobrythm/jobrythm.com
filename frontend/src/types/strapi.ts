// Strapi Response Types
export interface StrapiResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
  meta: Record<string, any>;
}

export interface StrapiCollectionResponse<T> {
  data: Array<{
    id: number;
    attributes: T;
  }>;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Page Types
export interface Page {
  route: string;
  title: string;
  meta_description?: string;
  is_published: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface PageSection {
  section_type: string;
  content: Record<string, any>;
  position: number;
  is_visible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PageWithSections extends Page {
  sections?: Array<{
    id: number;
    attributes: PageSection;
  }>;
}

// Setting Types
export interface Setting {
  key: string;
  value: string;
  type?: string;
  createdAt: string;
  updatedAt: string;
}

// Section Content Types
export interface HeroContent {
  headline: string;
  subheadline?: string;
  primaryCTA?: {
    text: string;
    url: string;
  };
  secondaryCTA?: {
    text: string;
    url: string;
  };
  backgroundImage?: string;
}

export interface FeatureContent {
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

export interface MarkdownContent {
  markdown: string;
}

export interface CTAContent {
  headline: string;
  description?: string;
  buttonText: string;
  buttonUrl: string;
}
