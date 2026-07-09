import { MetadataRoute } from 'next';
import { getAllPostSlugs, getAllGlossarySlugs } from '@/lib/supabase/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://honworth.in';

  // Dynamic posts
  const posts = await getAllPostSlugs();
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/articles/${post.slug}`,
    lastModified: new Date(post.published_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Dynamic glossary terms
  const glossaryTerms = await getAllGlossarySlugs();
  const glossaryUrls = glossaryTerms.map((term) => ({
    url: `${baseUrl}/glossary/${term.slug}`,
    lastModified: new Date(term.updated_at || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Static pages
  const staticUrls = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/my-story`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/how-i-work`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/wealth-creation`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/wealth-protection`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/wealth-legacy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/articles`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/glossary`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/library`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/reach-me`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/disclosures`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
  ];

  return [...staticUrls, ...postUrls, ...glossaryUrls];
}
