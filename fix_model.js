const fs=require('fs');
let c=fs.readFileSync('app/api/generate/route.js','utf8');
// Fix model string to known working one
c=c.replace("model: 'claude-sonnet-4-20250514'","model: 'claude-opus-4-5-20251101'");
fs.writeFileSync('app/api/generate/route.js',c,'utf8');
console.log('Model fixed');
console.log(fs.readFileSync('app/api/generate/route.js','utf8'));