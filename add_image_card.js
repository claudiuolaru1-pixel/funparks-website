const fs=require('fs');
let c=fs.readFileSync('app/agent/page.js','utf8');

// Add import at top
if(!c.includes('ImageCard')){
  c=c.replace(
    "'use client';",
    "'use client';\nimport ImageCard from '../components/ImageCard';"
  );
  // Add ImageCard before the hashtags section in review tab
  c=c.replace(
    "            {hashtags.length>0 && (",
    "            <ImageCard post={blog} category={category} />\n            {hashtags.length>0 && ("
  );
  console.log('ImageCard added to agent');
}

fs.writeFileSync('app/agent/page.js',c,'utf8');
console.log('Done');