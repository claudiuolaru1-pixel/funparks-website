const fs=require('fs');
const route=`import { NextResponse } from 'next/server';

function extractField(text, fieldName) {
  const regex = new RegExp('"' + fieldName + '"\\\\s*:\\\\s*"((?:[^"\\\\\\\\]|\\\\\\\\[\\\\s\\\\S])*)"', 's');
  const match = text.match(regex);
  if (!match) return '';
  return match[1].replace(/\\\\n/g,'\\n').replace(/\\\\t/g,'\\t').replace(/\\\\"/g,'"').replace(/\\\\\\\\/g,'\\\\');
}

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    const data = await res.json();
    if (data.error) return NextResponse.json({error:'API error: '+JSON.stringify(data.error)},{status:500});
    if (!data.content||!data.content.length) return NextResponse.json({error:'Empty response'},{status:500});
    const text = data.content.map(b=>b.text||'').join('');
    const first = text.indexOf('{');
    const last = text.lastIndexOf('}');
    if (first===-1) return NextResponse.json({error:'No JSON found',preview:text.substring(0,200)},{status:500});
    const raw = text.substring(first,last+1);
    try {
      const parsed = JSON.parse(raw);
      return NextResponse.json({success:true,parsed});
    } catch(e1) {
      const blog = {
        title: extractField(raw,'title'),
        excerpt: extractField(raw,'excerpt'),
        readTime: extractField(raw,'readTime')||'5 min',
        content: extractField(raw,'content'),
      };
      const instagram = extractField(raw,'instagram');
      const tiktok = extractField(raw,'tiktok');
      const youtube = extractField(raw,'youtube');
      const facebook = extractField(raw,'facebook');
      let hashtags=[];
      try {
        const hi=raw.indexOf('"hashtags"');
        if(hi!==-1){const as=raw.indexOf('[',hi),ae=raw.indexOf(']',as);if(as!==-1&&ae!==-1)hashtags=JSON.parse(raw.substring(as,ae+1));}
      } catch{}
      if (!blog.title) return NextResponse.json({error:'Could not extract content. Preview: '+raw.substring(0,200)},{status:500});
      return NextResponse.json({success:true,parsed:{blog,instagram,tiktok,youtube,facebook,hashtags}});
    }
  } catch(e) {
    return NextResponse.json({error:'Server error: '+e.message},{status:500});
  }
}
`;
fs.writeFileSync('app/api/generate/route.js',route,'utf8');
console.log('Written:',fs.readFileSync('app/api/generate/route.js','utf8').length,'bytes');