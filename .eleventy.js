const fs = require('fs');
const path = require('path');

module.exports = function(eleventyConfig) {
  // Copy shared assets
  eleventyConfig.addPassthroughCopy("shared");
  // Copy per-book styles from src/books/[book]/styles.css to docs/[book]/styles.css
  const markdownBooksDir = path.join(__dirname, 'src/books');
  if (fs.existsSync(markdownBooksDir)) {
    const books = fs.readdirSync(markdownBooksDir);
    books.forEach(book => {
      const stylesPath = path.join(markdownBooksDir, book, 'styles.css');
      if (fs.existsSync(stylesPath)) {
        eleventyConfig.addPassthroughCopy({
          [`src/books/${book}/styles.css`]: `${book}/styles.css`
        });
      }
    });
  }

  // Add a filter for number formatting (like sprintf)
  eleventyConfig.addFilter("format", function(template, value) {
    // Simple implementation for %02d format (zero-pad to 2 digits)
    if (template === "%02d") {
      return String(value).padStart(2, '0');
    }
    return value;
  });

  // Create a collection for books
  eleventyConfig.addCollection("books", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/books/*/book.md");
  });

  // Create a collection for chapters
  eleventyConfig.addCollection("chapters", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/books/*/chapters/*.md");
  });

  return {
    dir: {
      input: "src",
      output: "docs",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
