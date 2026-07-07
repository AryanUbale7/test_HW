import { defineType, defineField } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.status === 'published' && !value) {
            return 'Title is required before you can publish this post.'
          }
          return true
        }),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.status === 'published' && !value) {
            return 'A URL slug is required before publishing.'
          }
          return true
        }),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.status === 'published' && !value) {
            return 'Please write a short excerpt before publishing.'
          }
          return true
        }),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.status === 'published' && (!value || (value as any[]).length === 0)) {
            return 'You need to write some content in the body before publishing.'
          }
          return true
        }),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'arm',
      title: 'Arm',
      type: 'string',
      options: {
        list: [
          { title: 'Creation', value: 'Creation' },
          { title: 'Protection', value: 'Protection' },
          { title: 'Legacy', value: 'Legacy' },
          { title: 'General', value: 'General' },
        ],
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.status === 'published' && !value) {
            return 'Please select a business arm before publishing.'
          }
          return true
        }),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Insight', value: 'Insight' },
          { title: 'News', value: 'News' },
        ],
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.status === 'published' && !value) {
            return 'Please select a post type before publishing.'
          }
          return true
        }),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      hidden: ({ document }) => document?.type !== 'News',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.status === 'published' && context.document?.type === 'News' && !value) {
            return 'News posts require a Source URL before publishing.'
          }
          return true
        }),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
        ],
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      status: 'status',
      media: 'coverImage',
    },
    prepare({ title, author, status, media }) {
      return {
        title,
        subtitle: `${author || 'No author'} • ${status === 'published' ? '🟢 Published' : '🟠 Draft'}`,
        media,
      }
    },
  },
})
