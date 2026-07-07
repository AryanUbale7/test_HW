import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './sanity/schema'
import { deskStructure } from './sanity/structure'
import { createPublishAction } from './sanity/actions'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy_project_id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Honworth Studio',
  schema,
  plugins: [
    structureTool({ structure: deskStructure }),
    visionTool(),
  ],
  document: {
    actions: (prev, context) => {
      // Only apply custom publish action to posts
      if (context.schemaType === 'post') {
        return prev.map((originalAction) =>
          originalAction.action === 'publish'
            ? createPublishAction(originalAction)
            : originalAction
        )
      }
      return prev
    },
  },
})
