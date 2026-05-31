import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { category, tone, day, continent, existingTitles } = await req.json();

    const prompt = `You are a theme park content strategist for Funparks app.
Generate 1 fresh blog post topic for the following:
- Day: ${day} (focus: ${continent})
- Category: ${category}
- Tone: ${tone}
- Must NOT be similar to these already used titles: ${existingTitles.join(", ")}

Return ONLY a valid JSON object with no markdown:
{
  "title": "compelling SEO-friendly title under 65 characters",
  "category": "${category}",
  "tone": "${tone}"
}`;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-5",
        max_tokens: 200,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await res.json();
    const text = data.content[0].text.trim();
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return NextResponse.json({ topic: parsed });
  } catch(e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}