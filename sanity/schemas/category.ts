import { defineType, defineField } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
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
    }),
  ],
})
