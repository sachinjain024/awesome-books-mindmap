# Eleventy Migration - Proof of Concept

This is a proof-of-concept migration of **The Stoic Mind** book to Eleventy static site generator.

## What's Been Done

### ✅ Setup Complete
- Installed Eleventy (v3.1.2)
- Created source directory structure
- Set up configuration
- Added build scripts to package.json

### ✅ Data Separation
- **Book content** is now in `src/_data/stoicMind.json`
- All 25 chapters' metadata (titles, descriptions, sections)
- Book metadata (title, authors, intro, key teachings)
- Easy to edit in structured JSON format

### ✅ Template System
- **Base layout** (`src/_includes/layouts/base.njk`) - HTML structure
- **Book index layout** (`src/_includes/layouts/book-index.njk`) - Mind map page template
- Templates use Nunjucks templating language

### ✅ Generated Output
- Generates `_site/the-stoic-mind/index.html`
- Output matches the original HTML structure
- Preserves all existing CSS classes and styling

## Directory Structure

```
booksmap/
├── src/                              # SOURCE FILES (for Eleventy)
│   ├── _data/
│   │   └── stoicMind.json           # Book content & metadata
│   ├── _includes/
│   │   └── layouts/
│   │       ├── base.njk             # Base HTML template
│   │       └── book-index.njk       # Book index page template
│   └── the-stoic-mind.njk           # Entry point for book index
│
├── _site/                            # GENERATED OUTPUT (by Eleventy)
│   └── the-stoic-mind/
│       └── index.html               # Generated index page
│
├── the-stoic-mind/                   # ORIGINAL FILES (unchanged)
│   ├── index.html
│   ├── styles.css
│   └── chapters/
│
├── shared/                           # Shared assets (copied as-is)
│   ├── styles.css
│   └── highlight.js
│
├── .eleventy.js                      # Eleventy configuration
└── package.json                      # NPM scripts
```

## How It Works

### 1. Content (JSON)
All book data lives in `src/_data/stoicMind.json`:

```json
{
  "title": "The Stoic Mind",
  "authors": "Addy Osmani & GoLimitlesss",
  "sections": [
    {
      "title": "WORK, LIFE & ACTION",
      "chapters": [
        {
          "number": 1,
          "title": "Work is a Subset of Life, Not a Superset",
          "description": "Understanding the Stoic perspective..."
        }
      ]
    }
  ]
}
```

### 2. Templates (Nunjucks)
Templates in `src/_includes/layouts/` use the data:

```html
<h1>{{ bookData.title }}</h1>

{% for section in bookData.sections %}
  <div class="section-title">{{ section.title }}</div>
  {% for chapter in section.chapters %}
    <a href="chapters/chapter-{{ chapter.number }}.html">
      {{ chapter.title }}
    </a>
  {% endfor %}
{% endfor %}
```

### 3. Build Process
Eleventy reads templates + data and generates static HTML:

```bash
npm run build
# Generates: _site/the-stoic-mind/index.html
```

## Usage

### Development (with auto-reload)
```bash
npm run dev
```
- Starts local server at `http://localhost:8080`
- Auto-rebuilds when files change
- Live reload in browser

### Production Build
```bash
npm run build
```
- Generates static files to `_site/`
- Ready to deploy

## What's Next?

### To Complete "The Stoic Mind" Migration:

1. **Chapter Pages**
   - Create chapter data (extract from existing HTML)
   - Create chapter template
   - Generate all 25 chapter pages

2. **Chapter Navigation**
   - Add prev/next chapter logic
   - Handle first/last chapter edge cases

### To Migrate Other Books:

1. **Create data file** for new book
   ```bash
   src/_data/bhagavadGita.json
   ```

2. **Create entry file**
   ```bash
   src/bhagavad-gita.njk
   ```

3. **Reuse templates** (they're already generic!)

4. **Build** - that's it!

## Comparison: Before vs After

### Before (Current Approach)
```html
<!-- the-stoic-mind/index.html -->
<!DOCTYPE html>
<html>
<head>...</head>
<body>
  <h1>The Stoic Mind</h1>
  <!-- 200+ lines of chapter cards -->
  <a href="chapters/chapter-01.html">
    <div class="chapter-number">Chapter 1</div>
    <div class="chapter-name">Work is a Subset...</div>
    ...
  </a>
  <!-- Repeat for all 25 chapters -->
</body>
</html>
```

**Editing** requires:
- Finding the right HTML
- Copying structure for consistency
- Manual duplication
- Easy to make mistakes

### After (Eleventy Approach)
```json
// src/_data/stoicMind.json
{
  "chapters": [
    {
      "number": 1,
      "title": "Work is a Subset of Life",
      "description": "Understanding the Stoic perspective..."
    }
  ]
}
```

**Editing** requires:
- Update JSON data
- Run `npm run build`
- Done!

Template handles all HTML structure automatically.

## Benefits Demonstrated

✅ **Separation of concerns** - Content vs Presentation
✅ **Easier editing** - JSON is cleaner than HTML
✅ **Consistency** - One template = consistent structure
✅ **Maintainability** - Update template once, affects all pages
✅ **DRY principle** - No repeated HTML structures

## Original Files

**IMPORTANT:** Original HTML files are untouched!

- `the-stoic-mind/index.html` - Still exists, unchanged
- `the-stoic-mind/chapters/*.html` - Still exist, unchanged

You can compare generated vs original to verify they match.

## Testing the Output

```bash
# Build the site
npm run build

# Compare generated vs original
diff the-stoic-mind/index.html _site/the-stoic-mind/index.html

# Open generated file
open _site/the-stoic-mind/index.html
```

The generated HTML should look nearly identical to the original (minor whitespace differences are expected).

## Next Steps

**Option A: Complete The Stoic Mind**
- Add chapter data
- Create chapter template
- Generate all 25 chapters
- Full migration complete

**Option B: Try Another Book**
- Pick a smaller book
- Create data file
- See how quickly you can migrate it

**Option C: Evaluate & Decide**
- Compare workflows
- Decide if benefits outweigh the build step
- Commit to migration or stay with current approach

## Questions?

- **Q: Can I still edit the original HTML files?**
  A: Yes! They're completely separate. This is just a proof of concept.

- **Q: What happens to existing URLs?**
  A: Generated files use the same paths (`the-stoic-mind/index.html`), so URLs don't change.

- **Q: Do I need Node.js installed?**
  A: Yes, to run the build process. But generated HTML works without it.

- **Q: Can I deploy the generated site?**
  A: Yes! Just deploy the `_site/` folder. It's pure HTML/CSS/JS.

---

**Migration Status:** 🟡 Proof of Concept
**Files Migrated:** 1 (index page)
**Files Remaining:** 25 (chapter pages)
