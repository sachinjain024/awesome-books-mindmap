const fs = require('fs');
const path = require('path');

module.exports = function(eleventyConfig) {
  // Copy shared assets
  eleventyConfig.addPassthroughCopy("shared");
  eleventyConfig.addPassthroughCopy("index.html");
  
  // Copy all static HTML books (pre-generated, not from Markdown)
  // Dynamically add each book directory from src/static-books to root of output
  const staticBooksDir = path.join(__dirname, 'src/static-books');
  if (fs.existsSync(staticBooksDir)) {
    const books = fs.readdirSync(staticBooksDir);
    books.forEach(book => {
      const bookPath = path.join(staticBooksDir, book);
      if (fs.statSync(bookPath).isDirectory()) {
        // Map each book from src/static-books/[book] to docs/[book]
        eleventyConfig.addPassthroughCopy({
          [`src/static-books/${book}`]: book
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

  // Ignore static-books from template processing
  eleventyConfig.ignores.add("src/static-books/**");

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
