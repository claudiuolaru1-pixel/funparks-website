const fs=require('fs');
const lines=fs.readFileSync('app/agent/page.js','utf8').split('\n');

// Find and fix the response handling
for(let i=185;i<205;i++){
  if(lines[i]&&lines[i].includes('const data = await res.json()')){
    // Replace the next few lines with new handling
    lines[i]='      const data = await res.json();';
    lines[i+1]='      if(data.error) throw new Error(data.error+(data.preview?" Preview: "+data.preview:""));';
    lines[i+2]='      const parsed = data.parsed;';
    // Remove old parsing lines
    lines[i+3]='      const newSlug = slugify(parsed.blog.title || topic);';
    lines[i+4]='      // parsed already extracted server-side';
    console.log('Fixed response handling at line',i+1);
    break;
  }
}

// Remove old firstBrace/lastBrace/clean lines
for(let i=185;i<210;i++){
  if(lines[i]&&(lines[i].includes('firstBrace')||lines[i].includes('lastBrace')||lines[i].includes('const clean=')||lines[i].includes('let clean=')||lines[i].includes('let parsed;try'))){
    lines[i]='      // removed - parsing done server-side';
    console.log('Removed old parse line at',i+1);
  }
}

fs.writeFileSync('app/agent/page.js',lines.join('\n'),'utf8');
console.log('Done');