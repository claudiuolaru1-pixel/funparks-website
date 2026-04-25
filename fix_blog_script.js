const fs=require('fs');
let c=fs.readFileSync('app/agent/page.js','utf8');

// Fix generateScript to use JSON.stringify instead of template literals
// This avoids all escaping issues with content
const oldScript=`  const generateScript = (b, s, cat) => {
    const emojis = {'Park Guide':'🗺️','Comparison':'⚔️','News':'📰','Tips':'💡','Hidden Gems':'💎','Top Lists':'🏆','Destination':'✈️','App Updates':'📱'};
    const emoji = emojis[cat]||'🎢';
    const today = new Date().toISOString().split('T')[0];
    return \`const fs=require('fs'),path=require('path');
const file=path.join(process.cwd(),'public','blog-posts.json');
const posts=JSON.parse(fs.readFileSync(file,'utf8'));
const newPost={
  slug:'\${s}',
  title:'\${(b.title||'').replace(/'/g,"\\\\'")}',
  excerpt:'\${(b.excerpt||'').replace(/'/g,"\\\\'")}',
  category:'\${cat}',emoji:'\${emoji}',date:'\${today}',
  readTime:'\${b.readTime||"5 min"}',
  content:'\${(b.content||'').replace(/'/g,"\\\\'").replace(/\\n/g,'\\\\n')}'
};
if(!posts.find(p=>p.slug===newPost.slug)){
  posts.unshift(newPost);
  fs.writeFileSync(file,JSON.stringify(posts,null,2),'utf8');
  console.log('Added:',newPost.title);
} else { console.log('Already exists'); }\`;
  };`;

const newScript=`  const generateScript = (b, s, cat) => {
    const emojis = {'Park Guide':'🗺️','Comparison':'⚔️','News':'📰','Tips':'💡','Hidden Gems':'💎','Top Lists':'🏆','Destination':'✈️','App Updates':'📱'};
    const emoji = emojis[cat]||'🎢';
    const today = new Date().toISOString().split('T')[0];
    const postObj = JSON.stringify({
      slug: s,
      title: b.title||'',
      excerpt: b.excerpt||'',
      category: cat,
      emoji: emoji,
      date: today,
      readTime: b.readTime||'5 min',
      content: b.content||''
    }, null, 2);
    return \`const fs=require('fs'),path=require('path');
const file=path.join(process.cwd(),'public','blog-posts.json');
const posts=JSON.parse(fs.readFileSync(file,'utf8'));
const newPost=\${postObj};
if(!posts.find(p=>p.slug===newPost.slug)){
  posts.unshift(newPost);
  fs.writeFileSync(file,JSON.stringify(posts,null,2),'utf8');
  console.log('Added:',newPost.title);
} else { console.log('Already exists'); }\`;
  };`;

if(c.includes('const generateScript')){
  // Find and replace the generateScript function
  const start=c.indexOf('  const generateScript = (b, s, cat) => {');
  const end=c.indexOf('  };', start)+4;
  if(start>0&&end>4){
    c=c.substring(0,start)+newScript+c.substring(end);
    console.log('generateScript replaced');
  } else {
    console.log('Could not find boundaries');
  }
} else {
  console.log('generateScript not found');
}

fs.writeFileSync('app/agent/page.js',c,'utf8');
console.log('Done');