import { NextResponse } from 'next/server';

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

    if (data.error) {
      return NextResponse.json({ error: 'API error: ' + JSON.stringify(data.error) }, { status: 500 });
    }

    if (!data.content || !data.content.length) {
      return NextResponse.json({ error: 'Empty response from Claude' }, { status: 500 });
    }

    const text = data.content.map(b => b.text || '').join('');
    
    // Find JSON boundaries
    const first = text.indexOf('{');
    const last = text.lastIndexOf('}');
    
    if (first === -1 || last === -1) {
      return NextResponse.json({ error: 'No JSON found', preview: text.substring(0, 200) }, { status: 500 });
    }

    const raw = text.substring(first, last + 1);

    // Try parsing with progressively more aggressive fixes
    const attempts = [
      // Attempt 1: as-is
      () => JSON.parse(raw),
      // Attempt 2: escape unescaped newlines within strings
      () => {
        let fixed = '';
        let inString = false;
        let escape = false;
        for (let i = 0; i < raw.length; i++) {
          const ch = raw[i];
          if (escape) { fixed += ch; escape = false; continue; }
          if (ch === '\\') { fixed += ch; escape = true; continue; }
          if (ch === '"') { inString = !inString; fixed += ch; continue; }
          if (inString && ch === '\n') { fixed += '\\n'; continue; }
          if (inString && ch === '\r') { fixed += '\\r'; continue; }
          if (inString && ch === '\t') { fixed += '\\t'; continue; }
          fixed += ch;
        }
        return JSON.parse(fixed);
      },
      // Attempt 3: strip control chars
      () => JSON.parse(raw.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')),
    ];

    for (let i = 0; i < attempts.length; i++) {
      try {
        const parsed = attempts[i]();
        return NextResponse.json({ success: true, parsed });
      } catch (e) {
        if (i === attempts.length - 1) {
          return NextResponse.json({ 
            error: 'JSON parse failed after all attempts: ' + e.message,
            preview: raw.substring(0, 300)
          }, { status: 500 });
        }
      }
    }
  } catch (e) {
    return NextResponse.json({ error: 'Server error: ' + e.message }, { status: 500 });
  }
}
