import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { caption, link } = await req.json();
    if (!caption) return NextResponse.json({ error: "Missing caption" }, { status: 400 });

    const webhookUrl = "https://hook.eu1.make.com/c5kra8d35ftl9w2zu9c4bp2yhulx9jjk";

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ caption, link: link || "https://funparks.app" }),
    });

    if (!res.ok) return NextResponse.json({ error: "Failed to send to Make.com" }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}