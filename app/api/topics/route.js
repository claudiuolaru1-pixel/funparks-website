import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const owner = "claudiuolaru1-pixel";
const repo = "funparks-website";
const filePath = "public/topics.json";

async function getFile() {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github.v3+json", "User-Agent": "funparks-agent" }
  });
  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf8");
  return { topics: JSON.parse(content), sha: data.sha };
}

export async function GET() {
  try {
    const { topics } = await getFile();
    return NextResponse.json({ topics });
  } catch(e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { day, topicIndex, newTopic } = await req.json();
    const { topics, sha } = await getFile();

    topics[day].topics[topicIndex] = newTopic;

    const encoded = Buffer.from(JSON.stringify(topics, null, 2)).toString("base64");
    const updateRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github.v3+json", "User-Agent": "funparks-agent", "Content-Type": "application/json" },
      body: JSON.stringify({ message: `Replace used topic: ${day}`, content: encoded, sha })
    });

    if (!updateRes.ok) {
      const err = await updateRes.json();
      return NextResponse.json({ error: err.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, topics });
  } catch(e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}