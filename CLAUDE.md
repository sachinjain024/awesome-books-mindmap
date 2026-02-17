# Booksmap - Multi-Book Mind Map Collection

## Project Overview

Booksmap is a static HTML website collection presenting various books in an accessible, mind-map style format. Each book gets its own directory with a consistent structure and shared styling.

## Build Workflow

**Content Creation (LLM):**
- LLMs generate book content as **Markdown files** (.md) with YAML frontmatter
- Source files live in `src/books/[book-slug]/`
- Book overview: `src/books/[book-slug]/book.md`
- Chapters: `src/books/[book-slug]/chapters/chapter-XX.md`

**Build Process (Eleventy):**
- Run `npm run build` to process markdown and generate HTML
- Nunjucks templates (`book-index.njk`, `chapter.njk`) provide consistent HTML structure
- Output files generated in `docs/[book-slug]/` (for GitHub Pages deployment)

**Result:**
- Clean, maintainable markdown content
- Consistent HTML output across all books
- Easy updates without touching HTML boilerplate

## Project Structure

```
booksmap/
├── CLAUDE.md                        # This file - shared guidelines
├── .eleventy.js                     # Eleventy configuration
├── package.json                     # NPM dependencies and build scripts
├── index.html                       # Main homepage with all books
├── shared/
│   ├── styles.css                   # Common CSS for all books
│   └── highlight.js                 # Text highlighting feature
├── src/                             # All source content
│   ├── _includes/                   # Nunjucks templates
│   │   ├── book-index.njk          # Book overview page template
│   │   └── chapter.njk             # Chapter page template
│   ├── books/                       # Markdown source files (new books)
│   │   └── [book-slug]/
│   │       ├── book.md              # Book overview (with frontmatter)
│   │       ├── styles.css           # Book-specific CSS overrides
│   │       └── chapters/
│   │           └── chapter-XX.md    # Individual chapter markdown files
└── docs/                            # Generated HTML output (from npm run build)
    └── [book-slug]/                 # Published to GitHub Pages
        ├── index.html               # Generated book overview
        └── chapters/
            └── chapter-XX.html      # Generated chapter pages
```

---

## How to Generate a New Mind Map

**IMPORTANT:** When creating a mind map, you will generate **Markdown files**, NOT HTML files. The HTML is built from markdown using Eleventy.

When asked to create a mind map for a book, follow these steps:

### Step 1: Research the Book Structure

Before creating files, understand the book's organization:
- Number of chapters/parts/sections
- Chapter titles and themes
- Key concepts and teachings
- The book's central message

### Step 2: Create Directory Structure

```bash
mkdir -p src/books/[book-slug]/chapters
```

Use kebab-case for directory names (e.g., `the-stoic-mind`, `psychology-of-money`).

### Step 3: Choose a Color Theme

