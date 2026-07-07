import { DocumentActionComponent, DocumentActionProps, useDocumentOperation } from 'sanity'

export function createPublishAction(originalPublishAction: DocumentActionComponent) {
  const PublishAction = (props: DocumentActionProps) => {
    const originalResult = originalPublishAction(props)
    const { patch } = useDocumentOperation(props.id, props.type)

    return {
      ...originalResult,
      label: 'Publish / Update',
      onHandle: () => {
        const doc = props.draft || props.published
        
        if (doc) {
          // If status is published and publishedAt is empty, set it
          const isPublishing = doc.status === 'published'
          if (isPublishing && !doc.publishedAt) {
            patch.execute([{ set: { publishedAt: new Date().toISOString() } }])
          }
        }

        // Call original publish action
        if (originalResult?.onHandle) {
          originalResult.onHandle()
        }
      },
    }
  }

  return PublishAction
}
