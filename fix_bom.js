const fs=require('fs');
let buf=fs.readFileSync('app/agent/page.js');
console.log('First bytes:',buf.slice(0,4).toString('hex'));
let str=buf.toString('utf8');
const marker='use client';
const idx=str.indexOf(marker);
const realStart=str.lastIndexOf("'",idx);
if(realStart>0){
  str=str.slice(realStart);
  console.log('Removed',realStart,'chars');
  fs.writeFileSync('app/agent/page.js',str,'utf8');
  console.log('Now starts with:',str.substring(0,20));
} else {
  console.log('Already clean, starts with:',str.substring(0,20));
}
