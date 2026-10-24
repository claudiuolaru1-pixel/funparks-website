import { NextResponse } from "next/server";

// Step 1 of connecting TikTok: sends you to TikTok's login and permission screen.
export async function GET() {
  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  if (!clientKey) return new NextResponse("TIKTOK_CLIENT_KEY is not set in Vercel", { status: 500 });
  const redirectUri = "https://funparks.app/api/tiktok/callback";
  const scope = "user.info.basic,video.upload";
  const state = Math.random().toString(36).slice(2);
  const authUrl =
    "https://www.tiktok.com/v2/auth/authorize/?client_key=" + encodeURIComponent(clientKey) +
    "&scope=" + encodeURIComponent(scope) +
    "&response_type=code&redirect_uri=" + encodeURIComponent(redirectUri) +
    "&state=" + state;
  return NextResponse.redirect(authUrl);
}
