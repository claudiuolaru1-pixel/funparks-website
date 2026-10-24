import { NextResponse } from "next/server";

const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Step 2: TikTok sends you back here with a one-time code. We swap it for the tokens
// and show them to you once, so you can store them safely in Firebase.
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error_description") || searchParams.get("error");
  if (error) return new NextResponse("TikTok said: " + error, { status: 400 });
  if (!code) return new NextResponse("No code provided", { status: 400 });

  const res = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_key: process.env.TIKTOK_CLIENT_KEY,
      client_secret: process.env.TIKTOK_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: "https://funparks.app/api/tiktok/callback",
    }),
  });
  const t = await res.json();
  const ok = t && t.refresh_token;

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="robots" content="noindex">
<style>
  body{font-family:sans-serif;background:#050a14;color:white;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
  .card{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:40px;max-width:640px;text-align:center}
  h1{color:#69C9D0;margin-bottom:16px}
  .token{background:#0d1929;border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:16px;font-family:monospace;font-size:12px;color:#a5f3fc;word-break:break-all;margin:8px 0 16px;text-align:left}
  p{color:rgba(255,255,255,0.6);line-height:1.6} .label{text-align:left;font-size:12px;color:#9ca3af;margin-top:12px}
</style></head><body><div class="card">
${ok
  ? `<h1>TikTok connected</h1>
  <p>Copy the refresh token below and save it as a Firebase secret named <b>TIKTOK_REFRESH_TOKEN</b>. Do not share it with anyone.</p>
  <div class="label">Refresh token</div><div class="token">${esc(t.refresh_token)}</div>
  <div class="label">Open ID (for your information)</div><div class="token">${esc(t.open_id)}</div>
  <div class="label">Permissions granted</div><div class="token">${esc(t.scope)}</div>
  <p>This page will not show the token again. You can close it after copying.</p>`
  : `<h1>Something went wrong</h1><div class="token">${esc(JSON.stringify(t))}</div>
  <p>Go back to /api/tiktok and try again, then tell Claude what this box says.</p>`}
</div></body></html>`;
  return new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
}
