import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { title, excerpt, content } = await req.json();

    const points = content
      .split("\n")
      .filter(l => l.trim().startsWith("**") || l.trim().startsWith("##") || l.trim().startsWith("- "))
      .map(l => l.replace(/\*\*/g, "").replace(/^##+ /, "").replace(/^- /, "").trim())
      .filter(l => l.length > 10 && l.length < 120)
      .slice(0, 6);

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1080px; height: 1920px;
    background: #050a14;
    font-family: Georgia, serif;
    overflow: hidden;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
  }
  .bg-blob1 {
    position: absolute; top: -10%; left: -10%;
    width: 700px; height: 700px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,107,43,0.2), rgba(244,63,94,0.1), transparent);
    filter: blur(80px); animation: blob1 8s ease-in-out infinite;
  }
  .bg-blob2 {
    position: absolute; bottom: -10%; right: -10%;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(168,85,247,0.2), rgba(6,182,212,0.1), transparent);
    filter: blur(70px); animation: blob2 10s ease-in-out infinite;
  }
  .grid {
    position: absolute; inset: 0;
    background-image: radial-gradient(rgba(168,85,247,0.3) 1px, transparent 1px);
    background-size: 50px 50px; opacity: 0.1;
  }
  .content {
    position: relative; z-index: 10;
    width: 900px; text-align: center;
    padding: 60px;
  }
  .logo {
    font-size: 52px; font-weight: 900; font-style: italic;
    background: linear-gradient(135deg, #FF6B2B, #f43f5e, #a855f7);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    margin-bottom: 20px; letter-spacing: 2px;
    animation: fadeIn 0.8s ease both;
  }
  .tagline {
    font-size: 26px; color: rgba(255,255,255,0.4);
    letter-spacing: 6px; text-transform: uppercase;
    margin-bottom: 60px;
    animation: fadeIn 0.8s 0.3s ease both;
  }
  .divider {
    width: 200px; height: 4px; border-radius: 2px; margin: 0 auto 60px;
    background: linear-gradient(135deg, #FF6B2B, #f43f5e, #a855f7);
    animation: fadeIn 0.8s 0.5s ease both;
  }
  .title {
    font-size: 52px; font-weight: 900; color: #f0f4ff;
    line-height: 1.2; margin-bottom: 50px;
    animation: slideUp 0.8s 0.7s ease both;
  }
  .point {
    display: flex; align-items: flex-start; gap: 20px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px; padding: 28px 32px;
    margin-bottom: 20px; text-align: left;
    opacity: 0; transform: translateX(-30px);
  }
  .point-dot {
    width: 14px; height: 14px; border-radius: 50%;
    flex-shrink: 0; margin-top: 8px;
  }
  .point-text {
    font-size: 28px; color: rgba(255,255,255,0.85);
    line-height: 1.5; font-style: italic;
  }
  .cta {
    margin-top: 50px; font-size: 36px; font-weight: 900;
    color: #f0f4ff; opacity: 0;
  }
  .cta span {
    background: linear-gradient(135deg, #FF6B2B, #f43f5e, #a855f7);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .url {
    margin-top: 20px; font-size: 28px;
    color: rgba(255,255,255,0.4); letter-spacing: 3px; opacity: 0;
  }
  @keyframes blob1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-20px)} }
  @keyframes blob2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-25px,15px)} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes slideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideInPoint { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
</style>
</head>
<body>
<div class="bg-blob1"></div>
<div class="bg-blob2"></div>
<div class="grid"></div>
<div class="content">
  <div class="logo">funparks</div>
  <div class="tagline">Theme Park Guide</div>
  <div class="divider"></div>
  <div class="title">${title}</div>
  <div id="points">
    ${points.map((p, i) => {
      const colors = ["#FF6B2B","#f43f5e","#a855f7","#06b6d4","#10b981","#f59e0b"];
      return `<div class="point" id="p${i}">
        <div class="point-dot" style="background:${colors[i % colors.length]}"></div>
        <div class="point-text">${p}</div>
      </div>`;
    }).join("")}
  </div>
  <div class="cta" id="cta">Download <span>Funparks</span> — Free</div>
  <div class="url" id="url">funparks.app</div>
</div>
<script>
  const delays = [1200, 2000, 2800, 3600, 4400, 5200];
  ${points.map((_, i) => `
  setTimeout(() => {
    const el = document.getElementById("p${i}");
    el.style.animation = "slideInPoint 0.6s ease forwards";
  }, delays[${i}]);`).join("")}
  setTimeout(() => {
    document.getElementById("cta").style.animation = "fadeIn 0.8s ease forwards";
  }, ${1200 + points.length * 800});
  setTimeout(() => {
    document.getElementById("url").style.animation = "fadeIn 0.8s ease forwards";
  }, ${1600 + points.length * 800});
</script>
</body>
</html>`;

    return new NextResponse(html, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}