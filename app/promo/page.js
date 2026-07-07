import Link from "next/link";

export const metadata = {
  title: "Funparks - Free Theme Park App",
  description: "Live wait times, AI assistant, My Day planner for 60+ theme parks worldwide. Free on iOS and Android.",
  openGraph: {
    title: "Funparks - Free Theme Park App",
    description: "Live wait times, AI assistant, My Day planner for 60+ theme parks worldwide. Free on iOS and Android.",
    images: [{ url: "https://funparks.app/screenshots/funparks_social.jpg", width: 1080, height: 1080, alt: "Funparks Theme Park App" }],
    type: "website",
    url: "https://funparks.app/promo",
  },
  twitter: { card: "summary_large_image", title: "Funparks - Free Theme Park App", description: "Live wait times, AI assistant, My Day planner for 60+ theme parks worldwide." },
};

const APP_STORE = "https://apps.apple.com/app/funparks-theme-park-guide/id6763944775";
const PLAY_STORE = "https://play.google.com/store/apps/details?id=com.funparks.app";

const features = [
  { icon: "⚡", title: "Live Wait Times", desc: "See real-time queue times before you leave the hotel.", screenshot: "/screenshots/live_wait_time.jpg", color: "#FF6B2B" },
  { icon: "🤖", title: "AI Park Assistant", desc: "Ask anything. Get instant personalized recommendations.", screenshot: "/screenshots/ai_park_assistant.jpg", color: "#a855f7" },
  { icon: "☀️", title: "My Day Planner", desc: "Build your perfect park day, attraction by attraction.", screenshot: "/screenshots/my_day_planner.jpg", color: "#f59e0b" },
];

const stats = [
  { v: "60+", l: "Parks Worldwide", color: "#FF6B2B" },
  { v: "1,000+", l: "Attractions", color: "#f43f5e" },
  { v: "10", l: "Languages", color: "#a855f7" },
  { v: "Free", l: "Forever", color: "#10b981" },
];

function DownloadButtons({ size = "lg" }) {
  const pad = size === "lg" ? "14px 28px" : "10px 20px";
  const fs = size === "lg" ? 18 : 14;
  const iconSize = size === "lg" ? 32 : 22;
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
      <a href={APP_STORE} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: pad, borderRadius: 16, background: "#000", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", textDecoration: "none", transition: "transform 0.2s" }}>
        <span style={{ fontSize: iconSize }}>🍎</span>
        <div>
          <div style={{ fontSize: 10, opacity: 0.6, letterSpacing: 0.5, textTransform: "uppercase" }}>Download on the</div>
          <div style={{ fontSize: fs, fontWeight: 800, fontFamily: "Syne,sans-serif" }}>App Store</div>
        </div>
      </a>
      <a href={PLAY_STORE} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: pad, borderRadius: 16, background: "#000", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", textDecoration: "none", transition: "transform 0.2s" }}>
        <span style={{ fontSize: iconSize }}>▶️</span>
        <div>
          <div style={{ fontSize: 10, opacity: 0.6, letterSpacing: 0.5, textTransform: "uppercase" }}>Get it on</div>
          <div style={{ fontSize: fs, fontWeight: 800, fontFamily: "Syne,sans-serif" }}>Google Play</div>
        </div>
      </a>
    </div>
  );
}

