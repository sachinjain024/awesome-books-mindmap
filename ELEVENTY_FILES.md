# Eleventy Migration - File Overview

## Files Created for This Migration

### Configuration & Setup
```
├── package.json              # NPM config with Eleventy dependency
├── package-lock.json         # Dependency lock file
├── .eleventy.js              # Eleventy configuration
└── .gitignore                # Updated to ignore node_modules, _site
```

### Documentation
```
├── ELEVENTY_MIGRATION.md     # Comprehensive migration guide
├── MIGRATION_SUMMARY.md      # Summary of what was done
├── QUICK_START.md            # Guide for migrating more books
└── ELEVENTY_FILES.md         # This file - file overview
```

### Source Files (What You Edit)
```
src/
├── _data/
│   └── stoicMind.json        # Book data: 25 chapters + metadata
│
├── _includes/
│   └── layouts/
│       ├── base.njk          # Base HTML template (17 lines)
│       └── book-index.njk    # Index page template (58 lines)
│
└── the-stoic-mind.njk        # Entry point (7 lines)
```

### Generated Files (Auto-Created by Build)
```
_site/
├── shared/                   # Copied from original
│   ├── styles.css
│   └── highlight.js
│
└── the-stoic-mind/
    ├── styles.css            # Copied from original
    └── index.html            # Generated from template + data ✨
```

### Original Files (Untouched)
```
the-stoic-mind/
├── index.html                # Original preserved
├── styles.css                # Original preserved
└── chapters/
    ├── chapter-01.html       # Original preserved
    ├── chapter-02.html       # Original preserved
    └── ...                   # All 25 chapters preserved
```

## File Size Comparison

### Source Files (Human-Edited)
| File | Lines | Purpose |
|------|-------|---------|
| `src/_data/stoicMind.json` | 165 | Book content & metadata |
| `src/_includes/layouts/base.njk` | 17 | HTML wrapper template |
| `src/_includes/layouts/book-index.njk` | 58 | Index page template |
| `src/the-stoic-mind.njk` | 7 | Entry point (front matter) |
| **Total** | **247** | All source files |

### Generated Files (Auto-Created)
| File | Lines | Purpose |
|------|-------|---------|
| `_site/the-stoic-mind/index.html` | 308 | Final HTML page |

### Original Files (For Comparison)
| File | Lines | Purpose |
|------|-------|---------|
| `the-stoic-mind/index.html` | 234 | Original HTML |

## Visual Directory Tree

```
booksmap/
│
├── 📦 node_modules/          # Eleventy & dependencies (auto-generated)
│
├── 🎨 shared/                # Shared assets (untouched)
│   ├── styles.css
│   └── highlight.js
│
├── 📚 the-stoic-mind/        # Original book files (untouched)
│   ├── index.html
│   ├── styles.css
│   └── chapters/
│       └── *.html
│
├── 📝 src/                   # Eleventy source files (NEW)
│   ├── _data/
│   │   └── stoicMind.json
│   ├── _includes/
│   │   └── layouts/
│   │       ├── base.njk
│   │       └── book-index.njk
│   └── the-stoic-mind.njk
│
├── 🏗️ _site/                 # Generated output (NEW, auto-created)
│   ├── shared/
│   └── the-stoic-mind/
│       └── index.html
│
├── ⚙️ .eleventy.js           # Eleventy config
├── 📦 package.json           # NPM config
├── 📄 package-lock.json      # Dependency lock
├── 🚫 .gitignore             # Git ignore rules
│
└── 📖 Documentation (NEW)
    ├── ELEVENTY_MIGRATION.md
    ├── MIGRATION_SUMMARY.md
    ├── QUICK_START.md
    └── ELEVENTY_FILES.md (this file)
```

## What Each File Does

### `src/_data/stoicMind.json`
- **Type:** Data file (JSON)
- **Purpose:** Contains all book content
- **What's inside:**
  - Book metadata (title, authors, subtitle)
  - 25 chapters organized into 7 sections
  - Chapter titles, subtitles, descriptions
  - Introduction text
  - Epigraph quote
  - Key teachings
- **You edit this to:** Update book content without touching HTML

### `src/_includes/layouts/base.njk`
- **Type:** Template (Nunjucks)
- **Purpose:** Base HTML structure
- **What's inside:**
  - `<html>`, `<head>`, `<body>` tags
  - CSS links
  - Script tags
- **You edit this to:** Change site-wide HTML structure

