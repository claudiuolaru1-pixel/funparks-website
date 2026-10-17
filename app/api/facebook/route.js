import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { caption, link } = await req.json();
    if (!caption) return NextResponse.json({ error: "Missing caption" }, { status: 400 });

    const webhookUrl = process.env.MAKE_FB_WEBHOOK;
    if (!webhookUrl) return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });

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