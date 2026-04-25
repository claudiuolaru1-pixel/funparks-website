const fs=require('fs');
let c=fs.readFileSync('app/agent/page.js','utf8');

// Add publishing state variables after existing state declarations
c=c.replace(
  "  const [copied, setCopied] = useState({});",
  "  const [copied, setCopied] = useState({});\n  const [publishing, setPublishing] = useState(false);\n  const [published, setPublished] = useState(false);\n  const [publishError, setPublishError] = useState('');"
);

// Add one-click publish function before generate function
const publishFn=`
  const publishToSite = async () => {
    if (!blog) return;
    setPublishing(true);
    setPublished(false);
    setPublishError('');
    const emojis = {'Park Guide':'🗺️','Comparison':'⚔️','News':'📰','Tips':'💡','Hidden Gems':'💎','Top Lists':'🏆','Destination':'✈️','App Updates':'📱'};
    const post = {
      slug,
      title: blog.title||'',
      excerpt: blog.excerpt||'',
      category,
      emoji: emojis[category]||'🎢',
      date: new Date().toISOString().split('T')[0],
      readTime: blog.readTime||'5 min',
      content: blog.content||''
    };
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({post})
      });
      const data = await res.json();
      if (data.success) {
        setPublished(true);
      } else {
        setPublishError(data.error||'Unknown error');
      }
    } catch(e) {
      setPublishError(e.message);
    }
    setPublishing(false);
  };

`;

c=c.replace('  const generate = async () => {', publishFn+'  const generate = async () => {');

// Replace the publish tab content with one-click button
const oldPublishTab=`        {/* PUBLISH TAB */}
        {tab==='publish' && (
          <div>
            <div style={{background:'white',borderRadius:'20px',padding:'22px',border:'2px solid #f0eeff',marginBottom:'20px'}}>
              <h2 style={{fontFamily:'Syne,sans-serif',fontSize:'17px',fontWeight:'800',marginBottom:'8px'}}>🚀 Publish to funparks.app</h2>
              <p style={{fontSize:'13px',color:'#6b7280',lineHeight:'1.6',marginBottom:'16px'}}>
                Copy the script → save as <code style={{background:'#f0eeff',padding:'2px 6px',borderRadius:'5px',fontSize:'12px'}}>add_post.js</code> in your funparks-website folder → run it → push to GitHub.
              </p>`;

const newPublishTab=`        {/* PUBLISH TAB */}
        {tab==='publish' && (
          <div>
            <div style={{background:'white',borderRadius:'20px',padding:'22px',border:'2px solid #f0eeff',marginBottom:'20px'}}>
              <h2 style={{fontFamily:'Syne,sans-serif',fontSize:'17px',fontWeight:'800',marginBottom:'8px'}}>🚀 Publish to funparks.app</h2>
              {blog ? (
                <div>
                  <div style={{background:'#f0fdf4',border:'2px solid #86efac',borderRadius:'14px',padding:'16px 20px',marginBottom:'16px'}}>
                    <p style={{fontWeight:'800',color:'#166534',fontSize:'13px',margin:'0 0 4px'}}>Ready to publish</p>
                    <p style={{fontSize:'13px',color:'#15803d',margin:0}}>{blog.title}</p>
                  </div>
                  {published && (
                    <div style={{background:'#d1fae5',border:'2px solid #34d399',borderRadius:'14px',padding:'16px 20px',marginBottom:'16px'}}>
                      <p style={{fontWeight:'800',color:'#065f46',margin:'0 0 4px'}}>✅ Published!</p>
                      <a href={'https://funparks.app/blog/'+slug} target='_blank' rel='noopener noreferrer'
                        style={{color:'#059669',fontSize:'13px',fontWeight:700}}>
                        funparks.app/blog/{slug} →
                      </a>
                      <p style={{fontSize:'12px',color:'#047857',margin:'8px 0 0'}}>Live in ~30 seconds after Vercel deploys</p>
                    </div>
                  )}
                  {publishError && (
                    <div style={{background:'#fef2f2',border:'2px solid #fca5a5',borderRadius:'14px',padding:'16px 20px',marginBottom:'16px'}}>
                      <p style={{fontWeight:'800',color:'#991b1b',margin:'0 0 4px'}}>❌ Error</p>
                      <p style={{fontSize:'13px',color:'#dc2626',margin:0}}>{publishError}</p>
                    </div>
                  )}
                  <button onClick={publishToSite} disabled={publishing||published}
                    style={{width:'100%',padding:'16px',borderRadius:'14px',border:'none',fontFamily:'inherit',fontSize:'16px',fontWeight:'800',cursor:publishing||published?'not-allowed':'pointer',opacity:publishing||published?0.7:1,
                      background:'linear-gradient(135deg,#FF6B2B,#f43f5e,#a855f7)',color:'white',boxShadow:'0 4px 20px rgba(168,85,247,0.3)'}}>
                    {publishing ? '⏳ Publishing...' : published ? '✅ Published!' : '🚀 Publish to funparks.app'}
                  </button>
                  <p style={{fontSize:'12px',color:'#9ca3af',textAlign:'center',marginTop:'10px'}}>One click — commits directly to GitHub and triggers Vercel deploy</p>
                </div>
              ) : (
                <div style={{textAlign:'center',padding:'40px',color:'#9ca3af'}}>
                  <p style={{fontWeight:'700',color:'#374151'}}>Generate content first</p>
                  <button style={{...btnStyle('orange'),marginTop:'16px',padding:'10px 20px',fontSize:'13px'}} onClick={()=>setTab('schedule')}>
                    📅 Browse Topics
                  </button>
                </div>
              )}`;

if(c.includes(oldPublishTab)){
  c=c.replace(oldPublishTab, newPublishTab);
  // Close the remaining old content - find the old script section and remove it
  const oldScriptSection=`              {script ? (
                <>
                  <div style={{background:'#1a1a2e',borderRadius:'14px',padding:'16px',marginBottom:'14px'}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
                      <span style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',fontWeight:'600'}}>add_post.js</span>
                      <button style={{...btnStyle('green'),fontSize:'12px'}} onClick={()=>copyText(script,'script')}>
                        {copied.script ? '✅ Copied!' : '📋 Copy Script'}
                      </button>
                    </div>
                    <pre style={{color:'#a5f3fc',fontSize:'11px',whiteSpace:'pre-wrap',fontFamily:'Courier New,monospace',lineHeight:'1.6',margin:0}}>{script}</pre>
                  </div>
                  <div style={{background:'#f0fdf4',border:'2px solid #86efac',borderRadius:'14px',padding:'14px 18px'}}>
                    <p style={{fontWeight:'800',color:'#166534',fontSize:'13px',marginBottom:'8px'}}>Run in PowerShell:</p>
                    <pre style={{color:'#15803d',fontSize:'12px',fontFamily:'Courier New,monospace',lineHeight:'1.8',margin:0}}>{`;
  if(c.includes(oldScriptSection)){
    const endMarker=`</div>\n            </div>\n          </div>\n        )}`;
    const startIdx=c.indexOf(oldScriptSection);
    const endIdx=c.indexOf(endMarker, startIdx)+endMarker.length;
    c=c.substring(0,startIdx)+`\n            </div>\n          </div>\n        )}`+c.substring(endIdx);
    console.log('Removed old script section');
  }
  console.log('Publish tab replaced');
} else {
  console.log('Pattern not found');
}

fs.writeFileSync('app/agent/page.js',c,'utf8');
console.log('Done');