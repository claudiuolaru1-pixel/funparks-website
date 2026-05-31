import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (!process.env.YOUTUBE_REFRESH_TOKEN) {
      return NextResponse.json({ error: "YouTube not connected" }, { status: 400 });
    }
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.YOUTUBE_CLIENT_ID,
        client_secret: process.env.YOUTUBE_CLIENT_SECRET,
        refresh_token: process.env.YOUTUBE_REFRESH_TOKEN,
        grant_type: "refresh_token",
      })
    });
    const data = await res.json();
    if (!data.access_token) return NextResponse.json({ error: "Failed to get token" }, { status: 500 });
    return NextResponse.json({ access_token: data.access_token });
  } catch(e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}