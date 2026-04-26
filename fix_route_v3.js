const fs=require('fs');
let c=fs.readFileSync('app/api/generate/route.js','utf8');
if(c.charCodeAt(0)===0xFEFF)c=c.slice(1);

const newRoute=`import { NextResponse } from 'next/server';
export async function POST(req) {
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
  if(data.error){
    return NextResponse.json({error:'API error: '+JSON.stringify(data.error)},{status:500});
  }
  if(!data.content||!data.content.length){
    return NextResponse.json({error:'Empty response'},{status:500});
  }
  // Extract and validate JSON from Claude response server-side
  const text = data.content.map(b=>b.text||'').join('');
  const first = text.indexOf('{');
  const last = text.lastIndexOf('}');
  if(first===-1||last===-1){
    return NextResponse.json({error:'No JSON found in response',preview:text.substring(0,200)},{status:500});
  }
  const jsonStr = text.substring(first, last+1);
  try {
    const parsed = JSON.parse(jsonStr);
    // Return the parsed object directly - no re-parsing needed on client
    return NextResponse.json({success:true, parsed});
  } catch(e) {
    // Try to fix common issues
    try {
      const fixed = jsonStr
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,'')
        .replace(/\t/g,' ');
      const parsed = JSON.parse(fixed);
      return NextResponse.json({success:true, parsed});
    } catch(e2) {
      return NextResponse.json({error:'JSON parse failed: '+e2.message,preview:jsonStr.substring(0,300)},{status:500});
    }
  }
}
`;

fs.writeFileSync('app/api/generate/route.js',newRoute,'utf8');
console.log('Route rewritten - parses JSON server-side');