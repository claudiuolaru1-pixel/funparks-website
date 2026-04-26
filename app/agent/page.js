ÿ'use client';
import ImageCard from '../../components/ImageCard';
import { useState } from 'react';

const PLATFORMS = [
  {id:'instagram',name:'Instagram',icon:'𸓸',bg:'linear-gradient(135deg,#f09433,#dc2743,#bc1888)',maxChars:2200,note:'Add to Stories + Reels'},
  {id:'tiktok',name:'TikTok',icon:'𸽵',bg:'linear-gradient(135deg,#010101,#69C9D0)',maxChars:2200,note:'Hook in first line'},
  {id:'youtube',name:'YouTube',icon:'✶️',bg:'linear-gradient(135deg,#FF0000,#cc0000)',maxChars:500,note:'Shorts caption'},
  {id:'facebook',name:'Facebook',icon:'𸜥',bg:'linear-gradient(135deg,#1877F2,#0d5bba)',maxChars:63206,note:'End with a question'},
];

const WEEKLY_SCHEDULE = [
  {
    day:'Monday', continent:'Europe', color:'#06b6d4', emoji:'𸡪𸡺',
    topics:[
      {title:'Europa-Park vs Phantasialand: Which is Germany\'s best?', category:'Comparison', tone:'debate'},
      {title:'Hidden secrets at Efteling most visitors never discover', category:'Hidden Gems', tone:'inspiring'},
      {title:'How to skip the queues at Alton Towers (and save money)', category:'Tips', tone:'fun'},
      {title:'Best value theme parks in Europe 2025 ⬝ ranked by price', category:'Comparison', tone:'informative'},
      {title:'10 European roller coasters that beat anything in the USA', category:'Top Lists', tone:'debate'},
      {title:'Did you know? Shocking facts about European theme parks', category:'Tips', tone:'fun'},
    ]
  },
  {
    day:'Tuesday', continent:'Asia', color:'#a855f7', emoji:'𸙏',
    topics:[
      {title:'Tokyo Disneyland vs Tokyo DisneySea: Which should you visit first?', category:'Comparison', tone:'debate'},
      {title:'Universal Studios Japan hidden gems even locals don\'t know', category:'Hidden Gems', tone:'inspiring'},
      {title:'How to skip queues at Shanghai Disneyland with Klook', category:'Tips', tone:'fun'},
      {title:'Best theme parks in Asia ranked by thrill level', category:'Top Lists', tone:'informative'},
      {title:'Hong Kong Disneyland vs Shanghai Disneyland: The truth', category:'Comparison', tone:'debate'},
      {title:'Did you know? Mind-blowing facts about Asian theme parks', category:'Tips', tone:'fun'},
    ]
  },
  {
    day:'Wednesday', continent:'USA', color:'#FF6B2B', emoji:'𸡺𸡸',
    topics:[
      {title:'Magic Kingdom vs EPCOT: Which Disney park is worth it in 2025?', category:'Comparison', tone:'debate'},
      {title:'Cedar Point vs Six Flags Magic Mountain: Coaster capital showdown', category:'Comparison', tone:'debate'},
      {title:'How to beat the crowds at Universal Orlando this summer', category:'Tips', tone:'fun'},
      {title:'Best roller coasters in the USA ranked by thrill level', category:'Top Lists', tone:'informative'},
      {title:'Hidden secrets at Magic Kingdom Disney doesn\'t advertise', category:'Hidden Gems', tone:'inspiring'},
      {title:'USA theme park prices 2025: Which offers best value?', category:'Comparison', tone:'informative'},
    ]
  },
  {
    day:'Thursday', continent:'Tips & Guides', color:'#f59e0b', emoji:'𸢡',
    topics:[
      {title:'Skip the line at any theme park ⬝ the complete 2025 guide', category:'Tips', tone:'informative'},
      {title:'Best theme park apps you need before your next visit', category:'Tips', tone:'fun'},
      {title:'How to visit 3 theme parks in one trip on a budget', category:'Tips', tone:'inspiring'},
      {title:'Priority passes compared: GetYourGuide vs Viator vs Klook', category:'Comparison', tone:'informative'},
      {title:'What to eat at the world\'s best theme parks', category:'Park Guide', tone:'fun'},
      {title:'Theme park photography tips for Instagram-worthy shots', category:'Tips', tone:'fun'},
    ]
  },
  {
    day:'Friday', continent:'Weekend Inspiration', color:'#f43f5e', emoji:'✠️',
    topics:[
      {title:'Best theme park weekend breaks from major European cities', category:'Destination', tone:'inspiring'},
      {title:'The ultimate theme park bucket list for 2025', category:'Top Lists', tone:'inspiring'},
      {title:'Why theme parks are the perfect family weekend destination', category:'Destination', tone:'inspiring'},
      {title:'Last-minute theme park deals: How to find them in 2025', category:'Tips', tone:'fun'},
      {title:'Best theme parks within 2 hours of London, Paris and Amsterdam', category:'Destination', tone:'informative'},
      {title:'How to plan the perfect theme park trip for under ⡬200', category:'Tips', tone:'informative'},
    ]
  },
  {
    day:'Saturday', continent:'Americas + Middle East + Africa', color:'#10b981', emoji:'𸙍',
    topics:[
      {title:'Ferrari World Abu Dhabi: Is the world\'s fastest coaster worth it?', category:'Park Guide', tone:'debate'},
      {title:'Parque Warner Madrid vs PortAventura: Spain\'s theme park battle', category:'Comparison', tone:'debate'},
      {title:'Gold Reef City Johannesburg: Africa\'s most underrated theme park', category:'Hidden Gems', tone:'inspiring'},
      {title:'Best theme parks in Latin America you\'ve never heard of', category:'Hidden Gems', tone:'inspiring'},
      {title:'IMG Worlds of Adventure Dubai: Everything you need to know', category:'Park Guide', tone:'informative'},
      {title:'Beto Carrero World Brazil: South America\'s theme park giant', category:'Park Guide', tone:'inspiring'},
    ]
  },
  {
    day:'Sunday', continent:'Oceania + Global News', color:'#06b6d4', emoji:'𸙠',
    topics:[
      {title:'Dreamworld Gold Coast: Australia\'s most thrilling theme park', category:'Park Guide', tone:'fun'},
      {title:'Warner Bros. Movie World vs Dreamworld: Queensland showdown', category:'Comparison', tone:'debate'},
      {title:'Best theme parks in Australia for families in 2025', category:'Top Lists', tone:'informative'},
      {title:'New roller coasters opening worldwide in 2025', category:'News', tone:'fun'},
      {title:'Top 10 most visited theme parks in the world 2025', category:'Top Lists', tone:'informative'},
      {title:'The world\'s most extreme theme park experiences ranked', category:'Top Lists', tone:'debate'},
    ]
  },
];

