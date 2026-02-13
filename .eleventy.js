module.exports = function(eleventyConfig) {
  // Copy shared assets
  eleventyConfig.addPassthroughCopy("shared");
  eleventyConfig.addPassthroughCopy("the-stoic-mind/styles.css");

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
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
