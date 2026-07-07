import { client } from './client';
import { projectId } from './env';
import { mockPosts, mockResources, mockFaqs } from './mockData';

// Use a type representing valid query options for the articles feed
export interface GetPostsOptions {
  page?: number;
  limit?: number;
  arm?: string;
  type?: string;
}

export async function getPosts({ page = 1, limit = 9, arm, type }: GetPostsOptions = {}) {
  const start = (page - 1) * limit;
  const end = start + limit;
  
  let matchFilter = `_type == "post" && status == "published"`;
  if (arm && arm !== 'All') {
    matchFilter += ` && arm == "${arm}"`;
  }
  if (type) {
    matchFilter += ` && type == "${type}"`;
  }

  const query = `{
    "posts": *[${matchFilter}] | order(publishedAt desc) [${start}...${end}] {
      title,
      "slug": slug.current,
      excerpt,
      "thumbnailUrl": coverImage.asset->url,
      category,
      arm,
      type,
      publishedAt
    },
    "total": count(*[${matchFilter}])
  }`;

  if (projectId === 'dummy-project-id') {
    let filtered = mockPosts;
    if (arm && arm !== 'All') filtered = filtered.filter(p => p.arm === arm);
    if (type) filtered = filtered.filter(p => p.type === type);
    return {
      posts: filtered.slice(start, end),
      total: filtered.length
    };
  }

  return client.fetch(query);
}

export async function getPostBySlug(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    excerpt,
    body,
    "thumbnailUrl": coverImage.asset->url,
    arm,
    type,
    sourceUrl,
    publishedAt,
    author->{
      name,
      "photoUrl": photo.asset->url,
      bio,
      credentials
    }
  }`;
  
  if (projectId === 'dummy-project-id') {
    return mockPosts.find(p => p.slug === slug);
  }

  return client.fetch(query, { slug });
}

export async function getRelatedPosts(slug: string, arm: string) {
  const query = `*[_type == "post" && status == "published" && arm == $arm && slug.current != $slug] | order(publishedAt desc) [0...3] {
    title,
    "slug": slug.current,
    excerpt,
    "thumbnailUrl": coverImage.asset->url,
    arm,
    type,
    publishedAt
  }`;
  
  if (projectId === 'dummy-project-id') {
    return mockPosts.filter(p => p.arm === arm && p.slug !== slug).slice(0, 3);
  }

  return client.fetch(query, { slug, arm });
}

export async function getResources() {
  const query = `*[_type == "resource"] | order(_createdAt desc) {
    _id,
    title,
    description,
    gatedByEmail,
    "fileUrl": file.asset->url
  }`;
  if (projectId === 'dummy-project-id') return mockResources;
  return client.fetch(query);
}

export async function getFaqs() {
  const query = `*[_type == "faq"] {
    _id,
    question,
    answer,
    arm
  }`;
  if (projectId === 'dummy-project-id') return mockFaqs;
  return client.fetch(query);
}
