import { MetadataRoute } from 'next';
import { culturalArticles } from '@/data/cultural_articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://injera-3d.vercel.app';

  const staticRoutes = [
    '',
    '/journey',
    '/make-injera',
    '/culture',
    '/explore',
    '/stories',
    '/learn',
    '/about',
    '/admin',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const articleRoutes = culturalArticles.map((art) => ({
    url: `${baseUrl}/culture/${art.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