### `src/_includes/layouts/book-index.njk`
- **Type:** Template (Nunjucks)
- **Purpose:** Generate book index pages
- **What's inside:**
  - Loops over sections and chapters
  - Renders chapter cards
  - Conditional rendering for subtitles
- **You edit this to:** Change how index pages look

### `src/the-stoic-mind.njk`
- **Type:** Entry point (Nunjucks with front matter)
- **Purpose:** Tells Eleventy to generate the index page
- **What's inside:**
  - Front matter with page metadata
  - Layout reference
  - Permalink (output path)
- **You edit this to:** Configure output settings

### `.eleventy.js`
- **Type:** Configuration (JavaScript)
- **Purpose:** Configure Eleventy behavior
- **What's inside:**
  - Input/output directories
  - Passthrough copy rules
  - Custom filters
- **You edit this to:** Configure build process

### `_site/the-stoic-mind/index.html`
- **Type:** Generated HTML
- **Purpose:** Final output ready for deployment
- **What's inside:** Complete HTML from template + data
- **You don't edit this:** Auto-generated by build

## Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                    BUILD PROCESS                        │
└─────────────────────────────────────────────────────────┘

Step 1: Load Data
src/_data/stoicMind.json
        │
        ├─→ Parse JSON
        └─→ Make available as `stoicMind` variable

Step 2: Process Entry File
src/the-stoic-mind.njk
        │
        ├─→ Read front matter (layout, title, etc.)
        └─→ Route to layout template

Step 3: Render Template
src/_includes/layouts/book-index.njk
        │
        ├─→ Access `stoicMind` data
        ├─→ Loop over sections/chapters
        └─→ Generate HTML

Step 4: Wrap in Base Layout
src/_includes/layouts/base.njk
        │
        ├─→ Add <html>, <head>, <body>
        ├─→ Add CSS links
        └─→ Add script tags

Step 5: Output
_site/the-stoic-mind/index.html
        │
        └─→ Complete HTML ready to deploy!
```

## Commands & What They Do

### `npm install`
- Installs Eleventy and dependencies
- Creates `node_modules/` directory
- Run once after cloning the repo

### `npm run build`
- Reads `src/` directory
- Processes templates
- Generates `_site/` directory
- Copies static assets
- **Output:** Production-ready static site

### `npm run dev`
- Same as `npm run build` but also:
  - Starts local web server
  - Watches for file changes
  - Auto-rebuilds on save
  - Live-reloads browser
- **Use for:** Development

## Editing Workflow

### To Change Book Content
```bash
1. Edit: src/_data/stoicMind.json
2. Run:  npm run build
3. View: _site/the-stoic-mind/index.html
```

### To Change Page Structure
```bash
1. Edit: src/_includes/layouts/book-index.njk
2. Run:  npm run build
3. View: _site/the-stoic-mind/index.html
```

### To Change Site-Wide HTML
```bash
1. Edit: src/_includes/layouts/base.njk
2. Run:  npm run build
3. View: All pages updated!
```

## Deployment

### Option 1: Deploy `_site/` Folder
```bash
npm run build
# Upload _site/ to your web server
```

### Option 2: Build on Server
```bash
# On server:
npm install
npm run build
# Serve _site/ directory
```

## Git Considerations

### What to Commit
```
✅ src/                        # Source files
✅ .eleventy.js                # Config
✅ package.json                # Dependencies list
✅ package-lock.json           # Exact versions
✅ .gitignore                  # Git rules
✅ Documentation files
```

### What to Ignore
```
❌ node_modules/               # In .gitignore
❌ _site/                      # In .gitignore (generated)
```

### Why?
- `node_modules/` can be recreated with `npm install`
- `_site/` can be recreated with `npm run build`
- Only commit source files, not generated files

## Next Developer Setup

When someone clones the repo:
```bash
# 1. Install dependencies
npm install

# 2. Build the site
npm run build

# 3. Start development server
npm run dev
```

That's it! No complex setup needed.

---

## Quick Reference

| Task | Command |
|------|---------|
| Install | `npm install` |
| Build | `npm run build` |
| Develop | `npm run dev` |
| View | `open _site/the-stoic-mind/index.html` |
| Edit content | `src/_data/stoicMind.json` |
| Edit template | `src/_includes/layouts/book-index.njk` |
| Clean | `rm -rf _site` |

---

**Created:** 2026-02-14
**Eleventy Version:** 3.1.2
**Node Version Required:** 14+
