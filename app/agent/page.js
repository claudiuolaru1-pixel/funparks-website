
'use client';
import { useState } from 'react';

const PLATFORMS = [
  {id:'instagram',name:'Instagram',icon:'📸',bg:'linear-gradient(135deg,#f09433,#dc2743,#bc1888)',maxChars:2200,note:'Add to Stories + Reels'},
  {id:'tiktok',name:'TikTok',icon:'🎵',bg:'linear-gradient(135deg,#010101,#69C9D0)',maxChars:2200,note:'Hook in first line'},
  {id:'youtube',name:'YouTube',icon:'▶️',bg:'linear-gradient(135deg,#FF0000,#cc0000)',maxChars:500,note:'Shorts caption'},
  {id:'facebook',name:'Facebook',icon:'👥',bg:'linear-gradient(135deg,#1877F2,#0d5bba)',maxChars:63206,note:'End with a question'},
];

export default function AgentPage() {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('Park Guide');
  const [tone, setTone] = useState('fun');
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  const [posts, setPosts] = useState({});
  const [hashtags, setHashtags] = useState([]);
  const [slug, setSlug] = useState('');
  const [script, setScript] = useState('');
  const [copied, setCopied] = useState({});
  const [tab, setTab] = useState('generate');

  const slugify = t => t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,60);

  const generate = async () => {
    if (!topic.trim()) return alert('Please enter a topic!');
    setLoading(true);
    setBlog(null); setPosts({}); setHashtags([]); setSlug(''); setScript('');

    const toneDesc = {
      fun:'fun, energetic, use emojis, exciting and upbeat',
      informative:'informative and educational with specific facts and statistics',
      inspiring:'inspiring and aspirational, make readers want to visit immediately',
      debate:'bold and debate-starting, take strong positions to provoke comments'
    }[tone];

    const prompt = `You are the content team for Funparks, a free theme park app covering 57 parks worldwide.

Write a complete content package about: "${topic}"
Category: ${category}
Tone: ${toneDesc}

Return ONLY a valid JSON object:
{
  "blog": {
    "title": "compelling SEO-friendly title",
    "excerpt": "2-sentence summary",
    "readTime": "X min",
    "content": "full blog post 600-900 words, use **bold** for subheadings, double newlines between paragraphs, specific real park names and attractions"
  },
  "instagram": "Instagram caption 200-350 words, lots of emojis, 12-15 hashtags, mention funparks.app/blog",
  "tiktok": "TikTok caption starting with hook like Nobody talks about... or POV:, 150-250 words, hashtags, mention the blog",
  "youtube": "YouTube Shorts description max 120 words, CTA to check funparks.app/blog",
  "facebook": "Facebook post 150-250 words, conversational, ends with question, link to funparks.app/blog",
  "hashtags": ["funparks","themeparks","rollercoaster","themepark","parklife","coaster","disney","universalstudios","amusementpark","fun"]
}`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const text = data.content?.map(b=>b.text||'').join('') || '';
      const clean = text.replace(/```json|```/g,'').trim();
      const parsed = JSON.parse(clean);
      const newSlug = slugify(parsed.blog.title || topic);
      
      setBlog(parsed.blog);
      setPosts({instagram:parsed.instagram,tiktok:parsed.tiktok,youtube:parsed.youtube,facebook:parsed.facebook});
      setHashtags(parsed.hashtags||[]);
      setSlug(newSlug);
      
      const addScript = generateScript(parsed.blog, newSlug, category);
      setScript(addScript);
      setTab('review');
    } catch(e) {
      alert('Error: '+e.message);
    }
    setLoading(false);
  };

  const generateScript = (b, s, cat) => {
    const emojis = {'Park Guide':'🗺️','Comparison':'⚔️','News':'📰','Tips':'💡','Hidden Gems':'💎','Top Lists':'🏆','Destination':'✈️','App Updates':'📱'};
    const emoji = emojis[cat]||'🎢';
    const today = new Date().toISOString().split('T')[0];
    return `const fs=require('fs'),path=require('path');
const file=path.join(process.cwd(),'public','blog-posts.json');
const posts=JSON.parse(fs.readFileSync(file,'utf8'));
const newPost={
  slug:\`${s}\`,
  title:\`${b.title.replace(/`/g,"'")}\`,
  excerpt:\`${b.excerpt.replace(/`/g,"'")}\`,
  category:'${cat}',emoji:'${emoji}',date:'${today}',
  readTime:'${b.readTime||"5 min"}',
  content:\`${b.content.replace(/`/g,"'")}\`
};
if(!posts.find(p=>p.slug===newPost.slug)){
  posts.unshift(newPost);
  fs.writeFileSync(file,JSON.stringify(posts,null,2),'utf8');
  console.log('Added:',newPost.title);
  console.log('Run: git add . && git commit -m "Add post" && git push');
} else { console.log('Already exists'); }`;
  };

  const copyText = async (text, key) => {
    try { await navigator.clipboard.writeText(text); }
    catch(e) { const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta); }
    setCopied(p=>({...p,[key]:true}));
    setTimeout(()=>setCopied(p=>({...p,[key]:false})),2000);
  };

  const updatePost = (platform, value) => setPosts(p=>({...p,[platform]:value}));

  const charCount = (text, max) => {
    const len = (text||'').length;
    const color = len > max ? '#dc2626' : len > max*0.9 ? '#ea580c' : '#6b7280';
    return { text: max < 9999 ? len+'/'+max : len+' chars', color };
  };

  const tabStyle = active => ({
    padding:'10px 20px', borderRadius:'12px', fontSize:'13px', fontWeight:'700',
    cursor:'pointer', border:'none', fontFamily:'inherit', transition:'all 0.2s',
    background: active ? 'linear-gradient(135deg,#FF6B2B,#f43f5e,#a855f7)' : 'transparent',
    color: active ? 'white' : '#6b7280',
    boxShadow: active ? '0 4px 12px rgba(168,85,247,0.3)' : 'none',
  });

  const btnStyle = (color='purple') => ({
    border:'none', borderRadius:'10px', padding:'8px 16px', fontSize:'12px',
    fontWeight:'700', cursor:'pointer', fontFamily:'inherit', transition:'all 0.2s',
    background: color==='orange' ? 'linear-gradient(135deg,#FF6B2B,#f43f5e,#a855f7)' : color==='green' ? '#d1fae5' : '#f3f0ff',
    color: color==='orange' ? 'white' : color==='green' ? '#059669' : '#7c3aed',
  });

  return (
    <div style={{minHeight:'100vh',background:'#f8f7ff',fontFamily:'Plus Jakarta Sans,sans-serif'}}>
      {/* Header */}
      <div style={{background:'linear-gradient(135deg,#1a1a2e,#2d1b69)',padding:'20px 32px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{fontFamily:'Syne,sans-serif',fontSize:'20px',fontWeight:'800',color:'white'}}>
          fun<span style={{background:'linear-gradient(135deg,#FF6B2B,#f43f5e,#a855f7)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>parks</span>
          <span style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',fontWeight:'600',marginLeft:'12px'}}>Content Pipeline 🎢</span>
        </div>
        <div style={{background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',color:'rgba(255,255,255,0.7)',padding:'5px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>
          BLOG → SOCIAL MEDIA
        </div>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'28px 20px'}}>
        {/* Tabs */}
        <div style={{display:'flex',gap:'4px',background:'white',borderRadius:'16px',padding:'5px',border:'2px solid #f0eeff',marginBottom:'24px',width:'fit-content',boxShadow:'0 2px 12px rgba(168,85,247,0.08)'}}>
          {[['generate','✨ Generate'],['review','📝 Review & Edit'],['publish','🚀 Publish']].map(([id,label])=>(
            <button key={id} style={tabStyle(tab===id)} onClick={()=>setTab(id)}>{label}</button>
          ))}
        </div>

        {/* GENERATE TAB */}
        {tab==='generate' && (
          <div>
            <div style={{background:'white',borderRadius:'20px',padding:'24px',marginBottom:'22px',border:'2px solid #f0eeff',boxShadow:'0 4px 20px rgba(168,85,247,0.06)'}}>
              <h2 style={{fontFamily:'Syne,sans-serif',fontSize:'17px',fontWeight:'800',marginBottom:'16px'}}>Generate Blog Post + Social Media Content</h2>
              <div style={{display:'flex',gap:'12px',flexWrap:'wrap',alignItems:'flex-end'}}>
                <div>
                  <div style={{fontSize:'11px',fontWeight:'800',color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'5px'}}>Topic / Idea</div>
                  <input value={topic} onChange={e=>setTopic(e.target.value)} onKeyDown={e=>e.key==='Enter'&&generate()}
                    placeholder="e.g. best coasters Europe 2026"
                    style={{border:'2px solid #e5e7eb',borderRadius:'10px',padding:'9px 13px',fontSize:'13px',fontFamily:'inherit',color:'#1a1a2e',outline:'none',minWidth:'280px'}} />
                </div>
                <div>
                  <div style={{fontSize:'11px',fontWeight:'800',color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'5px'}}>Category</div>
                  <select value={category} onChange={e=>setCategory(e.target.value)}
                    style={{border:'2px solid #e5e7eb',borderRadius:'10px',padding:'9px 13px',fontSize:'13px',fontFamily:'inherit',color:'#1a1a2e',outline:'none'}}>
                    {['Park Guide','Comparison','News','Tips','Hidden Gems','Top Lists','Destination','App Updates'].map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{fontSize:'11px',fontWeight:'800',color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'5px'}}>Tone</div>
                  <select value={tone} onChange={e=>setTone(e.target.value)}
                    style={{border:'2px solid #e5e7eb',borderRadius:'10px',padding:'9px 13px',fontSize:'13px',fontFamily:'inherit',color:'#1a1a2e',outline:'none'}}>
                    <option value="fun">🎉 Fun & Energetic</option>
                    <option value="informative">📚 Informative</option>
                    <option value="inspiring">✨ Inspiring</option>
                    <option value="debate">🔥 Debate Starter</option>
                  </select>
                </div>
                <button onClick={generate} disabled={loading}
                  style={{...btnStyle('orange'),padding:'11px 24px',fontSize:'13px',opacity:loading?0.6:1,cursor:loading?'not-allowed':'pointer'}}>
                  {loading ? '⏳ Generating...' : '✨ Generate'}
                </button>
              </div>
            </div>

            {!blog && !loading && (
              <div style={{textAlign:'center',padding:'60px 24px',color:'#9ca3af'}}>
                <div style={{fontSize:'56px',marginBottom:'12px'}}>🎡</div>
                <p style={{fontSize:'17px',fontWeight:'700',color:'#374151',marginBottom:'8px'}}>Ready to create content!</p>
                <p style={{fontSize:'13px'}}>Enter a topic and click Generate.<br/>Claude writes the blog post and all 4 social posts simultaneously.</p>
              </div>
            )}
            {loading && (
              <div style={{textAlign:'center',padding:'60px 24px'}}>
                <div style={{width:'40px',height:'40px',border:'3px solid #f0eeff',borderTopColor:'#a855f7',borderRadius:'50%',animation:'spin 0.8s linear infinite',margin:'0 auto 16px'}} />
                <style>{('@keyframes spin{to{transform:rotate(360deg)}}')}</style>
                <p style={{fontWeight:'700',color:'#374151'}}>Writing blog + social posts...</p>
                <p style={{fontSize:'12px',color:'#9ca3af',marginTop:'6px'}}>This takes about 20-30 seconds</p>
              </div>
            )}
            {blog && !loading && (
              <div style={{background:'#d1fae5',border:'2px solid #34d399',borderRadius:'16px',padding:'16px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div>
                  <p style={{fontWeight:'800',color:'#065f46'}}>✅ Content generated!</p>
                  <p style={{fontSize:'13px',color:'#047857',marginTop:'2px'}}>{blog.title}</p>
                </div>
                <button style={btnStyle('green')} onClick={()=>setTab('review')}>Review & Edit →</button>
              </div>
            )}
          </div>
        )}

        {/* REVIEW TAB */}
        {tab==='review' && blog && (
          <div>
            {/* Blog post */}
            <div style={{background:'white',borderRadius:'20px',border:'2px solid #f0eeff',overflow:'hidden',marginBottom:'22px'}}>
              <div style={{padding:'14px 22px',background:'linear-gradient(135deg,#fff7f5,#fdf4ff)',borderBottom:'2px solid #f0eeff',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <span style={{fontFamily:'Syne,sans-serif',fontSize:'14px',fontWeight:'800'}}>📝 Blog Post — funparks.app/blog/{slug}</span>
                <div style={{display:'flex',gap:'8px'}}>
                  <span style={{fontSize:'11px',background:'#FF6B2B15',color:'#FF6B2B',padding:'3px 10px',borderRadius:'20px',fontWeight:'700'}}>{category}</span>
                  <span style={{fontSize:'11px',background:'#f0eeff',color:'#7c3aed',padding:'3px 10px',borderRadius:'20px',fontWeight:'700'}}>{blog.readTime||'5 min'} read</span>
                </div>
              </div>
              <div style={{padding:'22px'}}>
                <input value={blog.title} onChange={e=>setBlog(b=>({...b,title:e.target.value}))}
                  style={{width:'100%',border:'2px solid #f0eeff',borderRadius:'12px',padding:'12px 16px',fontSize:'18px',fontWeight:'800',fontFamily:'Syne,sans-serif',color:'#1a1a2e',outline:'none',marginBottom:'10px'}} />
                <textarea value={blog.excerpt} onChange={e=>setBlog(b=>({...b,excerpt:e.target.value}))} rows={2}
                  style={{width:'100%',border:'2px solid #f0eeff',borderRadius:'12px',padding:'12px 16px',fontSize:'14px',fontFamily:'inherit',color:'#374151',outline:'none',resize:'vertical',marginBottom:'10px',lineHeight:'1.6'}} />
                <textarea value={blog.content} onChange={e=>setBlog(b=>({...b,content:e.target.value}))} rows={14}
                  style={{width:'100%',border:'2px solid #f0eeff',borderRadius:'12px',padding:'14px 16px',fontSize:'14px',fontFamily:'inherit',color:'#374151',outline:'none',resize:'vertical',lineHeight:'1.7'}} />
              </div>
            </div>

            {/* Social posts */}
            <p style={{fontWeight:'800',fontSize:'14px',marginBottom:'12px',color:'#1a1a2e'}}>📱 Social Media Posts — each links back to the blog</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(460px,1fr))',gap:'16px',marginBottom:'20px'}}>
              {PLATFORMS.map(p=>{
                const cc = charCount(posts[p.id]||'', p.maxChars);
                return (
                  <div key={p.id} style={{background:'white',borderRadius:'20px',padding:'18px',border:'2px solid #f0eeff'}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'12px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                        <div style={{width:'36px',height:'36px',borderRadius:'11px',background:p.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'15px'}}>{p.icon}</div>
                        <div>
                          <div style={{fontFamily:'Syne,sans-serif',fontSize:'13px',fontWeight:'800'}}>{p.name}</div>
                          <div style={{fontSize:'10px',color:'#9ca3af'}}>{p.note}</div>
                        </div>
                      </div>
                      <span style={{fontSize:'11px',fontWeight:'700',padding:'3px 8px',borderRadius:'20px',background:'#f3f4f6',color:cc.color}}>{cc.text}</span>
                    </div>
                    <textarea value={posts[p.id]||''} onChange={e=>updatePost(p.id,e.target.value)} rows={6}
                      style={{width:'100%',border:'2px solid #f0eeff',borderRadius:'12px',padding:'12px',fontSize:'13px',fontFamily:'inherit',color:'#1a1a2e',resize:'vertical',outline:'none',lineHeight:'1.6'}} />
                    <div style={{display:'flex',gap:'7px',marginTop:'10px'}}>
                      <button style={{...btnStyle(),fontSize:'12px'}} onClick={()=>copyText(posts[p.id]||'','post_'+p.id)}>
                        {copied['post_'+p.id] ? '✅ Copied!' : '📋 Copy'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {hashtags.length>0 && (
              <div style={{background:'white',borderRadius:'14px',padding:'14px 18px',border:'2px solid #f0eeff',marginBottom:'20px'}}>
                <p style={{fontSize:'11px',fontWeight:'800',color:'#7c3aed',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'8px'}}>Suggested Hashtags</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
                  {hashtags.map(t=><span key={t} style={{fontSize:'11px',fontWeight:'700',color:'#7c3aed',background:'#f3f0ff',padding:'3px 10px',borderRadius:'20px'}}>#{t.replace('#','')}</span>)}
                </div>
              </div>
            )}

            <button style={{...btnStyle('orange'),padding:'12px 28px',fontSize:'14px'}} onClick={()=>setTab('publish')}>
              🚀 Go to Publish →
            </button>
          </div>
        )}

        {/* REVIEW TAB - no content yet */}
        {tab==='review' && !blog && (
          <div style={{textAlign:'center',padding:'60px 24px',color:'#9ca3af'}}>
            <div style={{fontSize:'48px',marginBottom:'12px'}}>📝</div>
            <p style={{fontWeight:'700',color:'#374151'}}>Generate content first</p>
          </div>
        )}

        {/* PUBLISH TAB */}
        {tab==='publish' && (
          <div>
            <div style={{background:'white',borderRadius:'20px',padding:'22px',border:'2px solid #f0eeff',marginBottom:'20px'}}>
              <h2 style={{fontFamily:'Syne,sans-serif',fontSize:'17px',fontWeight:'800',marginBottom:'8px'}}>🚀 Publish to funparks.app</h2>
              <p style={{fontSize:'13px',color:'#6b7280',lineHeight:'1.6',marginBottom:'16px'}}>
                Copy the script below → save as <code style={{background:'#f0eeff',padding:'2px 6px',borderRadius:'5px',fontSize:'12px'}}>add_post.js</code> in your <code style={{background:'#f0eeff',padding:'2px 6px',borderRadius:'5px',fontSize:'12px'}}>funparks-website</code> folder → run it → push to GitHub.
              </p>
              {script ? (
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
                    <p style={{fontWeight:'800',color:'#166534',fontSize:'13px',marginBottom:'8px'}}>Then run these 3 commands in PowerShell:</p>
                    <pre style={{color:'#15803d',fontSize:'12px',fontFamily:'Courier New,monospace',lineHeight:'1.8',margin:0}}>
{blog ? `cd "C:\\Users\\claud\\OneDrive\\Desktop\\funparks-website"
node add_post.js
git add .
git commit -m "Add blog post: ${(blog.title||'').slice(0,40)}"
git push` : ''}
                    </pre>
                  </div>
                  <p style={{fontSize:'12px',color:'#9ca3af',marginTop:'10px',fontWeight:'500'}}>
                    Post goes live at <strong>funparks.app/blog/{slug}</strong> in ~30 seconds after push.
                  </p>
                </>
              ) : (
                <div style={{textAlign:'center',padding:'40px',color:'#9ca3af'}}>
                  <p style={{fontWeight:'700',color:'#374151'}}>Generate content first</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
