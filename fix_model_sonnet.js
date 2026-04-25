const fs=require('fs');
let c=fs.readFileSync('app/api/generate/route.js','utf8');
c=c.replace("model: 'claude-opus-4-5-20251101'","model: 'claude-sonnet-4-20250514'");
fs.writeFileSync('app/api/generate/route.js',c,'utf8');
console.log('Switched to Sonnet');