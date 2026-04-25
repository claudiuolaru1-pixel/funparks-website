const fs=require('fs');
let c=fs.readFileSync('app/agent/page.js','utf8');
// Remove BOM if present
if(c.charCodeAt(0)===0xFEFF)c=c.slice(1);
// Also remove any other leading garbage before 'use client'
const idx=c.indexOf("'use client'");
if(idx>0){c=c.slice(idx);console.log('Removed',idx,'chars before use client');}
fs.writeFileSync('app/agent/page.js',c,'utf8');
console.log('Fixed. Starts with:',JSON.stringify(c.substring(0,20)));