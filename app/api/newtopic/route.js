import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { category, tone, day, continent, focus, existingTitles } = await req.json();
    const theme = focus || continent || "";
    const used = Array.isArray(existingTitles) ? existingTitles : [];

    const prompt =
      "You are a theme park content strategist for Funparks app.\n" +
      "Generate 1 fresh blog post topic for the following:\n" +
      "- Publishing day: " + day + "\n" +
      "- Theme / region focus: " + theme + "\n" +
      "- Category: " + category + "\n" +
      "- Tone: " + tone + "\n" +
      "- Must NOT be similar to any of these already used or queued titles: " + used.join(", ") + "\n\n" +
      "Return ONLY a valid JSON object with no markdown:\n" +
      "{\n" +
      "  \"title\": \"compelling SEO-friendly title under 65 characters\",\n" +
      "  \"category\": \"" + category + "\",\n" +
      "  \"tone\": \"" + tone + "\"\n" +
      "}";

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

    // Every topic carries its own theme, so a replacement stays in the same theme.
    return NextResponse.json({
      topic: {
        title: parsed.title,
        category: parsed.category || category,
        tone: parsed.tone || tone,
        focus: theme,
      }
    });
  } catch(e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
