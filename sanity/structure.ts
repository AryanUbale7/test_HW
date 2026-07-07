import { StructureBuilder } from 'sanity/structure'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Dashboard')
    .items([
      // 1. Insights (Blog Posts)
      S.listItem()
        .title('📝 Insights (Blog Posts)')
        .child(
          S.list()
            .title('Insights')
            .items([
              S.listItem()
                .title('Drafts')
                .child(
                  S.documentList()
                    .title('Drafts')
                    .filter('_type == "post" && status == "draft"')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
              S.listItem()
                .title('Published')
                .child(
                  S.documentList()
                    .title('Published')
                    .filter('_type == "post" && status == "published"')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
            ])
        ),
      
      S.divider(),

      // 2. Resources & Downloads
      S.listItem()
        .title('📁 Resources & Downloads')
        .child(
          S.documentList()
            .title('Resources')
            .filter('_type == "resource"')
        ),

      S.divider(),

      // 3. FAQs grouped by arm
      S.listItem()
        .title('❓ FAQs')
        .child(
          S.list()
            .title('FAQs by Arm')
            .items([
              S.listItem()
                .title('Creation')
                .child(S.documentList().title('Creation FAQs').filter('_type == "faq" && arm == "Creation"')),
              S.listItem()
                .title('Protection')
                .child(S.documentList().title('Protection FAQs').filter('_type == "faq" && arm == "Protection"')),
              S.listItem()
                .title('Legacy')
                .child(S.documentList().title('Legacy FAQs').filter('_type == "faq" && arm == "Legacy"')),
              S.listItem()
                .title('General')
                .child(S.documentList().title('General FAQs').filter('_type == "faq" && arm == "General"')),
            ])
        ),

      S.divider(),

      // 4. Author Profile (Singleton)
      S.listItem()
        .title('👤 Author Profile')
        .child(
          S.document()
            .schemaType('author')
            .documentId('author-profile')
            .title('Author Profile')
        ),
    ])
