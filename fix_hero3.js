const fs = require('fs');
const file = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\funparks-website\\components\\Hero.js";
let c = fs.readFileSync(file, 'utf8');
c = c.replace('Download Free \uD83C\uDFA2', 'Download on Android \uD83E\uDD16');
fs.writeFileSync(file, c, 'utf8');
console.log('Done');