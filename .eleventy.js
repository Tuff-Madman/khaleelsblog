const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");

const fetch = require("node-fetch");

// docs: https://www.11ty.io/docs/config/
module.exports = function(eleventyConfig) {
  // eleventyConfig.addFilter( "myFilter", function() {});

  let markdownIt = require("markdown-it");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };

  eleventyConfig.setLibrary("md", markdownIt(options));

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addCollection("posts", collection => {
    return [...collection.getFilteredByGlob("./src/**/*.md")]
      .filter(p => !p.data.draft)
      .reverse();
  });

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
