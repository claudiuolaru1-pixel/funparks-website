const fs=require('fs');
let c=fs.readFileSync('app/agent/page.js','utf8');

// Find and replace generateScript with version that writes data separately
const start=c.indexOf('  const generateScript = (b, s, cat) => {');
let depth=0, end=start;
for(let i=start;i<c.length;i++){
  if(c[i]==='{')depth++;
  if(c[i]==='}'){depth--;if(depth===0){end=i+1;break;}}
}
console.log('Found generateScript:',start,'to',end);

const newScript=`  const generateScript = (b, s, cat) => {
    const emojis = {'Park Guide':'🗺️','Comparison':'⚔️','News':'📰','Tips':'💡','Hidden Gems':'💎','Top Lists':'🏆','Destination':'✈️','App Updates':'📱'};
    const emoji = emojis[cat]||'🎢';
    const today = new Date().toISOString().split('T')[0];
    const post = {
      slug: s,
      title: b.title||'',
      excerpt: b.excerpt||'',
      category: cat,
      emoji: emoji,
      date: today,
      readTime: b.readTime||'5 min',
      content: (b.content||'').replace(/\\\\/g,'\\\\\\\\')
    };
    const dataJson = JSON.stringify(post).replace(/\\\\/g,'\\\\\\\\').replace(/'/g,"\\\\'");
    return [
      "const fs=require('fs'),path=require('path');",
      "const file=path.join(process.cwd(),'public','blog-posts.json');",
      "const posts=JSON.parse(fs.readFileSync(file,'utf8'));",
      "const newPost=JSON.parse('"+dataJson+"');",
      "if(!posts.find(p=>p.slug===newPost.slug)){",
      "  posts.unshift(newPost);",
      "  fs.writeFileSync(file,JSON.stringify(posts,null,2),'utf8');",
      "  console.log('Added:',newPost.title);",
      "} else { console.log('Already exists'); }"
    ].join('\\n');
  };`;

c=c.substring(0,start)+newScript+c.substring(end);
fs.writeFileSync('app/agent/page.js',c,'utf8');
console.log('Done');