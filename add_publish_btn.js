const fs=require('fs');
let c=fs.readFileSync('app/agent/page.js','utf8');

// 1. Add state variables after copied state
c=c.replace(
  "  const [copied, setCopied] = useState({});",
  "  const [copied, setCopied] = useState({});\n  const [publishing, setPublishing] = useState(false);\n  const [published, setPublished] = useState(false);\n  const [publishError, setPublishError] = useState('');"
);

// 2. Add publishToSite function - simple one-liner style to avoid issues
const fn=[
  "  const publishToSite = async () => {",
  "    if (!blog) return;",
  "    setPublishing(true); setPublished(false); setPublishError('');",
  "    const emojis = {'Park Guide':'\u{1f5fa}\ufe0f','Comparison':'\u2694\ufe0f','News':'\u{1f4f0}','Tips':'\u{1f4a1}','Hidden Gems':'\u{1f48e}','Top Lists':'\u{1f3c6}','Destination':'\u2708\ufe0f','App Updates':'\u{1f4f1}'};",
  "    const post = {slug,title:blog.title||'',excerpt:blog.excerpt||'',category,emoji:emojis[category]||'\u{1f3a2}',date:new Date().toISOString().split('T')[0],readTime:blog.readTime||'5 min',content:blog.content||''};",
  "    try {",
  "      const res=await fetch('/api/publish',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({post})});",
  "      const data=await res.json();",
  "      if(data.success){setPublished(true);}else{setPublishError(data.error||'Failed');}",
  "    } catch(e){setPublishError(e.message);}",
  "    setPublishing(false);",
  "  };",
  ""
].join('\n');

c=c.replace('  const generate = async () => {', fn+'  const generate = async () => {');

// 3. Add publish button at the START of the existing publish tab content, before {script ?
c=c.replace(
  "              {script ? (",
  "              {published && <div style={{background:'#d1fae5',border:'2px solid #34d399',borderRadius:'12px',padding:'12px 16px',marginBottom:'12px'}}><p style={{fontWeight:'800',color:'#065f46',margin:0}}>Published! Live at funparks.app/blog/{slug}</p></div>}\n              {publishError && <div style={{background:'#fef2f2',border:'2px solid #fca5a5',borderRadius:'12px',padding:'12px 16px',marginBottom:'12px'}}><p style={{fontWeight:'800',color:'#991b1b',margin:0}}>Error: {publishError}</p></div>}\n              {blog && <button onClick={publishToSite} disabled={publishing||published} style={{width:'100%',padding:'14px',borderRadius:'12px',border:'none',fontFamily:'inherit',fontSize:'15px',fontWeight:'800',cursor:'pointer',background:'linear-gradient(135deg,#FF6B2B,#f43f5e,#a855f7)',color:'white',marginBottom:'16px',opacity:publishing||published?0.7:1}}>{publishing?'Publishing...':published?'Published!':'Publish to funparks.app in 1 click'}</button>}\n              {script ? ("
);

fs.writeFileSync('app/agent/page.js',c,'utf8');
console.log('Done. Lines:',c.split('\n').length);