
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
      model: 'claude-opus-4-5-20251101',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const data = await res.json();
  // Log for debugging
  if(data.error){
    console.error('Claude API error:',JSON.stringify(data));
    return NextResponse.json({error:'Claude API error: '+data.error.message,details:data},{status:500});
  }
  return NextResponse.json(data);
}
