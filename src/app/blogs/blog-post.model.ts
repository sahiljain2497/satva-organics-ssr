export type BlogRegion = 'HP' | 'JK' | 'UP';

export interface BlogPost {
  title: string;
  slug: string;
  metaDescription: string;
  author: string;
  date: string;
  tags: string[];
  /** Primary states this article is written for (HP, JK, UP). */
  regions: BlogRegion[];
  imageUrl: string;
  content: string;
}

export const BLOG_REGION_LABELS: Record<BlogRegion, { en: string; hi: string }> = {
  HP: { en: 'Himachal Pradesh', hi: 'हिमाचल प्रदेश' },
  JK: { en: 'Jammu & Kashmir', hi: 'जम्मू-कश्मीर' },
  UP: { en: 'Uttar Pradesh', hi: 'उत्तर प्रदेश' },
};
