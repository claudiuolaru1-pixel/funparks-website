'use client';
import { useEffect, useRef, useState } from 'react';

export default function ImageCard({ post, category }) {
  const canvasRef = useRef(null);
  const [dataUrl, setDataUrl] = useState('');
  const [capcut, setCapcut] = useState('');

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

    // Decorative circles
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = '#FF6B2B';
    ctx.beginPath();
    ctx.arc(W * 0.85, H * 0.15, 280, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#a855f7';
    ctx.beginPath();
    ctx.arc(W * 0.1, H * 0.85, 220, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Top accent line
    const lineGrad = ctx.createLinearGradient(60, 0, W - 60, 0);
    lineGrad.addColorStop(0, '#FF6B2B');
    lineGrad.addColorStop(0.5, '#f43f5e');
    lineGrad.addColorStop(1, '#a855f7');
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(60, 80);
    ctx.lineTo(W - 60, 80);
    ctx.stroke();

    // Logo / branding
    ctx.fillStyle = 'white';
    ctx.font = 'bold 42px Arial';
    ctx.fillText('fun', 60, 140);
    ctx.fillStyle = '#FF6B2B';
    ctx.fillText('parks', 60 + ctx.measureText('fun').width, 140);

    // Category badge
    const cat = category || 'Park Guide';
    ctx.fillStyle = 'rgba(255,107,43,0.2)';
    const badgeW = ctx.measureText(cat.toUpperCase()).width + 40;
    roundRect(ctx, W - 60 - badgeW, 108, badgeW, 38, 19);
    ctx.fillStyle = '#FF6B2B';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(cat.toUpperCase(), W - 60 - 20, 133);
    ctx.textAlign = 'left';

    // Title
    ctx.fillStyle = 'white';
    ctx.font = 'bold 62px Arial';
    const title = post.title || '';
    wrapText(ctx, title, 60, 260, W - 120, 76);

    // Divider
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    const titleLines = getWrappedLines(ctx, title, W - 120, 'bold 62px Arial');
    const titleBottom = 260 + titleLines.length * 76 + 20;
    ctx.moveTo(60, titleBottom);
    ctx.lineTo(W - 60, titleBottom);
    ctx.stroke();

    // Excerpt / key points
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = '32px Arial';
    const excerpt = post.excerpt || '';
    wrapText(ctx, excerpt, 60, titleBottom + 50, W - 120, 46, 3);

    // Key highlights from content
    const content = post.content || '';
    const boldMatches = content.match(/\*\*([^*]+)\*\*/g) || [];
    const highlights = boldMatches.slice(0, 3).map(m => m.replace(/\*\*/g, ''));

    if (highlights.length > 0) {
      let yPos = titleBottom + 50 + 46 * 3 + 40;
      highlights.forEach(h => {
        // Bullet dot
        const dotGrad = ctx.createRadialGradient(72, yPos - 8, 0, 72, yPos - 8, 8);
        dotGrad.addColorStop(0, '#FF6B2B');
        dotGrad.addColorStop(1, '#f43f5e');
        ctx.fillStyle = dotGrad;
        ctx.beginPath();
        ctx.arc(72, yPos - 8, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.font = 'bold 28px Arial';
        const shortH = h.length > 45 ? h.substring(0, 45) + '...' : h;
        ctx.fillText(shortH, 96, yPos);
        yPos += 52;
      });
    }

    // Bottom bar
    const barGrad = ctx.createLinearGradient(0, H - 100, W, H - 100);
    barGrad.addColorStop(0, '#FF6B2B');
    barGrad.addColorStop(0.5, '#f43f5e');
    barGrad.addColorStop(1, '#a855f7');
    ctx.fillStyle = barGrad;
    ctx.fillRect(0, H - 100, W, 100);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('funparks.app', W / 2, H - 52);
    ctx.font = '22px Arial';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillText('Free theme park app • 64 parks worldwide', W / 2, H - 22);
    ctx.textAlign = 'left';

    setDataUrl(canvas.toDataURL('image/jpeg', 0.95));
  };

  const generateCapCut = () => {
    if (!post) return;
    const content = post.content || '';
    const title = post.title || '';

    // Extract sections from bold headings
    const sections = content.split(/\*\*([^*]+)\*\*/g).filter(s => s.trim());

    let script = `CAPCUT SCRIPT — ${title}\n`;
    script += `${'='.repeat(50)}\n\n`;
    script += `RECOMMENDED SETTINGS:\n`;
    script += `• Duration: 45-60 seconds\n`;
    script += `• Music: Chill/Lo-fi (search "theme park chill" in CapCut)\n`;
    script += `• Background: Dark gradient or theme park photo\n`;
    script += `• Font: Bold white text, center aligned\n\n`;
    script += `${'─'.repeat(50)}\n\n`;
    script += `SLIDE 1 (3 sec) — HOOK\n`;
    script += `"${title}"\n\n`;

    // Parse content into slides
    const lines = content.split('\n').filter(l => l.trim());
    let slideNum = 2;
    let currentSection = '';

    lines.forEach(line => {
      const clean = line.replace(/\*\*/g, '').trim();
      if (!clean) return;

      if (line.startsWith('**') && line.endsWith('**')) {
        // Section header
        currentSection = clean;
        script += `SLIDE ${slideNum} (2 sec) — SECTION TITLE\n`;
        script += `"${clean}"\n\n`;
        slideNum++;
      } else if (clean.length > 20 && slideNum <= 8) {
        // Content slide - max 15 words
        const words = clean.split(' ');
        const short = words.slice(0, 15).join(' ') + (words.length > 15 ? '...' : '');
        script += `SLIDE ${slideNum} (4 sec)\n`;
        script += `"${short}"\n\n`;
        slideNum++;
      }
    });

    script += `SLIDE ${slideNum} (3 sec) — CALL TO ACTION\n`;
    script += `"Read the full guide at funparks.app/blog"\n\n`;
    script += `${'─'.repeat(50)}\n`;
    script += `HASHTAGS FOR CAPTION:\n`;
    script += `#funparks #themeparks #${(post.category||'parkguide').toLowerCase().replace(/\s+/g,'')} #themepark2025 #rollercoaster #travel\n`;

    setCapcut(script);
  };

  // Canvas helper functions
  function wrapText(ctx, text, x, y, maxW, lineH, maxLines = 10) {
    const lines = getWrappedLines(ctx, text, maxW, ctx.font);
    lines.slice(0, maxLines).forEach((line, i) => {
      ctx.fillText(line, x, y + i * lineH);
    });
  }

  function getWrappedLines(ctx, text, maxW, font) {
    const savedFont = ctx.font;
    if (font) ctx.font = font;
    const words = text.split(' ');
    const lines = [];
    let current = '';
    words.forEach(word => {
      const test = current ? current + ' ' + word : word;
      if (ctx.measureText(test).width > maxW) {
        if (current) lines.push(current);
        current = word;
      } else {
        current = test;
      }
    });
    if (current) lines.push(current);
    ctx.font = savedFont;
    return lines;
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
    ctx.fill();
  }

  const download = () => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `funparks-${(post?.slug||'post').substring(0,20)}.jpg`;
    a.click();
  };

  const copyCapCut = async () => {
    try { await navigator.clipboard.writeText(capcut); }
    catch(e) { const t=document.createElement('textarea');t.value=capcut;document.body.appendChild(t);t.select();document.execCommand('copy');document.body.removeChild(t); }
    alert('CapCut script copied!');
  };

  if (!post) return null;

  return (
    <div style={{background:'white',borderRadius:'20px',border:'2px solid #f0eeff',overflow:'hidden',marginBottom:'22px'}}>
      <div style={{padding:'14px 22px',background:'linear-gradient(135deg,#fff7f5,#fdf4ff)',borderBottom:'2px solid #f0eeff',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontFamily:'Syne,sans-serif',fontSize:'14px',fontWeight:'800'}}>🎨 Social Media Assets</span>
        <span style={{fontSize:'11px',color:'#9ca3af'}}>Instagram 1080×1080 + CapCut Script</span>
      </div>
      <div style={{padding:'20px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>
        {/* Image card */}
        <div>
          <p style={{fontFamily:'Syne,sans-serif',fontSize:'13px',fontWeight:'800',marginBottom:'10px',color:'#1a1a2e'}}>📸 Image Card (Instagram/Facebook)</p>
          <canvas ref={canvasRef} style={{width:'100%',borderRadius:'12px',border:'1px solid #f0eeff'}} />
          {dataUrl && (
            <button onClick={download}
              style={{width:'100%',marginTop:'10px',padding:'10px',borderRadius:'10px',border:'none',fontFamily:'inherit',fontSize:'13px',fontWeight:'700',cursor:'pointer',background:'linear-gradient(135deg,#FF6B2B,#f43f5e)',color:'white'}}>
              ⬇️ Download JPG
            </button>
          )}
        </div>
        {/* CapCut script */}
        <div>
          <p style={{fontFamily:'Syne,sans-serif',fontSize:'13px',fontWeight:'800',marginBottom:'10px',color:'#1a1a2e'}}>🎬 CapCut Script (TikTok/YouTube/Reels)</p>
          <textarea value={capcut} readOnly rows={18}
            style={{width:'100%',border:'2px solid #f0eeff',borderRadius:'12px',padding:'12px',fontSize:'11px',fontFamily:'Courier New,monospace',color:'#374151',resize:'vertical',outline:'none',lineHeight:'1.5',background:'#fafafa'}} />
          <button onClick={copyCapCut}
            style={{width:'100%',marginTop:'10px',padding:'10px',borderRadius:'10px',border:'none',fontFamily:'inherit',fontSize:'13px',fontWeight:'700',cursor:'pointer',background:'linear-gradient(135deg,#a855f7,#06b6d4)',color:'white'}}>
            📋 Copy CapCut Script
          </button>
        </div>
      </div>
    </div>
  );
}