export default function PromoPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#050a14", fontFamily: "Plus Jakarta Sans, sans-serif", color: "#e2e8f0" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Hero */}
      <div style={{ position: "relative", overflow: "hidden", padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,43,0.2), transparent)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.2), transparent)", filter: "blur(70px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(168,85,247,0.3) 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.1, pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", fontSize: 13, fontWeight: 700, marginBottom: 28, color: "rgba(255,255,255,0.8)" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulse 2s infinite" }} />
            Free App · iOS & Android
          </div>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(36px, 7vw, 68px)", fontWeight: 900, lineHeight: 1.05, margin: "0 0 20px", color: "#f0f4ff" }}>
            Your Theme Park<br />
            <span style={{ background: "linear-gradient(135deg, #FF6B2B, #f43f5e, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Companion
            </span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 36px" }}>
            Live wait times, AI park assistant and My Day planner for 60+ theme parks worldwide. Plan smarter. Wait less. Enjoy more.
          </p>
          <DownloadButtons size="lg" />
          <p style={{ marginTop: 16, fontSize: 13, color: "rgba(255,255,255,0.25)" }}>Free forever · No subscription · No ads</p>
        </div>

        {/* Phone mockup */}
        <div style={{ position: "relative", maxWidth: 260, margin: "48px auto 0", display: "flex", justifyContent: "center" }}>
          <div style={{ position: "absolute", inset: -40, background: "radial-gradient(circle, rgba(168,85,247,0.3), transparent)", borderRadius: "50%", filter: "blur(40px)" }} />
          <div style={{ position: "relative", width: 220, height: 440, background: "#0d1929", borderRadius: 36, border: "2px solid rgba(255,255,255,0.1)", padding: 7, boxShadow: "0 0 60px rgba(168,85,247,0.3), 0 40px 80px rgba(0,0,0,0.6)" }}>
            <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 50, height: 6, background: "#000", borderRadius: 3, zIndex: 10 }} />
            <div style={{ borderRadius: 30, overflow: "hidden", height: "100%" }}>
              <img src="/screenshots/start_page.jpg" alt="Funparks app" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: "40px 24px", background: "#080f1e" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "20px 12px", borderRadius: 16, background: "rgba(255,255,255,0.04)", border: `1px solid ${s.color}30` }}>
              <div style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, fontFamily: "Syne, sans-serif", color: s.color, textShadow: `0 0 20px ${s.color}60` }}>{s.v}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 4, fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: "60px 24px", maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 900, textAlign: "center", marginBottom: 48, color: "#f0f4ff" }}>
          Everything you need for the{" "}
          <span style={{ background: "linear-gradient(135deg,#FF6B2B,#f43f5e,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            perfect park day
          </span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {features.map((f, i) => (
            <div key={i} style={{ display: "flex", flexDirection: i % 2 !== 0 ? "row-reverse" : "row", alignItems: "center", gap: 40, flexWrap: "wrap", justifyContent: "center" }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div style={{ position: "absolute", inset: -20, background: `radial-gradient(circle, ${f.color}25, transparent)`, borderRadius: "50%", filter: "blur(20px)" }} />
                <div style={{ position: "relative", width: 160, height: 300, background: "#0d1929", borderRadius: 28, border: "2px solid rgba(255,255,255,0.1)", padding: 6, boxShadow: `0 0 40px ${f.color}25, 0 20px 50px rgba(0,0,0,0.5)`, transform: i % 2 !== 0 ? "rotate(2deg)" : "rotate(-2deg)" }}>
                  <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 35, height: 5, background: "#000", borderRadius: 3, zIndex: 10 }} />
                  <div style={{ borderRadius: 23, overflow: "hidden", height: "100%" }}>
                    <img src={f.screenshot} alt={f.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                  </div>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 240, textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 26, fontWeight: 900, color: "#f0f4ff", marginBottom: 12 }}>{f.title}</h3>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 320, margin: "0 auto" }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog CTA */}
      <div style={{ padding: "40px 24px", background: "#080f1e" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", padding: "40px 32px", borderRadius: 24, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📖</div>
          <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 900, color: "#f0f4ff", marginBottom: 10 }}>Theme Park Tips & Guides</h3>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, marginBottom: 24, lineHeight: 1.7 }}>Insider guides, ride reviews, park comparisons and travel tips from the Funparks team.</p>
          <a href="https://funparks.app/blog" style={{ display: "inline-block", padding: "12px 28px", borderRadius: 14, background: "linear-gradient(135deg, #FF6B2B, #f43f5e, #a855f7)", color: "#fff", fontWeight: 800, fontSize: 15, textDecoration: "none", fontFamily: "Syne, sans-serif" }}>
            Read the Blog →
          </a>
        </div>
      </div>

      {/* Final CTA */}
      <div style={{ padding: "60px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, color: "#f0f4ff", marginBottom: 12 }}>Ready to plan your perfect park day?</h2>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, marginBottom: 36 }}>Download Funparks free — no subscription, no ads, ever.</p>
        <DownloadButtons size="lg" />
      </div>

      {/* Footer */}
      <div style={{ padding: "24px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <a href="https://funparks.app" style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, textDecoration: "none" }}>funparks.app</a>
        <span style={{ color: "rgba(255,255,255,0.1)", margin: "0 12px" }}>·</span>
        <a href="https://funparks.app/privacy" style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, textDecoration: "none" }}>Privacy</a>
      </div>
    </div>
  );
}