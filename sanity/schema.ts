import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { post } from './post'
import { category } from './category'
import { resource } from './resource'
import { faq } from './faq'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, post, category, resource, faq],
}
