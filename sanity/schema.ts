import { type SchemaTypeDefinition } from 'sanity'
import { author } from './schemas/author'
import { post } from './schemas/post'
import { category } from './schemas/category'
import { resource } from './schemas/resource'
import { faq } from './schemas/faq'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, post, category, resource, faq],
}
