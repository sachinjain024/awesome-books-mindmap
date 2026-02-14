# Bhagavad Gita Mind Map Project

## Project Overview

This is a static HTML website presenting the Bhagavad Gita in an accessible, mind-map style format. The project is based on Swami Prabhupada's "Bhagavad Gita As It Is" translation and commentary.

## Project Structure

```
bhagwad-gita/
├── index.html  # Main landing page with all 18 chapters
├── styles.css                   # Shared CSS for all pages
├── chapters/
│   ├── chapter-01.html         # Chapter 1: Observing the Armies
│   ├── chapter-02.html         # Chapter 2: Contents Summarized
│   ├── chapter-03.html         # Chapter 3: Karma Yoga
│   ├── chapter-04.html         # Chapter 4: Transcendental Knowledge
│   ├── chapter-05.html         # Chapter 5: Karma Yoga - Action in Krishna Consciousness
│   ├── chapter-06.html         # Chapter 6: Dhyana Yoga
│   ├── chapter-07.html         # Chapter 7: Knowledge of the Absolute
│   ├── chapter-08.html         # Chapter 8: Attaining the Supreme
│   ├── chapter-09.html         # Chapter 9: The Most Confidential Knowledge
│   ├── chapter-10.html         # Chapter 10: The Opulence of the Absolute
│   ├── chapter-11.html         # Chapter 11: The Universal Form
│   ├── chapter-12.html         # Chapter 12: Devotional Service
│   ├── chapter-13.html         # Chapter 13: Nature, the Enjoyer, and Consciousness
│   ├── chapter-14.html         # Chapter 14: The Three Modes of Material Nature
│   ├── chapter-15.html         # Chapter 15: The Yoga of the Supreme Person
│   ├── chapter-16.html         # Chapter 16: Divine and Demoniac Natures
│   ├── chapter-17.html         # Chapter 17: The Divisions of Faith
│   └── chapter-18.html         # Chapter 18: Conclusion of Divine Revelation
└── CLAUDE.md                    # This file
```

## Key Design Patterns

### HTML Structure
Each chapter page follows a consistent structure:
- `.container.container-narrow` - Main content wrapper
- `.back-button` - Link back to mind map
- `.chapter-title` - Chapter heading
- `.chapter-meta` - Sanskrit name and verse count
- `.section` - Major thematic sections with `<h2>` headings
- `.verse` - Individual verse quotations with `.verse-number` and `.verse-text`
- `.key-points` - Summary list of chapter insights
- `.chapter-nav` - Previous/Next navigation links

### CSS Organization
All pages share `styles.css` for consistent styling:
- Light, warm color scheme (cream background, saffron accents)
- Responsive design with mobile-friendly typography
- Card-based layout for chapter grid on main page
- Distinct styling for verses, sections, and key points

## Content Guidelines

### Writing Style
- Accessible to first-time readers while maintaining depth
- Explanatory prose sections between verse quotations
- Practical applications and reflections
- Key insights as concise bullet points

### Verse Selection
- Select significant verses that capture chapter themes
- Include both philosophical and practical teachings
- Maintain balance between devotional and analytical content

## Modification Guidelines

### Adding New Content
1. Follow existing HTML structure in chapter files
2. Use shared CSS classes from `styles.css`
3. Maintain consistent navigation links
4. Keep verse formatting consistent

### Updating Styles
- Modify `styles.css` for site-wide changes
- Use page-specific `<style>` blocks only for unique page needs
- Maintain responsive design principles

### Chapter Navigation
- Each chapter links to previous and next chapters
- First chapter links to mind map for "Previous"
- Last chapter links to mind map for "Next"

## Technical Notes

- Pure HTML/CSS, no JavaScript dependencies
- Works offline once downloaded
- Print-friendly styling
- Accessible color contrast ratios
