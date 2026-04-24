const fs=require('fs');
const path=require('path');

// Check every component and app file for onClick
const dirs=['components','app'];
const allFiles=[];
dirs.forEach(d=>{
  function walk(p){
    fs.readdirSync(p).forEach(f=>{
      const fp=path.join(p,f);
      if(fs.statSync(fp).isDirectory()&&f!=='node_modules'&&f!=='.next')walk(fp);
      else if(f.endsWith('.js'))allFiles.push(fp);
    });
  }
  walk(d);
});

allFiles.forEach(f=>{
  let c=fs.readFileSync(f,'utf8');
  // Skip files that are client components
  if(c.startsWith("'use client'")||c.startsWith('"use client"'))return;
  // Check if it has onClick on an <a> tag
  if(c.includes('onClick') && (c.includes('<a ') || c.includes('href='))){
    console.log('SERVER COMPONENT WITH onClick:',f);
    // Show the line
    c.split('\n').forEach((line,i)=>{
      if(line.includes('onClick'))console.log('  Line '+(i+1)+':',line.trim());
    });
  }
});
console.log('Done');