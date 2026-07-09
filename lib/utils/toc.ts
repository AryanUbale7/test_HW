/**
 * Parses HTML content, extracts all H2 headings, generates clean IDs for them,
 * and returns the modified HTML with IDs injected alongside the list of headings.
 */
export function generateTocAndInjectIds(html: string): { 
  html: string; 
  headings: { text: string; id: string }[] 
} {
  const headings: { text: string; id: string }[] = [];
  
  if (!html) {
    return { html, headings };
  }

  // Regular expression to match <h2> tags and their content
  const processedHtml = html.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (match, attrs, content) => {
    // Strip HTML tags from heading content to get raw text
    const text = content.replace(/<[^>]+>/g, '').trim();
    
    // Generate a clean slug for the ID
    let id = text.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    
    // Fallback if ID is empty
    if (!id) id = `heading-${Math.random().toString(36).substr(2, 9)}`;

    // Inject class for scroll offset
    const classAttrMatch = attrs.match(/class=["'](.*?)["']/);
    let classAttr = 'scroll-mt-28 font-serif text-2xl text-deep-green mt-12 mb-6';
    if (classAttrMatch) {
      classAttr = `${classAttr} ${classAttrMatch[1]}`;
      attrs = attrs.replace(/class=["'](.*?)["']/, `class="${classAttr}"`);
    } else {
      attrs = `${attrs} class="${classAttr}"`;
    }

    // Check if ID attribute already exists, otherwise add it
    if (!attrs.includes('id=')) {
      attrs = `${attrs} id="${id}"`;
    } else {
      const idMatch = attrs.match(/id=["'](.*?)["']/);
      if (idMatch) id = idMatch[1];
    }

    headings.push({ text, id });
    return `<h2${attrs}>${content}</h2>`;
  });

  return { html: processedHtml, headings };
}
