
import { NextResponse } from 'next/server';

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
    return NextResponse.json({error:'API error: '+JSON.stringify(data.error),raw:data},{status:500});
  }
  if(!data.content||!data.content.length){
    return NextResponse.json({error:'Empty response. Type: '+data.type+' Keys: '+Object.keys(data).join(','),raw:data},{status:500});
  }
  return NextResponse.json(data);
}
