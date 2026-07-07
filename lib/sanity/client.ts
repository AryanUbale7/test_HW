import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

export async function getPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      excerpt,
      body,
      arm,
      type,
      publishedAt
    }`,
    { slug }
  )
}

export async function getDummyPost() {
  return client.fetch(
    `*[_type == "post"][0]{
      title,
      "slug": slug.current,
      excerpt,
      body,
      arm,
      type,
      publishedAt
    }`
  )
}