const AFFILIATE = {
  gyg: 'https://www.getyourguide.com/s/?q=QUERY&filters=activity_type%3ASkip+the+Line&partner_id=GVNQTTL',
  viator: 'https://www.viator.com/search/QUERY?pid=P00298240&mcid=42383&medium=link',
  booking: 'https://www.booking.com/searchresults.html?aid=4347407&ss=QUERY&label=funparks-blog',
  klook: 'https://affiliate.klook.com/redirect?aid=119449&aff_adid=&k_site=https%3A%2F%2Fwww.klook.com%2Fsearch%2F%3Fquery%3DQUERY',
};

const TODAY_DAY = new Date().getDay(); // 0=Sun, 1=Mon...
const dayIndex = TODAY_DAY === 0 ? 6 : TODAY_DAY - 1; // Map to our 0=Mon schedule

export default function AgentPage() {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState(()=>{try{return sessionStorage.getItem('fp_category')||'Park Guide';}catch{return 'Park Guide';}});
  const [tone, setTone] = useState('fun');
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(()=>{try{const s=sessionStorage.getItem('fp_blog');return s?JSON.parse(s):null;}catch{return null;}});
  const [posts, setPosts] = useState(()=>{try{const s=sessionStorage.getItem('fp_posts');return s?JSON.parse(s):{};}catch{return {};}});
  const [hashtags, setHashtags] = useState(()=>{try{const s=sessionStorage.getItem('fp_hashtags');return s?JSON.parse(s):[];}catch{return [];}});
  const [slug, setSlug] = useState(()=>{try{return sessionStorage.getItem('fp_slug')||'';}catch{return '';}});
  const [script, setScript] = useState('');
  const [copied, setCopied] = useState({});
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [publishError, setPublishError] = useState('');
  const [tab, setTab] = useState('schedule');
  const [selectedDay, setSelectedDay] = useState(dayIndex);

  const slugify = t => t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,60);

  const pickTopic = (t) => {
    setTopic(t.title);
    setCategory(t.category);
    setTone(t.tone);
    setTab('generate');
  };

  const publishToSite = async () => {
    if (!blog) return;
    setPublishing(true); setPublished(false); setPublishError('');
    const emojis = {'Park Guide':'𸝺️','Comparison':'⡝️','News':'𸓰','Tips':'𸢡','Hidden Gems':'𸢽','Top Lists':'𸏠','Destination':'✠️','App Updates':'𸓱'};
    const post = {slug,title:blog.title||'',excerpt:blog.excerpt||'',category,emoji:emojis[category]||'𸽢',date:new Date().toISOString().split('T')[0],readTime:blog.readTime||'5 min',content:blog.content||''};
    try {
      const res=await fetch('/api/publish',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({post})});
      const data=await res.json();
      if(data.success){setPublished(true);}else{setPublishError(data.error||'Failed');}
    } catch(e){setPublishError(e.message);}
    setPublishing(false);
  };
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

    const prompt = `You are the content team for Funparks, a free theme park app covering 64 parks across 6 continents.

Write a complete content package about: "${topic}"
Category: ${category}
Tone: ${toneDesc}

IMPORTANT MONETIZATION RULES:
- Include at least 2 natural affiliate CTAs in the blog post body
- For skip-the-line tickets: use URL https://www.getyourguide.com/s/?q=PARKNAME+skip+the+line&partner_id=GVNQTTL replacing PARKNAME with actual park name
- For tours: use URL https://www.viator.com/search/PARKNAME+tours?pid=P00298240&mcid=42383&medium=link replacing PARKNAME
- For Asian parks: use URL https://affiliate.klook.com/redirect?aid=119449&k_site=https://www.klook.com/search/?query=PARKNAME replacing PARKNAME
- For hotels: use URL https://www.booking.com/searchresults.html?aid=4347407&ss=CITY+PARKNAME replacing CITY and PARKNAME
- CTAs should feel natural, not salesy. Example: "You can book skip-the-line tickets on GetYourGuide here"
- End blog post with a clear CTA section with 2-3 affiliate links
- Mention the Funparks app (free on Android at funparks.app) as the best way to plan visits

Return ONLY a valid JSON object (no markdown, no backticks):
{
  "blog": {
    "title": "compelling SEO-friendly title under 65 characters",
    "excerpt": "2-sentence summary that makes people want to read more",
    "readTime": "X min",
    "content": "full blog post 700-1000 words. Use **bold** for subheadings. Include specific real park names, attraction names, prices where relevant. Include 2 natural affiliate CTAs in body. End with ## Plan Your Visit section with 2-3 affiliate links formatted as [Link Text](URL)"
  },
  "instagram": "Instagram caption 200-350 words with emojis, strong hook, 12-15 hashtags including #funparks #themeparks, mention funparks.app",
  "tiktok": "TikTok caption starting with viral hook (Nobody tells you... / POV: you just discovered... / This changes everything about...), 150-250 words, trending hashtags",
  "youtube": "YouTube Shorts description max 120 words with strong CTA, mention funparks.app/blog",
  "facebook": "Facebook post 150-250 words, conversational, ends with engaging question to drive comments, link to funparks.app/blog",
  "hashtags": ["funparks","themeparks","rollercoaster","themepark","coasters","disney","universalstudios","amusementpark","themepark2025","parklife","coasterlife","familytravel","traveleurope","thrillseeker","weekendtrip"]
}`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if(data.error) throw new Error(data.error+(data.preview?" Preview: "+data.preview:""));
      const parsed = data.parsed;
      const newSlug = slugify(parsed.blog.title || topic);
      // parsed already extracted server-side
      // removed - parsing done server-side
      const newSlug = slugify(parsed.blog.title || topic);

      setBlog(parsed.blog);
      setPosts({instagram:parsed.instagram,tiktok:parsed.tiktok,youtube:parsed.youtube,facebook:parsed.facebook});
      setHashtags(parsed.hashtags||[]);
      try{sessionStorage.setItem('fp_blog',JSON.stringify(parsed.blog));sessionStorage.setItem('fp_posts',JSON.stringify({instagram:parsed.instagram,tiktok:parsed.tiktok,youtube:parsed.youtube,facebook:parsed.facebook}));sessionStorage.setItem('fp_hashtags',JSON.stringify(parsed.hashtags||[]));sessionStorage.setItem('fp_slug',newSlug);sessionStorage.setItem('fp_category',category);}catch(e){}
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
    const emojis = {'Park Guide':'𸝺️','Comparison':'⡝️','News':'𸓰','Tips':'𸢡','Hidden Gems':'𸢽','Top Lists':'𸏠','Destination':'✠️','App Updates':'𸓱'};
    const emoji = emojis[cat]||'𸽢';
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
    return `const fs=require('fs'),path=require('path');
const file=path.join(process.cwd(),'public','blog-posts.json');
const posts=JSON.parse(fs.readFileSync(file,'utf8'));
const newPost=${postObj};
if(!posts.find(p=>p.slug===newPost.slug)){
  posts.unshift(newPost);
  fs.writeFileSync(file,JSON.stringify(posts,null,2),'utf8');
  console.log('Added:',newPost.title);
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

  const schedule = WEEKLY_SCHEDULE[selectedDay];

  return (
    <div style={{minHeight:'100vh',background:'#f8f7ff',fontFamily:'Plus Jakarta Sans,sans-serif'}}>
      {/* Header */}
      <div style={{background:'linear-gradient(135deg,#1a1a2e,#2d1b69)',padding:'20px 32px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{fontFamily:'Syne,sans-serif',fontSize:'20px',fontWeight:'800',color:'white'}}>
          fun<span style={{background:'linear-gradient(135deg,#FF6B2B,#f43f5e,#a855f7)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>parks</span>
          <span style={{color:'rgba(255,255,255,0.6)',fontSize:'14px',fontWeight:'600',marginLeft:'12px'}}>Content Pipeline 𸽢</span>
        </div>
        <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
          <div style={{background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',color:'rgba(255,255,255,0.7)',padding:'5px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>64 PARKS ⬢ 6 CONTINENTS</div>
        </div>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'28px 20px'}}>
        {/* Tabs */}
        <div style={{display:'flex',gap:'4px',background:'white',borderRadius:'16px',padding:'5px',border:'2px solid #f0eeff',marginBottom:'24px',width:'fit-content',boxShadow:'0 2px 12px rgba(168,85,247,0.08)'}}>
          {[['schedule','𸓦 Weekly Schedule'],['generate','✨ Generate'],['review','𸓝 Review & Edit'],['publish','𸡬 Publish']].map(([id,label])=>(
            <button key={id} style={tabStyle(tab===id)} onClick={()=>setTab(id)}>{label}</button>
          ))}
        </div>

        {/* SCHEDULE TAB */}
        {tab==='schedule' && (
          <div>
            <div style={{marginBottom:'20px'}}>
              <h2 style={{fontFamily:'Syne,sans-serif',fontSize:'18px',fontWeight:'900',color:'#1a1a2e',marginBottom:'6px'}}>𸓦 Weekly Content Calendar</h2>
              <p style={{color:'#6b7280',fontSize:'14px'}}>Each day targets a different continent. Click any topic to pre-fill and generate.</p>
            </div>

            {/* Day selector */}
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'24px'}}>
              {WEEKLY_SCHEDULE.map((d,i)=>(
                <button key={i} onClick={()=>setSelectedDay(i)}
                  style={{padding:'8px 16px',borderRadius:'12px',border:'none',fontFamily:'inherit',fontSize:'13px',fontWeight:'700',cursor:'pointer',
                    background: selectedDay===i ? d.color : 'white',
                    color: selectedDay===i ? 'white' : '#374151',
                    boxShadow: selectedDay===i ? `0 4px 12px ${d.color}40` : '0 1px 4px rgba(0,0,0,0.06)',
                    border: selectedDay===i ? 'none' : '2px solid #f0f0f8',
                  }}>
                  {d.emoji} {d.day}
                  {i===dayIndex && <span style={{marginLeft:'6px',fontSize:'10px',opacity:0.8}}>TODAY</span>}
                </button>
              ))}
            </div>

            {/* Topics for selected day */}
            <div style={{background:'white',borderRadius:'20px',padding:'24px',border:'2px solid #f0eeff',boxShadow:'0 4px 20px rgba(0,0,0,0.04)'}}>
              <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'20px'}}>
                <span style={{fontSize:'32px'}}>{schedule.emoji}</span>
                <div>
                  <h3 style={{fontFamily:'Syne,sans-serif',fontSize:'18px',fontWeight:'900',color:'#1a1a2e',margin:0}}>{schedule.day} ⬝ {schedule.continent}</h3>
                  <p style={{color:'#9ca3af',fontSize:'13px',margin:'4px 0 0'}}>6 ready-to-use topic ideas</p>
                </div>
              </div>
              <div style={{display:'grid',gap:'10px'}}>
                {schedule.topics.map((t,i)=>(
                  <div key={i} onClick={()=>pickTopic(t)}
                    style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 18px',borderRadius:'14px',border:`2px solid ${schedule.color}20`,background:`${schedule.color}08`,cursor:'pointer',transition:'all 0.2s'}}>
                    <div style={{flex:1}}>
                      <p style={{fontWeight:'700',color:'#1a1a2e',fontSize:'14px',margin:'0 0 4px'}}>{t.title}</p>
                      <div style={{display:'flex',gap:'8px'}}>
                        <span style={{fontSize:'11px',fontWeight:'700',padding:'2px 8px',borderRadius:'999px',background:schedule.color+'20',color:schedule.color}}>{t.category}</span>
                        <span style={{fontSize:'11px',fontWeight:'600',color:'#9ca3af',padding:'2px 8px',borderRadius:'999px',background:'#f3f4f6'}}>
                          {{fun:'𸽰 Fun',informative:'𸓡 Info',inspiring:'✨ Inspiring',debate:'𸝥 Debate'}[t.tone]}
                        </span>
                      </div>
                    </div>
                    <div style={{marginLeft:'16px',padding:'8px 16px',borderRadius:'10px',background:schedule.color,color:'white',fontSize:'12px',fontWeight:'700',whiteSpace:'nowrap'}}>
                      Use This ⠢
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Affiliate reference */}
            <div style={{marginTop:'20px',background:'white',borderRadius:'16px',padding:'20px',border:'2px solid #f0eeff'}}>
              <p style={{fontFamily:'Syne,sans-serif',fontSize:'13px',fontWeight:'800',color:'#1a1a2e',marginBottom:'12px'}}>𸢰 Affiliate Links (auto-included in all content)</p>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'10px'}}>
                {[
                  {name:'GetYourGuide',desc:'Skip the Line ⬝ Europe',color:'#ff5533',id:'GVNQTTL'},
                  {name:'Viator',desc:'Tours & Experiences',color:'#1a73e8',id:'P00298240'},
                  {name:'Klook',desc:'Asia parks',color:'#ff6600',id:'119449'},
                  {name:'Booking.com',desc:'Hotels near parks',color:'#003580',id:'4347407'},
                ].map(a=>(
                  <div key={a.name} style={{padding:'12px 14px',borderRadius:'12px',background:a.color+'10',border:`1px solid ${a.color}25`}}>
                    <p style={{fontWeight:'800',fontSize:'13px',color:a.color,margin:'0 0 2px'}}>{a.name}</p>
                    <p style={{fontSize:'12px',color:'#6b7280',margin:'0 0 4px'}}>{a.desc}</p>
                    <p style={{fontSize:'11px',color:'#9ca3af',margin:0,fontFamily:'monospace'}}>ID: {a.id}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* GENERATE TAB */}
        {tab==='generate' && (
          <div>
            <div style={{background:'white',borderRadius:'20px',padding:'24px',marginBottom:'22px',border:'2px solid #f0eeff',boxShadow:'0 4px 20px rgba(168,85,247,0.06)'}}>
              <h2 style={{fontFamily:'Syne,sans-serif',fontSize:'17px',fontWeight:'800',marginBottom:'16px'}}>✨ Generate Blog Post + Social Media Content</h2>
              <div style={{display:'flex',gap:'12px',flexWrap:'wrap',alignItems:'flex-end'}}>
                <div style={{flex:1,minWidth:'280px'}}>
                  <div style={{fontSize:'11px',fontWeight:'800',color:'#9ca3af',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'5px'}}>Topic / Idea</div>
                  <input value={topic} onChange={e=>setTopic(e.target.value)} onKeyDown={e=>e.key==='Enter'&&generate()}
                    placeholder="e.g. Europa-Park vs Phantasialand: which is better?"
                    style={{width:'100%',border:'2px solid #e5e7eb',borderRadius:'10px',padding:'9px 13px',fontSize:'13px',fontFamily:'inherit',color:'#1a1a2e',outline:'none'}} />
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
                    <option value="fun">𸽰 Fun & Energetic</option>
                    <option value="informative">𸓡 Informative</option>
                    <option value="inspiring">✨ Inspiring</option>
                    <option value="debate">𸝥 Debate Starter</option>
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
                <div style={{fontSize:'56px',marginBottom:'12px'}}>𸽡</div>
                <p style={{fontSize:'17px',fontWeight:'700',color:'#374151',marginBottom:'8px'}}>Ready to create content!</p>
                <p style={{fontSize:'13px'}}>Pick a topic from the Weekly Schedule or enter your own.<br/>Claude writes a blog post + all 4 social posts with affiliate CTAs.</p>
                <button style={{...btnStyle('purple'),marginTop:'16px',padding:'10px 20px',fontSize:'13px'}} onClick={()=>setTab('schedule')}>
                  𸓦 Browse Weekly Schedule
                </button>
              </div>
            )}
            {loading && (
              <div style={{textAlign:'center',padding:'60px 24px'}}>
                <div style={{width:'40px',height:'40px',border:'3px solid #f0eeff',borderTopColor:'#a855f7',borderRadius:'50%',animation:'spin 0.8s linear infinite',margin:'0 auto 16px'}} />
                <style>{('@keyframes spin{to{transform:rotate(360deg)}}')}</style>
                <p style={{fontWeight:'700',color:'#374151'}}>Writing blog + social posts + affiliate CTAs...</p>
                <p style={{fontSize:'12px',color:'#9ca3af',marginTop:'6px'}}>~20-30 seconds</p>
              </div>
            )}
            {blog && !loading && (
              <div style={{background:'#d1fae5',border:'2px solid #34d399',borderRadius:'16px',padding:'16px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div>
                  <p style={{fontWeight:'800',color:'#065f46'}}>✦ Content generated!</p>
                  <p style={{fontSize:'13px',color:'#047857',marginTop:'2px'}}>{blog.title}</p>
                </div>
                <button style={btnStyle('green')} onClick={()=>setTab('review')}>Review & Edit ⠢</button>
              </div>
            )}
          </div>
        )}

        {/* REVIEW TAB */}
        {tab==='review' && blog && (
          <div>
            <div style={{background:'white',borderRadius:'20px',border:'2px solid #f0eeff',overflow:'hidden',marginBottom:'22px'}}>
              <div style={{padding:'14px 22px',background:'linear-gradient(135deg,#fff7f5,#fdf4ff)',borderBottom:'2px solid #f0eeff',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <span style={{fontFamily:'Syne,sans-serif',fontSize:'14px',fontWeight:'800'}}>𸓝 Blog Post ⬝ funparks.app/blog/{slug}</span>
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
                <textarea value={blog.content} onChange={e=>setBlog(b=>({...b,content:e.target.value}))} rows={16}
                  style={{width:'100%',border:'2px solid #f0eeff',borderRadius:'12px',padding:'14px 16px',fontSize:'14px',fontFamily:'inherit',color:'#374151',outline:'none',resize:'vertical',lineHeight:'1.7'}} />
              </div>
            </div>

            <p style={{fontWeight:'800',fontSize:'14px',marginBottom:'12px',color:'#1a1a2e'}}>𸓱 Social Media Posts</p>
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
                        {copied['post_'+p.id] ? '✦ Copied!' : '𸓹 Copy'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <ImageCard post={blog} category={category} />
            {hashtags.length>0 && (
              <div style={{background:'white',borderRadius:'14px',padding:'14px 18px',border:'2px solid #f0eeff',marginBottom:'20px'}}>
                <p style={{fontSize:'11px',fontWeight:'800',color:'#7c3aed',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'8px'}}>Suggested Hashtags</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
                  {hashtags.map(t=><span key={t} style={{fontSize:'11px',fontWeight:'700',color:'#7c3aed',background:'#f3f0ff',padding:'3px 10px',borderRadius:'20px'}}>#{t.replace('#','')}</span>)}
                </div>
              </div>
            )}

            <button style={{...btnStyle('orange'),padding:'12px 28px',fontSize:'14px'}} onClick={()=>setTab('publish')}>
              𸡬 Go to Publish ⠢
            </button>
          </div>
        )}

        {tab==='review' && !blog && (
          <div style={{textAlign:'center',padding:'60px 24px',color:'#9ca3af'}}>
            <div style={{fontSize:'48px',marginBottom:'12px'}}>𸓝</div>
            <p style={{fontWeight:'700',color:'#374151'}}>Generate content first</p>
            <button style={{...btnStyle('orange'),marginTop:'16px',padding:'10px 20px',fontSize:'13px'}} onClick={()=>setTab('schedule')}>
              𸓦 Browse Topics
            </button>
          </div>
        )}

        {/* PUBLISH TAB */}
        {tab==='publish' && (
          <div>
            <div style={{background:'white',borderRadius:'20px',padding:'22px',border:'2px solid #f0eeff',marginBottom:'20px'}}>
              <h2 style={{fontFamily:'Syne,sans-serif',fontSize:'17px',fontWeight:'800',marginBottom:'8px'}}>𸡬 Publish to funparks.app</h2>
              <p style={{fontSize:'13px',color:'#6b7280',lineHeight:'1.6',marginBottom:'16px'}}>
                Copy the script ⠢ save as <code style={{background:'#f0eeff',padding:'2px 6px',borderRadius:'5px',fontSize:'12px'}}>add_post.js</code> in your funparks-website folder ⠢ run it ⠢ push to GitHub.
              </p>
              {published && <div style={{background:'#d1fae5',border:'2px solid #34d399',borderRadius:'12px',padding:'12px 16px',marginBottom:'12px'}}><p style={{fontWeight:'800',color:'#065f46',margin:0}}>Published! Live at funparks.app/blog/{slug}</p></div>}
              {publishError && <div style={{background:'#fef2f2',border:'2px solid #fca5a5',borderRadius:'12px',padding:'12px 16px',marginBottom:'12px'}}><p style={{fontWeight:'800',color:'#991b1b',margin:0}}>Error: {publishError}</p></div>}
              {blog && <button onClick={publishToSite} disabled={publishing||published} style={{width:'100%',padding:'14px',borderRadius:'12px',border:'none',fontFamily:'inherit',fontSize:'15px',fontWeight:'800',cursor:'pointer',background:'linear-gradient(135deg,#FF6B2B,#f43f5e,#a855f7)',color:'white',marginBottom:'16px',opacity:publishing||published?0.7:1}}>{publishing?'Publishing...':published?'Published!':'Publish to funparks.app in 1 click'}</button>}
              {script ? (
                <>
                  <div style={{background:'#1a1a2e',borderRadius:'14px',padding:'16px',marginBottom:'14px'}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
                      <span style={{color:'rgba(255,255,255,0.5)',fontSize:'12px',fontWeight:'600'}}>add_post.js</span>
                      <button style={{...btnStyle('green'),fontSize:'12px'}} onClick={()=>copyText(script,'script')}>
                        {copied.script ? '✦ Copied!' : '𸓹 Copy Script'}
                      </button>
                    </div>
                    <pre style={{color:'#a5f3fc',fontSize:'11px',whiteSpace:'pre-wrap',fontFamily:'Courier New,monospace',lineHeight:'1.6',margin:0}}>{script}</pre>
                  </div>
                  <div style={{background:'#f0fdf4',border:'2px solid #86efac',borderRadius:'14px',padding:'14px 18px'}}>
                    <p style={{fontWeight:'800',color:'#166534',fontSize:'13px',marginBottom:'8px'}}>Run in PowerShell:</p>
                    <pre style={{color:'#15803d',fontSize:'12px',fontFamily:'Courier New,monospace',lineHeight:'1.8',margin:0}}>{`cd "C:\\Users\\claud\\OneDrive\\Desktop\\funparks-website"\nnode add_post.js\ngit add .\ngit commit -m "Add post: ${(blog?.title||'').slice(0,40)}"\ngit push`}</pre>
                  </div>
                  <p style={{fontSize:'12px',color:'#9ca3af',marginTop:'10px'}}>
                    Live at <strong>funparks.app/blog/{slug}</strong> in ~30 seconds.
                  </p>
                </>
              ) : (
                <div style={{textAlign:'center',padding:'40px',color:'#9ca3af'}}>
                  <p style={{fontWeight:'700',color:'#374151'}}>Generate content first</p>
                  <button style={{...btnStyle('orange'),marginTop:'16px',padding:'10px 20px',fontSize:'13px'}} onClick={()=>setTab('schedule')}>
                    𸓦 Browse Topics
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
