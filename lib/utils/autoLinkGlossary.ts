/**
 * Safely parses HTML and auto-links the first occurrence of glossary terms
 * found in the text nodes, up to a maximum limit of linked terms.
 */
export function autoLinkGlossary(
  htmlContent: string,
  terms: { term: string; slug: string }[],
  maxLinks = 3
): string {
  if (!htmlContent || !terms || terms.length === 0) {
    return htmlContent;
  }

  // Split by HTML tags to isolate text nodes
  // e.g. "This is <a href='...'>SIP</a> text" -> ["This is ", "<a href='...'>", "SIP", "</a>", " text"]
  const parts = htmlContent.split(/(<[^>]+>)/g);
  
  const linkedSlugs = new Set<string>();
  let linkCount = 0;

  // Sort terms by length descending so longer phrases match before sub-parts (e.g. "Term Insurance" before "Insurance")
  const sortedTerms = [...terms].sort((a, b) => b.term.length - a.term.length);

  for (const termObj of sortedTerms) {
    if (linkCount >= maxLinks) break;

    const termName = termObj.term;
    const termSlug = termObj.slug;

    // Word boundary match for the term (case insensitive)
    const regex = new RegExp(`\\b(${escapeRegExp(termName)})\\b`, 'i');

    // Search through text nodes (even indices in split result)
    for (let i = 0; i < parts.length; i += 2) {
      const text = parts[i];
      if (!text || text.trim().length === 0) continue;

      // Ensure we don't link if this text node is inside an anchor tag
      if (isInsideAnchor(parts, i)) {
        continue;
      }

      const match = text.match(regex);
      if (match) {
        // Replace first occurrence in this text node
        const matchedText = match[1];
        const replacement = `<a href="/glossary/${termSlug}" class="text-deep-green underline underline-offset-4 hover:text-gold transition-colors font-medium">${matchedText}</a>`;
        
        parts[i] = text.replace(regex, replacement);
        linkedSlugs.add(termSlug);
        linkCount++;
        break; // Stop seeking this term once it has been linked once
      }
    }
  }

  return parts.join('');
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Checks if the text node at index 'textNodeIndex' is inside an active <a> tag.
 */
function isInsideAnchor(parts: string[], textNodeIndex: number): boolean {
  // Trace backwards to see if there is an unclosed <a> tag
  let openAnchor = false;
  for (let j = 0; j < textNodeIndex; j++) {
    const part = parts[j];
    if (part.startsWith('<a ') || part.startsWith('<a>')) {
      openAnchor = true;
    } else if (part === '</a>') {
      openAnchor = false;
    }
  }
  return openAnchor;
}
