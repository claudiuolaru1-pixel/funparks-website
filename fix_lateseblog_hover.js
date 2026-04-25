const fs=require('fs');
let c=fs.readFileSync('components/LatestBlog.js','utf8');
c=c.replace(/ onMouseEnter=\{[^}]+\}\}/g,'');
c=c.replace(/ onMouseLeave=\{[^}]+\}\}/g,'');
fs.writeFileSync('components/LatestBlog.js',c,'utf8');
console.log('LatestBlog cleaned');
console.log('Still has onMouse:',(c.match(/onMouse/g)||[]).length);