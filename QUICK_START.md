# Quick Start: Migrate Another Book

## How to Migrate a New Book in 3 Steps

### Step 1: Create Data File (15 min)

Create `src/_data/yourBook.json`:

```json
{
  "title": "Your Book Title",
  "subtitle": "Book Subtitle",
  "authors": "Author Name",
  "slug": "your-book-title",
  "intro": {
    "title": "About This Book",
    "paragraphs": [
      "First paragraph of introduction.",
      "Second paragraph if needed."
    ]
  },
  "epigraph": {
    "quote": "Notable quote from the book",
    "author": "Quote Author"
  },
  "centralNode": {
    "title": "MAIN TITLE",
    "subtitle": "Tagline or subtitle"
  },
  "sections": [
    {
      "title": "SECTION 1 NAME",
      "chapters": [
        {
          "number": 1,
          "title": "Chapter Title",
          "subtitle": "Optional subtitle",
          "description": "Brief description of the chapter."
        }
      ]
    }
  ],
  "keyTeachings": [
    {
      "principle": "First Teaching:",
      "description": "Explanation of the teaching"
    }
  ]
}
```

**Tip:** Copy `stoicMind.json` and modify it!

### Step 2: Create Entry File (2 min)

Create `src/your-book-title.njk`:

```njk
---
layout: layouts/book-index.njk
title: Your Book Title - Mind Map
bookSlug: your-book-title
stylePath: ..
permalink: your-book-title/index.html
---
```

**Important:** Replace `your-book-title` with your book's slug.

But wait! We need to update the template to use the data file dynamically.

### Step 3: Build (1 min)

```bash
npm run build
```

Check output:
```bash
open _site/your-book-title/index.html
```

## Full Example: Migrating "Psychology of Money"

### 1. Data File
Create `src/_data/psychologyOfMoney.json`:

```json
{
  "title": "The Psychology of Money",
  "subtitle": "Timeless Lessons on Wealth, Greed, and Happiness",
  "authors": "Morgan Housel",
  "slug": "psychology-of-money",
  "intro": {
    "title": "About This Book",
    "paragraphs": [
      "The Psychology of Money explores the strange ways people think about money and teaches you how to make better financial decisions."
    ]
  },
  "epigraph": {
    "quote": "Doing well with money has little to do with how smart you are and a lot to do with how you behave.",
    "author": "Morgan Housel"
  },
  "centralNode": {
    "title": "THE PSYCHOLOGY OF MONEY",
    "subtitle": "Timeless Lessons on Wealth"
  },
  "sections": [
    {
      "title": "BUILDING WEALTH",
      "chapters": [
        {
          "number": 1,
          "title": "No One's Crazy",
          "description": "Your personal experiences with money make up maybe 0.00000001% of what's happened in the world, but maybe 80% of how you think the world works."
        }
      ]
    }
  ],
  "keyTeachings": [
    {
      "principle": "Wealth vs Rich:",
      "description": "Wealth is what you don't see — money not spent"
    }
  ]
}
```

### 2. Entry File
Create `src/psychology-of-money.njk`:

```njk
---
layout: layouts/book-index.njk
title: The Psychology of Money - Mind Map
bookSlug: psychology-of-money
stylePath: ..
permalink: psychology-of-money/index.html
---
```

Wait! We need to fix the template to accept which data file to use.

## Problem: Template Hardcoded

Our current template hardcodes `stoicMind`:
```njk
{% set bookData = stoicMind %}
```

We need to make it dynamic!

### Solution: Update Template

Let me show you how to make the template accept any book...

Actually, there's a better approach! Let me create a more flexible system.

---

## Better Approach: Collection-Based

Instead of creating individual files, use Eleventy collections to auto-generate all book index pages.

### 1. Create a Directory of Data Files
```
src/_data/books/
├── stoicMind.json
├── psychologyOfMoney.json
├── bhagavadGita.json
└── ...
```

### 2. Create a Template That Loops
```njk
---
pagination:
  data: books
  size: 1
  alias: book
layout: layouts/book-index.njk
permalink: "{{ book.slug }}/index.html"
title: "{{ book.title }} - Mind Map"
---
```

This would automatically generate a page for each book!

---

## For Now: Simple Approach

Since this is a proof of concept, here's the simplest way to add another book:

### Update `book-index.njk` to accept book data dynamically

The issue is that our template needs to know which data file to use. The easiest solution:

**Option 1: Pass data file name in front matter**

Actually, I realize the better approach is to keep it simple for the proof of concept. Let me just show you how to duplicate the setup for one more book:

1. Copy `src/_data/stoicMind.json` → `src/_data/psychologyOfMoney.json`
2. Edit the data
3. Copy `src/_includes/layouts/book-index.njk` → `src/_includes/layouts/book-index-pom.njk`
4. Change `{% set bookData = stoicMind %}` to `{% set bookData = psychologyOfMoney %}`
5. Create `src/psychology-of-money.njk` using the new layout

This works but isn't ideal. For a full migration, you'd want a more sophisticated system.

---

## The Real Answer

For a complete migration with many books, you'd want:

### 1. Store all books in one place
```
src/_data/books.json
```
Or:
```
src/_data/books/
├── stoic-mind.json
├── psychology-of-money.json
└── ...
```

### 2. Create a pagination template
```njk
---
pagination:
  data: collections.books
  size: 1
  alias: book
---
```

### 3. Auto-generate all index pages
One template generates pages for all books automatically.

This is more advanced Eleventy usage but would be the "proper" way to scale.

---

## Current Status

**For this proof of concept:**
- ✅ The Stoic Mind index page is migrated
- ✅ Template system works
- ✅ Data separation proven

**To actually migrate all books:**
- Need to decide on a scalable architecture
- Need to create data files for all 35+ books
- Need to test with multiple books

**Recommendation for next steps:**
1. Test with 2-3 books to validate the approach
2. Then decide on the architecture for all books
3. Consider using Eleventy's pagination feature for automation

---

## Need Help?

See:
- `MIGRATION_SUMMARY.md` - What was done
- `ELEVENTY_MIGRATION.md` - Detailed guide
- [Eleventy Docs](https://www.11ty.dev/docs/) - Official documentation
