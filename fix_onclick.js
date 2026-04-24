const fs=require('fs');
const files=['app/blog/[slug]/page.js','app/parks/[id]/page.js'];
files.forEach(f=>{
  if(!fs.existsSync(f))return;
  let c=fs.readFileSync(f,'utf8');
  c=c.replace(/href="#" onClick=\{[^}]+\}/g,'href="#"');
  c=c.replace(/href='#' onClick=\{[^}]+\}/g,"href='#'");
  fs.writeFileSync(f,c,'utf8');
  console.log('Fixed:',f);
});