import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  if (!code) return new NextResponse("No code provided", { status: 400 });

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.YOUTUBE_CLIENT_ID,
      client_secret: process.env.YOUTUBE_CLIENT_SECRET,
      redirect_uri: "https://funparks.app/api/youtube/callback",
      grant_type: "authorization_code",
    })
  });

  const tokens = await res.json();

  return new NextResponse(`<!DOCTYPE html>
<html>
<head><style>
  body { font-family: sans-serif; background: #050a14; color: white; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
  .card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 40px; max-width: 600px; text-align: center; }
  h1 { color: #FF6B2B; margin-bottom: 16px; }
  .token { background: #0d1929; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 16px; font-family: monospace; font-size: 12px; color: #a5f3fc; word-break: break-all; margin: 16px 0; text-align: left; }
  p { color: rgba(255,255,255,0.6); line-height: 1.6; }
  .step { background: rgba(255,107,43,0.1); border: 1px solid rgba(255,107,43,0.3); border-radius: 10px; padding: 12px 16px; margin: 8px 0; text-align: left; font-size: 14px; }
</style></head>
<body>
<div class="card">
  <h1>YouTube Connected!</h1>
  <p>Copy the refresh token below and add it to Vercel environment variables.</p>
  <div class="token">${tokens.refresh_token || "No refresh token — try connecting again"}</div>
  <div class="step">1. Go to vercel.com → your project → Settings → Environment Variables</div>
  <div class="step">2. Add: <strong>YOUTUBE_REFRESH_TOKEN</strong> = the token above</div>
  <div class="step">3. Redeploy the project</div>
  <div class="step">4. Come back to the agent and upload your first video!</div>
</div>
</body>
</html>`, { headers: { "Content-Type": "text/html" } });
}