const fs=require('fs');

// Fix DownloadSection - remove ALL onClick from anchor tags
let c=fs.readFileSync('components/DownloadSection.js','utf8');
// Remove onClick from any <a> tag
c=c.replace(/ onClick=\{[^}]+\}/g,'');
fs.writeFileSync('components/DownloadSection.js',c,'utf8');
console.log('DownloadSection fixed');
console.log('Still has onClick:',(c.match(/onClick/g)||[]).length,'times (should be 0 for <a> tags)');

// Fix blog slug page
let b=fs.readFileSync('app/blog/[slug]/page.js','utf8');
b=b.replace(/ onClick=\{[^}]+\}/g,'');
fs.writeFileSync('app/blog/[slug]/page.js',b,'utf8');
console.log('Blog slug page fixed');