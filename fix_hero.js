const fs = require('fs');
const file = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\funparks-website\\components\\Hero.js";
let c = fs.readFileSync(file, 'utf8');
c = c.replace(/Coming Soon [^\<]*/g, 'Download Free 🎢');
c = c.replace(/href='\/\#download'/g, "href='https://play.google.com/store/apps/details?id=com.funparks.app' target='_blank' rel='noopener noreferrer'");
fs.writeFileSync(file, c, 'utf8');
console.log('Done');