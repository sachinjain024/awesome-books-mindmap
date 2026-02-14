# GitHub Pages Deployment Guide

## Overview

This project is configured to deploy to GitHub Pages using the `docs/` directory.

## Build Configuration

- **Build Command:** `npm run build`
- **Output Directory:** `docs/` (not `_site/`)
- **Why `docs/`?** GitHub Pages only supports publishing from root `/` or `/docs` folder

## Deployment Steps

### 1. Build the Site

```bash
npm run build
```

This generates all HTML files in the `docs/` directory.

### 2. Commit and Push

```bash
git add docs/
git commit -m "Build site for deployment"
git push origin main
```

**Important:** The `docs/` directory must be committed to git (it's not in `.gitignore`).

### 3. Configure GitHub Pages (One-time setup)

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**:
   - Branch: `main` (or your default branch)
   - Folder: `/docs`
4. Click **Save**

### 4. Access Your Site

After a few minutes, your site will be live at:
```
https://<username>.github.io/<repo-name>/
```

## Local Development

### View Locally

Open in browser:
```bash
open docs/index.html
```

Or use a local server:
```bash
npx serve docs
```

### Development with Live Reload

```bash
npm run dev
```

This starts Eleventy in watch mode with a dev server.

## Important Notes

### What Gets Deployed

The `docs/` directory contains:
- ✅ `index.html` (homepage)
- ✅ All book directories (static + generated)
- ✅ `shared/` assets (CSS, JS)
- ✅ Book-specific CSS files

### Build Workflow

1. **Source files:** `src/books/[book-slug]/` (Markdown)
2. **Templates:** `src/_includes/` (Nunjucks)
3. **Build:** `npm run build`
4. **Output:** `docs/[book-slug]/` (HTML)
5. **Deploy:** Commit `docs/` and push to GitHub

### Before Pushing

Always build before committing:
```bash
npm run build
git add docs/
git commit -m "Update content"
git push
```

### Troubleshooting

**Links not working?**
- Make sure you're viewing `docs/index.html`, not root `index.html`
- Verify all books are in `docs/` directory

**Changes not showing?**
- Run `npm run build` to regenerate
- Clear browser cache
- Wait a few minutes for GitHub Pages to update

**404 errors?**
- Check GitHub Pages settings (Settings → Pages)
- Verify branch and folder are set correctly
- Ensure `docs/` directory is committed

## Directory Structure

```
booksmap/
├── src/                    # Source files (Markdown)
├── docs/                   # Built site (GitHub Pages)
│   ├── index.html
│   ├── shared/
│   ├── the-let-them-theory/
│   ├── the-stoic-mind/
│   └── [other books]/
├── .eleventy.js           # Configured to output to docs/
└── .gitignore            # docs/ is NOT ignored
```

## Key Configuration

### .eleventy.js

```javascript
return {
  dir: {
    input: "src",
    output: "docs",  // ← GitHub Pages directory
    includes: "_includes",
    data: "_data"
  }
};
```

### .gitignore

```
_site/        # Ignored (old output directory)
docs/         # NOT ignored (GitHub Pages directory)
```

## Workflow Summary

1. Create/edit Markdown files in `src/books/`
2. Run `npm run build`
3. Commit `docs/` directory
4. Push to GitHub
5. GitHub Pages automatically deploys

That's it! 🚀
