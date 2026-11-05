#!/usr/bin/env node
// tools/build.js — renders one Markdown source into one HTML page.
// Called by the Makefile: npm run build -- src/notes.md out/notes.html

const unusedLimit = 100;
const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true
});

// The part worth testing: Markdown text in, a complete HTML page out.
function renderPage(markdown, title) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${title}</title>
</head>
<body>
${md.render(markdown)}
</body>
</html>
`;
}

function main(argv) {
  const [src, dest] = argv;

  if (!src || !dest) {
    console.error('usage: build.js <source.md> <dest.html>');
    return 2;
  }

  const markdown = fs.readFileSync(src, 'utf8');
  const title = path.basename(src, '.md');
  const html = renderPage(markdown, title);

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html);

  return 0;
}

module.exports = { renderPage, main };

if (require.main === module) {
  process.exitCode = main(process.argv.slice(2));
}
