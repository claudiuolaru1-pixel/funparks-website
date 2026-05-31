import { NextResponse } from "next/server";

async function getAccessToken() {
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
  return data.access_token;
}

export async function POST(req) {
  try {
    const { title, description } = await req.json();
    if (!process.env.YOUTUBE_REFRESH_TOKEN) return NextResponse.json({ error: "YouTube not connected" }, { status: 400 });
    const accessToken = await getAccessToken();
    const metadata = {
      snippet: {
        title: (title || "Funparks Theme Park Guide").slice(0, 100),
        description: description || "Download Funparks free at funparks.app",
        tags: ["funparks","themeparks","themepark","rollercoaster","shorts","travel"],
        categoryId: "17"
      },
      status: { privacyStatus: "public", selfDeclaredMadeForKids: false }
    };
    const initRes = await fetch("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
        "X-Upload-Content-Type": "video/*",
      },
      body: JSON.stringify(metadata)
    });
    const uploadUrl = initRes.headers.get("location");
    if (!uploadUrl) {
      const err = await initRes.text();
      return NextResponse.json({ error: "Failed to get upload URL: " + err.slice(0, 200) }, { status: 500 });
    }
    return NextResponse.json({ uploadUrl });
  } catch(e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}