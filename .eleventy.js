module.exports = function(eleventyConfig) {
  // Copy shared assets
  eleventyConfig.addPassthroughCopy("shared");
  eleventyConfig.addPassthroughCopy("the-stoic-mind/styles.css");
  eleventyConfig.addPassthroughCopy("the-let-them-theory/styles.css");
  eleventyConfig.addPassthroughCopy("index.html");
  
  // Copy all static book directories
  eleventyConfig.addPassthroughCopy("a-man-called-ove");
  eleventyConfig.addPassthroughCopy("bhagavad-gita");
  eleventyConfig.addPassthroughCopy("book-of-clarity");
  eleventyConfig.addPassthroughCopy("content-creator-handbook");
  eleventyConfig.addPassthroughCopy("deep-work");
  eleventyConfig.addPassthroughCopy("good-to-great");
  eleventyConfig.addPassthroughCopy("high-output-management");
  eleventyConfig.addPassthroughCopy("how-to-talk-so-kids-will-listen");
  eleventyConfig.addPassthroughCopy("india-after-gandhi");
  eleventyConfig.addPassthroughCopy("jonathan-livingston-seagull");
  eleventyConfig.addPassthroughCopy("leaders-eat-last");
  eleventyConfig.addPassthroughCopy("life-of-pi");
  eleventyConfig.addPassthroughCopy("nexus");
  eleventyConfig.addPassthroughCopy("origin-of-species");
  eleventyConfig.addPassthroughCopy("psychology-of-money");
  eleventyConfig.addPassthroughCopy("radical-candor");
  eleventyConfig.addPassthroughCopy("siddhartha");
  eleventyConfig.addPassthroughCopy("the-alchemist");
  eleventyConfig.addPassthroughCopy("the-book-thief");
  eleventyConfig.addPassthroughCopy("the-effective-executive");
  eleventyConfig.addPassthroughCopy("the-five-people-you-meet-in-heaven");
  eleventyConfig.addPassthroughCopy("the-great-ceo-within");
  eleventyConfig.addPassthroughCopy("the-lean-startup");
  eleventyConfig.addPassthroughCopy("the-little-prince");
  eleventyConfig.addPassthroughCopy("the-midnight-library");
  eleventyConfig.addPassthroughCopy("the-old-man-and-the-sea");
  eleventyConfig.addPassthroughCopy("the-prophet");
  eleventyConfig.addPassthroughCopy("the-stoic-mind");
  eleventyConfig.addPassthroughCopy("the-untethered-soul");
  eleventyConfig.addPassthroughCopy("the-whole-brain-child");
  eleventyConfig.addPassthroughCopy("who-wrote-bhagavadgita");

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
