const fs=require('fs');
let c=fs.readFileSync('app/agent/page.js','utf8');

// Add state variables
c=c.replace(
  "  const [copied, setCopied] = useState({});",
  "  const [copied, setCopied] = useState({});\n  const [publishing, setPublishing] = useState(false);\n  const [published, setPublished] = useState(false);\n  const [publishError, setPublishError] = useState('');"
);

// Add publishToSite function before generate
const fn=`  const publishToSite = async () => {
    if (!blog) return;
    setPublishing(true); setPublished(false); setPublishError('');
    const emojis = {'Park Guide':'🗺️','Comparison':'⚔️','News':'📰','Tips':'💡','Hidden Gems':'💎','Top Lists':'🏆','Destination':'✈️','App Updates':'📱'};
    const post = { slug, title:blog.title||'', excerpt:blog.excerpt||'', category, emoji:emojis[category]||'🎢', date:new Date().toISOString().split('T')[0], readTime:blog.readTime||'5 min', content:blog.content||'' };
    try {
      const res = await fetch('/api/publish', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({post}) });
      const data = await res.json();
      if (data.success) { setPublished(true); } else { setPublishError(data.error||'Unknown error'); }
    } catch(e) { setPublishError(e.message); }
    setPublishing(false);
  };

`;
c=c.replace('  const generate = async () => {', fn+'  const generate = async () => {');

fs.writeFileSync('app/agent/page.js',c,'utf8');
console.log('Done. Lines:',c.split('\n').length);