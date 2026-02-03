# Booksmap - Multi-Book Mind Map Collection

## Project Overview

Booksmap is a static HTML website collection presenting various books in an accessible, mind-map style format. Each book gets its own directory with a consistent structure and shared styling.

## Project Structure

```
booksmap/
├── CLAUDE.md                        # This file - shared guidelines
├── shared/
│   ├── styles.css                   # Common CSS for all books
│   └── highlight.js                 # Text highlighting feature
├── bhagavad-gita/
│   ├── index.html                   # Main landing page
│   ├── styles.css                   # Book-specific overrides (optional)
│   └── chapters/
│       └── chapter-XX.html          # Individual chapter pages
├── how-to-talk-so-kids-will-listen/
│   ├── index.html                   # Main landing page
│   └── chapters/
│       └── chapter-XX.html          # Individual chapter pages
└── [future-books]/
```

## Shared Design System

### Color Palette
Each book can customize its accent color while maintaining the design system:
- **Primary accent:** Book-specific (e.g., saffron #ff6b35 for Gita, teal #0891b2 for parenting)
- **Background gradient:** Purple (667eea to 764ba2)
- **Container background:** White
- **Text colors:** Dark gray (#2d3748, #4a5568)
- **Key points box:** Teal (#38b2ac)

### Core CSS Classes
All books share these fundamental classes:
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

### Book-Specific Classes
Each book may add unique classes:
- Bhagavad Gita: `.verse`, `.verse-number`, `.verse-text`, `.chapter-sanskrit`
- Parenting book: `.technique`, `.example-dialogue`, `.skill-box`, `.common-mistake`

## HTML Structure Patterns

### Main Index Page
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Book Title] Mind Map</title>
    <link rel="stylesheet" href="../shared/styles.css">
    <link rel="stylesheet" href="styles.css"> <!-- Optional book-specific -->
</head>
<body>
    <div class="container">
        <h1>[Book Title]</h1>
        <div class="subtitle">[Author/Subtitle]</div>
        <div class="intro">...</div>
        <div class="central-node">...</div>
        <div class="mindmap">
            <div class="section">
                <div class="section-title">SECTION TITLE</div>
                <div class="chapters-grid">
                    <a href="chapters/chapter-01.html" class="chapter-card">...</a>
                </div>
            </div>
        </div>
        <div class="key-teachings">...</div>
    </div>
    <script src="../shared/highlight.js" defer></script>
</body>
</html>
```

### Chapter Page
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chapter X: [Title] - [Book Name]</title>
    <link rel="stylesheet" href="../../shared/styles.css">
    <link rel="stylesheet" href="../styles.css"> <!-- Optional book-specific -->
</head>
<body>
    <div class="container container-narrow">
        <a href="../index.html" class="back-button">Back to Mind Map</a>
        <h1 class="chapter-title">Chapter X: [Title]</h1>
        <div class="chapter-meta">[Subtitle or metadata]</div>
        <!-- Content sections -->
        <div class="chapter-nav">
            <a href="../index.html">Back to Overview</a>
            <a href="chapter-XX.html">Next: Chapter X</a>
        </div>
    </div>
    <script src="../../shared/highlight.js" defer></script>
</body>
</html>
```

## Content Guidelines

### Writing Style
- Accessible to first-time readers while maintaining depth
- Explanatory prose sections between key content
- Practical applications and reflections
- Key insights as concise bullet points
- No unnecessary jargon

### Content Organization
- Break complex ideas into digestible sections
- Use consistent heading hierarchy (h1 for title, h2 for sections, h3 for subsections)
- Include practical examples where relevant
- End chapters with key takeaways

## Modification Guidelines

### Adding a New Book
1. Create new directory: `booksmap/[book-name]/`
2. Create `index.html` following the template structure
3. Create `chapters/` directory for chapter files
4. Optionally create `styles.css` for book-specific customizations
5. Use relative paths to shared resources (`../shared/`)

### Updating Shared Styles
- Modify `shared/styles.css` for site-wide changes
- Test changes across all existing books
- Use CSS custom properties (variables) for theming

### Book-Specific Customizations
- Create `[book]/styles.css` for overrides
- Define custom accent colors via CSS variables
- Add book-specific classes as needed
- Keep customizations minimal to maintain consistency

## Technical Notes

- Pure HTML/CSS with vanilla JavaScript for highlighting
- No build tools or frameworks required
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
