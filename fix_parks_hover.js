const fs=require('fs');

// Fix parks page - remove onMouseEnter/Leave and use CSS hover instead
let c=fs.readFileSync('app/parks/page.js','utf8');

// Remove the onMouseEnter/onMouseLeave handlers entirely
c=c.replace(/,transition:'transform 0\.2s ease, box-shadow 0\.2s ease'\}\} onMouseEnter=\{[^}]+\}\} onMouseLeave=\{[^}]+\}\}/g,
  ",transition:'transform 0.2s ease, box-shadow 0.2s ease'}}");

// Also remove any remaining onMouse handlers with nested braces
c=c.replace(/ onMouseEnter=\{e=>\{[^}]+\}\}/g,'');
c=c.replace(/ onMouseLeave=\{e=>\{[^}]+\}\}/g,'');

fs.writeFileSync('app/parks/page.js',c,'utf8');
console.log('Removed onMouse handlers');
console.log('Still has onMouse:',(c.match(/onMouse/g)||[]).length);