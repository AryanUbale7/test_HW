import { defineType, defineField } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
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
