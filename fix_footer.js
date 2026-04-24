const fs=require('fs');
let c=fs.readFileSync('components/Footer.js','utf8');
c=c.replace(/ onClick=\{[^}]+\}/g,'');
c=c.replace(/ onClick=\{[^}]+\}\}/g,'');
// Also handle multichar braces like {(e)=>e.preventDefault()}
c=c.replace(/ onClick=\{[^\}]*\}/g,'');
fs.writeFileSync('components/Footer.js',c,'utf8');
// Verify
const check=fs.readFileSync('components/Footer.js','utf8');
const lines=check.split('\n').filter(l=>l.includes('onClick'));
console.log('Remaining onClick lines:',lines.length);
lines.forEach(l=>console.log(' ',l.trim()));