Select an accent color that fits the book's theme:
- Spirituality/Consciousness: Violet/Purple (#7c3aed)
- Finance/Money: Green (#059669)
- Philosophy/Stoicism: Blue-Purple (#667eea)
- Parenting/Relationships: Teal (#0891b2)
- Technology/AI: Blue (#3b82f6)
- Creativity/Content: Orange (#f97316)
- Religion/Sacred texts: Saffron (#ff6b35)

### Step 4: Create Book-Specific Styles (styles.css)

Create `src/books/[book-slug]/styles.css` with CSS custom properties:

```css
/* [Book Name] - Book-Specific Styles */

:root {
    --accent-color: #XXXXXX;
    --accent-color-dark: #XXXXXX;
    --accent-gradient: linear-gradient(135deg, #XXXXXX 0%, #XXXXXX 100%);
    --section-title-bg: #XXXXXX;
    --key-box-color: #XXXXXX;
    --key-box-bg: #XXXXXX;
    --verse-bg: #XXXXXX;
    --intro-bg: #XXXXXX;
}

/* Add book-specific classes as needed */
```

#### Common Book-Specific Classes to Consider

Depending on the book type, add relevant classes:

**For spiritual/philosophical books:**
```css
.insight-box { }      /* Key spiritual insights */
.practice-box { }     /* Meditation/awareness exercises */
.quote-box { }        /* Notable quotes */
.metaphor-box { }     /* Key metaphors/analogies */
.reflection { }       /* Questions for contemplation */
.central-teaching { } /* Highlighted core message */
```

**For practical/how-to books:**
```css
.technique { }        /* Specific techniques */
.example-dialogue { } /* Conversation examples */
.skill-box { }        /* Step-by-step skills */
.common-mistake { }   /* What to avoid */
.success-story { }    /* Positive examples */
.quick-reference { }  /* Summary cards */
```

#### Using CSS Classes in Markdown

In your chapter markdown files, you can add CSS classes to sections using the `{.class-name}` syntax:

```markdown
### The Core Principle {.principle-box}

This section will be styled with the .principle-box class

### Daily Practice: Morning Routine {.practice-exercise}

This section will be styled as a practice exercise

### Reflection {.reflection}

This section will be styled as a reflection prompt
```

Common classes to use in chapter content:
- `{.principle-box}` - Highlight key principles or core teachings
- `{.practice-exercise}` - Step-by-step practices or exercises
- `{.reflection}` - Reflection questions or contemplation prompts
- `{.insight-box}` - Key insights or "aha" moments
- `{.metaphor-box}` - Important metaphors or analogies
- `{.quote-box}` - Block quotes (or use standard markdown `>` quotes)

### Step 5: Create the Book Overview (book.md)

Create `src/books/[book-slug]/book.md` with the following frontmatter and content:

```markdown
---
title: [Book Title]
subtitle: [Subtitle or Tagline]
authors: [Author Name(s)]
slug: [book-slug]

epigraph:
  quote: "[Opening quote that captures the book's essence]"
  author: [Quote Author]

centralNode:
  title: [BOOK TITLE IN CAPS]
  subtitle: [Core message or tagline]

sections:
  - title: [SECTION/PART NAME]
    chapters:
      - number: 1
        title: [Chapter Title]
        subtitle: [Optional: Chapter subtitle if present]
        description: [2-3 sentence description of what the chapter covers]

      - number: 2
        title: [Chapter Title]
        description: [2-3 sentence description]

      # Add all chapters in this section

  - title: [NEXT SECTION NAME]
    chapters:
      - number: X
        title: [Chapter Title]
        description: [Description]

      # Add more chapters

keyTeachings:
  - principle: "[Principle Name/Title]:"
    description: [Brief explanation of this core teaching]

  - principle: "[Another Principle]:"
    description: [Brief explanation]

  # Add 4-6 key teachings

layout: book-index
permalink: [book-slug]/index.html
---

## About This Book

[Write 2-3 paragraphs explaining:
- What the book is about
- Who it's for
- What readers will learn
- How this mind map helps]
```

**Important Notes:**
- The frontmatter (between `---` markers) contains all structured data
- The content after frontmatter is the introduction text
- Chapter numbers can be non-sequential (see example with chapters 1, 2, 3, 4, 5, 8...)
- Group chapters by thematic sections, not necessarily by sequential order

### Step 6: Create Chapter Files (Markdown)

For each chapter, create `src/books/[book-slug]/chapters/chapter-XX.md`:

```markdown
---
number: [X]
title: [Chapter Title]
meta: [Optional: Brief subtitle or context]
part: [Section/Part name this chapter belongs to]
layout: chapter
book: [book-slug]
permalink: [book-slug]/chapters/chapter-XX.html
---

> "[Opening quote from the book that relates to this chapter]"
> — [Author]

## [First Section Title]

[Engaging introduction paragraph explaining what this chapter covers. Make it accessible and clear.]

[Continue with explanatory content. Break complex ideas into digestible sections. Use practical examples where relevant.]

### [Subsection Title] {.principle-box}

[Use CSS classes like .principle-box, .practice-exercise, or .reflection to add semantic styling to sections]

## [Second Section Title]

[More content explaining key concepts]

- **[Key Point]:** [Explanation]
- **[Another Point]:** [Explanation]

> "[Another relevant quote]"
> — [Author]

## [Third Section Title]

[Continue with more content sections]

### Daily Practice: [Practice Name] {.practice-exercise}

- [Step 1 of the practice]
- [Step 2]
- [Step 3]

### Reflection {.reflection}

[Thought-provoking question or reflection prompt for the reader]

## Key Takeaways

- [Main takeaway 1]
- [Main takeaway 2]
- [Main takeaway 3]
- [Main takeaway 4]
- [Main takeaway 5-6]
```

**Important Chapter Writing Guidelines:**
- Use zero-padded chapter numbers in filenames (chapter-01.md, chapter-02.md, etc.)
- Include 1-2 notable quotes from the book
- Use CSS class annotations like `{.principle-box}` to add semantic styling
- Break content into 3-5 main sections with `##` headings
- End with 4-6 key takeaways
- Navigation is handled automatically by the template based on chapter number

### Step 7: Build the HTML Output

After creating all markdown files, run the Eleventy build command:

```bash
npm run build
```

This will:
- Process all markdown files in `src/books/[book-slug]/`
- Apply the Nunjucks templates (`book-index.njk` and `chapter.njk`)
- Generate HTML files in `docs/[book-slug]/`
- Copy over shared assets and book-specific CSS

For development with live reload:
```bash
npm run dev
```

### Step 8: Update the Main Homepage (index.html)

Add the new book to the root `index.html`:

1. **Add book cover style** in the `<style>` section:
```css
.book-cover.[book-class] {
    background: linear-gradient(135deg, #XXXXXX 0%, #XXXXXX 100%);
}
```

2. **Add book card** in the `#bookGrid` div:
```html
<a href="[book-name]/index.html" class="book-card"
   data-title="[Book Title]"
   data-author="[Author Name]"
   data-tags="[space-separated tags for filtering]">
    <div class="book-cover [book-class]">&#XXXXX;</div>
    <div class="book-title">[Book Title]</div>
    <div class="book-author">by [Author]</div>
    <div class="book-description">[2-3 sentence description]</div>
    <div class="book-stats">[X] Chapters | [Additional info]</div>
    <div class="book-tags">
        <span class="book-tag">[Tag 1]</span>
        <span class="book-tag">[Tag 2]</span>
        <span class="book-tag">[Tag 3]</span>
    </div>
</a>
```

#### Unicode Icons for Book Covers
- &#2384; (ॐ) - Spirituality/Hinduism
- &#9883; - Philosophy/Balance
- &#128430; - Technology/Networks
- &#9829; - Relationships/Love
- &#129504; - Brain/Psychology
- &#36; - Money/Finance
- &#127909; - Video/Content
- &#10024; (✨) - Consciousness/Soul
- &#128218; - Books/Learning

---

## Content Guidelines

### Writing Style
- Accessible to first-time readers while maintaining depth
- Explanatory prose sections between key content
- Practical applications and reflections
- Key insights as concise bullet points
- No unnecessary jargon
- Use the author's key metaphors and examples

### Content Organization
- Break complex ideas into digestible sections
- Use consistent heading hierarchy (h1 for title, h2 for sections, h3 for subsections)
- Include practical examples where relevant
- End chapters with key takeaways (4-6 bullet points)
- Include 1-2 notable quotes per chapter

### Chapter Content Depth
Each chapter should include:
- Introduction paragraph (what the chapter covers)
- 3-5 main sections with h2 headings
- At least one quote box with author attribution
- At least one insight/metaphor/practice box
- Key takeaways list at the end
- Proper navigation to previous/next chapters

---

## Shared Design System

### Color Palette
Each book can customize its accent color while maintaining the design system:
- **Primary accent:** Book-specific
- **Background gradient:** Purple (667eea to 764ba2)
- **Container background:** White
- **Text colors:** Dark gray (#2d3748, #4a5568)
- **Key points box:** Matches accent or teal (#38b2ac)

### Core CSS Classes
All books share these fundamental classes from `shared/styles.css`:
- `.container` / `.container-narrow` - Layout containers
- `.back-button` - Navigation back link
- `.intro` - Introduction box with left border
- `.central-node` - Main title node (customizable gradient)
- `.section` - Content sections
- `.section-title` - Section header bars
- `.chapters-grid` - Grid layout for chapter cards
- `.chapter-card` - Clickable chapter cards
- `.chapter-number`, `.chapter-name`, `.chapter-description` - Card contents
- `.key-points` / `.key-teachings` - Summary boxes
- `.chapter-nav` - Previous/Next navigation
- `.quote-box` - For notable quotes (if not in shared, add to book styles)
- `.verse` - For verses/quotes with special styling

---

## Technical Notes

- **Static Site Generator:** Eleventy (11ty) v3.1.2
- **Templating:** Nunjucks (.njk templates)
- **Content Format:** Markdown (.md) with YAML frontmatter
- **Styling:** Pure CSS with vanilla JavaScript for highlighting
- **Build Command:** `npm run build` (outputs to `docs/` for GitHub Pages)
- **Dev Server:** `npm run dev` (live reload on changes)
- Works offline once downloaded
- Print-friendly styling
- Accessible color contrast ratios
- localStorage used for highlight persistence (per-book storage keys)

## Highlight Feature

The shared `highlight.js` provides:
- Text selection and highlighting
- localStorage persistence
- Remove highlight functionality
- Works across all pages
- Storage key format: `[book]_highlights`

## Navigation Patterns

- Each chapter links to previous and next chapters
- First chapter: "Previous" links to overview
- Last chapter: "Next" links to overview
- All pages have "Back to Mind Map" link

---

## Checklist for New Mind Map

- [ ] Research book structure (chapters, sections, key teachings)
- [ ] Choose appropriate color theme for the book
- [ ] Create source directories: `src/books/[book-slug]/` and `src/books/[book-slug]/chapters/`
- [ ] Create root directory for styles: `[book-slug]/`
- [ ] Create `[book-slug]/styles.css` with theme colors and custom CSS variables
- [ ] Create `src/books/[book-slug]/book.md` with complete frontmatter and introduction
- [ ] Create all chapter markdown files in `src/books/[book-slug]/chapters/chapter-XX.md`
- [ ] Verify all frontmatter is correct (permalinks, chapter numbers, book slugs)
- [ ] Run `npm run build` to generate HTML output
- [ ] Verify generated files in `docs/[book-slug]/`
- [ ] Test chapter navigation (previous/next links work correctly)
- [ ] Add book to root `index.html` homepage
- [ ] Add book cover CSS class to root `index.html`
- [ ] Test filtering/search on homepage includes new book
- [ ] Run `npm run dev` to preview with live reload
