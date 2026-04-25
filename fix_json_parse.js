const fs=require('fs');
let c=fs.readFileSync('app/agent/page.js','utf8');

// Fix the JSON parsing to extract just the JSON object
const oldParse=`      const text = data.content?.map(b=>b.text||'').join('') || '';
      const clean = text.replace(/\`\`\`json|\`\`\`/g,'').trim();
      const parsed = JSON.parse(clean);`;

const newParse=`      const text = data.content?.map(b=>b.text||'').join('') || '';
      // Robustly extract JSON - find first { and last }
      const firstBrace = text.indexOf('{');
      const lastBrace = text.lastIndexOf('}');
      if(firstBrace===-1||lastBrace===-1) throw new Error('No JSON found in response');
      const clean = text.substring(firstBrace, lastBrace+1);
      const parsed = JSON.parse(clean);`;

if(c.includes(oldParse)){
  c=c.replace(oldParse,newParse);
  console.log('Fixed JSON parsing');
} else {
  console.log('Pattern not found - trying alternate');
  // Try to find it differently
  const idx=c.indexOf("text.replace(/```json");
  console.log('Found at:',idx);
}

fs.writeFileSync('app/agent/page.js',c,'utf8');
console.log('Done');