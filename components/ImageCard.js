'use client';
import { useEffect, useRef, useState } from 'react';

export default function ImageCard({ post, category }) {
  const canvasRef = useRef(null);
  const [dataUrl, setDataUrl] = useState('');
  const [capcut, setCapcut] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!post) return;
    generateCard();
    generateCapCut();
  }, [post]);

  const generateCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 1080, H = 1080;
    canvas.width = W;
    canvas.height = H;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#0f0c29');
    grad.addColorStop(0.5, '#302b63');
    grad.addColorStop(1, '#24243e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Glow circles
    ctx.save();
    ctx.globalAlpha = 0.10;
    ctx.fillStyle = '#FF6B2B';
    ctx.beginPath(); ctx.arc(W*0.85, H*0.12, 300, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#a855f7';
    ctx.beginPath(); ctx.arc(W*0.12, H*0.88, 240, 0, Math.PI*2); ctx.fill();
    ctx.restore();

    // Top accent line
    const lg = ctx.createLinearGradient(60,0,W-60,0);
    lg.addColorStop(0,'#FF6B2B'); lg.addColorStop(0.5,'#f43f5e'); lg.addColorStop(1,'#a855f7');
    ctx.strokeStyle=lg; ctx.lineWidth=4;
    ctx.beginPath(); ctx.moveTo(60,72); ctx.lineTo(W-60,72); ctx.stroke();

    // Logo
    ctx.font='bold 40px Arial';
    ctx.fillStyle='white'; ctx.fillText('fun',60,130);
    const fw=ctx.measureText('fun').width;
    ctx.fillStyle='#FF6B2B'; ctx.fillText('parks',60+fw,130);

    // Category badge
    const cat=(category||'Park Guide').toUpperCase();
    ctx.font='bold 17px Arial';
    const bw=ctx.measureText(cat).width+36;
    ctx.fillStyle='rgba(255,107,43,0.2)';
    ctx.beginPath();
    ctx.roundRect(W-60-bw,100,bw,34,17);
    ctx.fill();
    ctx.fillStyle='#FF6B2B';
    ctx.textAlign='right';
    ctx.fillText(cat,W-60-18,122);
    ctx.textAlign='left';

    // Title - large, centered feel
    ctx.fillStyle='white';
    ctx.font='bold 58px Arial';
    const title=post.title||'';
    const titleLines=wrapText(ctx,title,60,220,W-120,72,3);

    // Divider
    const divY=220+titleLines*72+24;
    ctx.strokeStyle='rgba(255,255,255,0.12)'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(60,divY); ctx.lineTo(W-60,divY); ctx.stroke();

    // Excerpt - 2 lines max
    ctx.fillStyle='rgba(255,255,255,0.65)';
    ctx.font='28px Arial';
    wrapText(ctx,post.excerpt||'',60,divY+46,W-120,40,2);

    // Extract up to 4 bold headings as key points
    const content=post.content||'';
    const bold=content.match(/\*\*([^*]{3,50})\*\*/g)||[];
    const points=bold.slice(0,4).map(m=>m.replace(/\*\*/g,''));

    if(points.length>0){
      let py=divY+46+40*2+48;
      ctx.font='bold 20px Arial';
      ctx.fillStyle='rgba(255,255,255,0.4)';
      ctx.fillText('KEY HIGHLIGHTS',60,py-10);
      points.forEach((p,idx)=>{
        // Dot
        const dg=ctx.createRadialGradient(72,py+22,0,72,py+22,7);
        dg.addColorStop(0,'#FF6B2B'); dg.addColorStop(1,'#f43f5e');
        ctx.fillStyle=dg;
        ctx.beginPath(); ctx.arc(72,py+22,7,0,Math.PI*2); ctx.fill();
        // Text
        ctx.fillStyle='rgba(255,255,255,0.88)';
        ctx.font='bold 26px Arial';
        const short=p.length>52?p.substring(0,52)+'...':p;
        ctx.fillText(short,92,py+30);
        py+=52;
      });
    }

    // Bottom bar
    const bg=ctx.createLinearGradient(0,H-90,W,H-90);
    bg.addColorStop(0,'#FF6B2B'); bg.addColorStop(0.5,'#f43f5e'); bg.addColorStop(1,'#a855f7');
    ctx.fillStyle=bg; ctx.fillRect(0,H-90,W,90);
    ctx.fillStyle='white';
    ctx.font='bold 30px Arial'; ctx.textAlign='center';
    ctx.fillText('funparks.app',W/2,H-48);
    ctx.font='20px Arial'; ctx.fillStyle='rgba(255,255,255,0.7)';
    ctx.fillText('Free theme park app  |  64 parks worldwide',W/2,H-18);
    ctx.textAlign='left';

    setDataUrl(canvas.toDataURL('image/jpeg',0.95));
  };

  function wrapText(ctx,text,x,y,maxW,lineH,maxLines=10){
    const words=text.split(' ');
    const lines=[];
    let cur='';
    words.forEach(w=>{
      const t=cur?cur+' '+w:w;
      if(ctx.measureText(t).width>maxW){if(cur)lines.push(cur);cur=w;}
      else cur=t;
    });
    if(cur)lines.push(cur);
    const show=lines.slice(0,maxLines);
    show.forEach((l,i)=>ctx.fillText(l,x,y+i*lineH));
    return show.length;
  }

  const generateCapCut = () => {
    if (!post) return;
    const content = post.content || '';
    const title = post.title || '';

    // Parse into slides intelligently
    const paragraphs = content.split('\n\n').filter(p => p.trim());
    const slides = [];

    // Slide 1: Hook
    slides.push({ duration: 3, type: 'hook', text: title });

    let slideNum = 2;
    paragraphs.forEach(p => {
      const clean = p.replace(/\*\*/g, '').trim();
      if (!clean || clean.length < 15) return;
      if (slideNum > 9) return;

      // Section headers become title slides
      if (p.startsWith('**') && p.endsWith('**')) {
        slides.push({ duration: 2, type: 'section', text: clean });
      } else {
        // Content - trim to 15 words
        const words = clean.split(' ');
        const text = words.slice(0, 15).join(' ') + (words.length > 15 ? '...' : '');
        slides.push({ duration: 4, type: 'content', text });
      }
      slideNum++;
    });

    // Final CTA
    slides.push({ duration: 3, type: 'cta', text: 'Read the full guide at funparks.app/blog' });

    let script = `CAPCUT SCRIPT \u2014 ${title}\n`;
    script += `${'='.repeat(55)}\n\n`;
    script += `SETUP:\n`;
    script += `1. Open CapCut \u2192 New Project \u2192 Add background (stock video or photo)\n`;
    script += `2. Tap Audio \u2192 search "chill lofi travel" \u2192 add music\n`;
    script += `3. For each slide below: tap Text \u2192 Add Text \u2192 type the text \u2192 set duration\n\n`;
    script += `${'\u2500'.repeat(55)}\n\n`;

    slides.forEach((s, i) => {
      const icons = { hook: '\uD83C\uDFAF', section: '\uD83D\uDCCC', content: '\uD83D\uDCAC', cta: '\uD83D\uDCF1' };
      script += `SLIDE ${i + 1} \u2014 ${s.duration} seconds  ${icons[s.type] || ''}\n`;
      script += `"${s.text}"\n`;
      if (s.type === 'hook') script += `TIP: Use large bold white text, center screen\n`;
      if (s.type === 'cta') script += `TIP: Add Funparks logo or website URL as sticker\n`;
      script += '\n';
    });

    script += `${'\u2500'.repeat(55)}\n`;
    script += `TOTAL: ~${slides.reduce((a, s) => a + s.duration, 0)} seconds\n\n`;
    script += `EXPORT: 1080x1080 (Instagram) or 1080x1920 (TikTok/Reels)\n\n`;
    script += `HASHTAGS:\n#funparks #themeparks #${(post.category||'guide').toLowerCase().replace(/\s+/g,'')} `;
    script += `#themepark2025 #rollercoaster #travel #weekendtrip #parklife\n`;

    setCapcut(script);
  };

  const download = () => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `funparks-${(post?.slug||'post').substring(0,25)}.jpg`;
    a.click();
  };

  const copyCapCut = async () => {
    try { await navigator.clipboard.writeText(capcut); }
    catch(e) { const t=document.createElement('textarea');t.value=capcut;document.body.appendChild(t);t.select();document.execCommand('copy');document.body.removeChild(t); }
    setCopied(true);
    setTimeout(()=>setCopied(false),2000);
  };


  const generateSRT = () => {
    if (!post) return '';
    const content = post.content || '';
    const title = post.title || '';
    const paragraphs = content.split('\n\n').filter(p => p.trim());
    const slides = [{ duration: 3, text: title }];
    let slideNum = 2;
    paragraphs.forEach(p => {
      const clean = p.replace(/\*\*/g, '').trim();
      if (!clean || clean.length < 15 || slideNum > 9) return;
      const words = clean.split(' ');
      slides.push({ duration: p.startsWith('**') ? 2 : 4, text: words.slice(0,12).join(' ')+(words.length>12?'...':'') });
      slideNum++;
    });
    slides.push({ duration: 3, text: 'Read more at funparks.app/blog' });
    let srt = '', time = 0;
    slides.forEach((s, i) => {
      const fmt = t => { const h=Math.floor(t/3600).toString().padStart(2,'0'),m=Math.floor((t%3600)/60).toString().padStart(2,'0'),s2=Math.floor(t%60).toString().padStart(2,'0'); return h+':'+m+':'+s2+',000'; };
      srt += (i+1)+'\n'+fmt(time)+' --> '+fmt(time+s.duration)+'\n'+s.text+'\n\n';
      time += s.duration;
    });
    return srt;
  };

  const downloadSRT = () => {
    const srt = generateSRT();
    const blob = new Blob([srt], {type:'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'funparks-'+(post?.slug||'post').substring(0,20)+'.srt';
    a.click(); URL.revokeObjectURL(url);
  };

  if (!post) return null;

  return (
    <div style={{background:'white',borderRadius:'20px',border:'2px solid #f0eeff',overflow:'hidden',marginBottom:'22px'}}>
      <div style={{padding:'14px 22px',background:'linear-gradient(135deg,#fff7f5,#fdf4ff)',borderBottom:'2px solid #f0eeff',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontFamily:'Syne,sans-serif',fontSize:'14px',fontWeight:'800'}}>\uD83C\uDFA8 Social Media Assets</span>
        <span style={{fontSize:'11px',color:'#9ca3af'}}>Instagram card + CapCut script</span>
      </div>
      <div style={{padding:'20px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>
        <div>
          <p style={{fontFamily:'Syne,sans-serif',fontSize:'13px',fontWeight:'800',marginBottom:'10px',color:'#1a1a2e'}}>\uD83D\uDCF8 Instagram / Facebook Card (1080\u00D71080)</p>
          <canvas ref={canvasRef} style={{width:'100%',borderRadius:'12px',border:'1px solid #f0eeff'}} />
          {dataUrl && (
            <button onClick={download}
              style={{width:'100%',marginTop:'10px',padding:'10px',borderRadius:'10px',border:'none',fontFamily:'inherit',fontSize:'13px',fontWeight:'700',cursor:'pointer',background:'linear-gradient(135deg,#FF6B2B,#f43f5e)',color:'white'}}>
              \u2B07\uFE0F Download JPG
            </button>
          )}
          <p style={{fontSize:'11px',color:'#9ca3af',marginTop:'6px',textAlign:'center'}}>Save and post directly to Instagram, Facebook or LinkedIn</p>
        </div>
        <div>
          <p style={{fontFamily:'Syne,sans-serif',fontSize:'13px',fontWeight:'800',marginBottom:'10px',color:'#1a1a2e'}}>\uD83C\uDFAC CapCut Script (TikTok / YouTube Shorts / Reels)</p>
          <textarea value={capcut} readOnly rows={20}
            style={{width:'100%',border:'2px solid #f0eeff',borderRadius:'12px',padding:'12px',fontSize:'11px',fontFamily:'Courier New,monospace',color:'#374151',resize:'vertical',outline:'none',lineHeight:'1.5',background:'#fafafa'}} />
          <button onClick={copyCapCut}
            style={{width:'100%',marginTop:'10px',padding:'10px',borderRadius:'10px',border:'none',fontFamily:'inherit',fontSize:'13px',fontWeight:'700',cursor:'pointer',background:copied?'#059669':'linear-gradient(135deg,#a855f7,#06b6d4)',color:'white'}}>
            {copied ? '\u2705 Copied!' : '\uD83D\uDCCB Copy CapCut Script'}
          </button>
          <button onClick={downloadSRT} style={{width:'100%',marginTop:'8px',padding:'10px',borderRadius:'10px',border:'2px solid #a855f7',fontFamily:'inherit',fontSize:'13px',fontWeight:'700',cursor:'pointer',background:'white',color:'#a855f7'}}>\u2B07\uFE0F Download SRT (CapCut import)</button>
          <p style={{fontSize:'11px',color:'#9ca3af',marginTop:'4px',textAlign:'center'}}>CapCut: Text \u2192 Auto Captions \u2192 Import .srt</p>
          <p style={{fontSize:'11px',color:'#9ca3af',display:'none'}}>Open CapCut \u2192 New Project \u2192 follow the slide instructions above</p>
        </div>
      </div>
    </div>
  );
}
