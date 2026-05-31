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
    const formData = await req.formData();
    const video = formData.get("video");
    const title = formData.get("title") || "Funparks Theme Park Guide";
    const description = formData.get("description") || "";
    const tags = (formData.get("tags") || "themeparks,funparks,rollercoaster").split(",");

    if (!video) return NextResponse.json({ error: "No video file" }, { status: 400 });
    if (!process.env.YOUTUBE_REFRESH_TOKEN) return NextResponse.json({ error: "YouTube not connected" }, { status: 400 });

    const accessToken = await getAccessToken();
    const videoBuffer = await video.arrayBuffer();

    const metadata = {
      snippet: {
        title: title.slice(0, 100),
        description: `${description}\n\nDownload Funparks free: https://funparks.app\n\n${tags.map(t => "#" + t.trim()).join(" ")}`,
        tags: [...tags, "funparks", "themeparks", "themepark", "shorts"],
        categoryId: "17",
      },
      status: { privacyStatus: "public", selfDeclaredMadeForKids: false }
    };

    const boundary = "funparks_boundary_" + Date.now();
    const metaStr = JSON.stringify(metadata);
    const bodyParts = [
      `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metaStr}\r\n`,
      `--${boundary}\r\nContent-Type: ${video.type || "video/mp4"}\r\n\r\n`,
    ];

    const encoder = new TextEncoder();
    const part1 = encoder.encode(bodyParts[0]);
    const part2 = encoder.encode(bodyParts[1]);
    const part3 = new Uint8Array(videoBuffer);
    const part4 = encoder.encode(`\r\n--${boundary}--`);

    const totalLength = part1.length + part2.length + part3.length + part4.length;
    const combined = new Uint8Array(totalLength);
    let offset = 0;
    [part1, part2, part3, part4].forEach(p => { combined.set(p, offset); offset += p.length; });

    const uploadRes = await fetch("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=multipart&part=snippet,status", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": `multipart/related; boundary=${boundary}`,
        "Content-Length": totalLength.toString(),
      },
      body: combined,
    });

    const result = await uploadRes.json();
    if (result.id) {
      return NextResponse.json({ success: true, videoId: result.id, url: `https://youtube.com/shorts/${result.id}` });
    } else {
      return NextResponse.json({ error: result.error?.message || "Upload failed" }, { status: 500 });
    }
  } catch(e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}