// section-boxes.js
// Handles two cases:
// 1. Legacy HTML files where markdown-it-attrs wasn't installed, so {.class-name}
//    appears as literal text inside headings (e.g. <h3>Key Insight {.insight-box}</h3>)
// 2. New HTML files where markdown-it-attrs adds the class as an attribute
//    (e.g. <h3 class="insight-box">Key Insight</h3>)
//
// In both cases, the heading and its following sibling content are wrapped in a
// container div with the class, so existing CSS (which expects wrapper divs) works.

document.addEventListener('DOMContentLoaded', function () {
  var content = document.querySelector('.chapter-content');
  if (!content) return;

  // Phase 1: Fix legacy headings where {.class-name} is literal text content
  content.querySelectorAll('h2, h3').forEach(function (heading) {
    var text = heading.textContent;
    var match = text.match(/^(.*?)\s*\{\.([^}]+)\}\s*$/);
    if (match) {
      heading.textContent = match[1].trim();
      heading.className = (heading.className ? heading.className + ' ' : '') + match[2];
    }
  });

  // Phase 2: Wrap classified headings and their content into container divs
  // Process h3 before h2 so inner sections are wrapped first
  ['h3', 'h2'].forEach(function (tag) {
    content.querySelectorAll(tag + '[class]').forEach(function (heading) {
      var classes = heading.className.trim();
      if (!classes) return;

      var level = parseInt(heading.tagName[1], 10);
      var wrapper = document.createElement('div');
      wrapper.className = classes;
      heading.className = '';

      // Collect siblings until next heading of same or higher level
      var siblings = [];
      var next = heading.nextElementSibling;
      while (next) {
        if (/^H[1-6]$/.test(next.tagName)) {
          if (parseInt(next.tagName[1], 10) <= level) break;
        }
        siblings.push(next);
        next = next.nextElementSibling;
      }

      // Insert wrapper and move heading + siblings into it
      heading.parentNode.insertBefore(wrapper, heading);
      wrapper.appendChild(heading);
      siblings.forEach(function (s) { wrapper.appendChild(s); });
    });
  });
});
