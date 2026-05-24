"use client";

const features = [
  {
    icon: "⚡",
    title: "Live Wait Times",
    desc: "See real-time queue times for every attraction before you leave the hotel. Skip the guesswork — go straight to the rides that matter.",
    gradient: "from-orange-400 to-red-400",
    color: "#FF6B2B",
    items: ["Space Mountain — 25 min", "Big Thunder — 55 min", "Haunted Mansion — 15 min", "Pirates — 40 min"],
    itemColors: ["#10b981", "#ef4444", "#10b981", "#f59e0b"],
  },
  {
    icon: "🤖",
    title: "AI Park Assistant",
    desc: "Ask anything — Plan my day at Cedar Point or Best ride for my 8-year-old. Get instant personalized recommendations.",
    gradient: "from-purple-400 to-blue-400",
    color: "#a855f7",
    items: ["Plan my morning at Magic Kingdom 🎢", "Start with Space Mountain (8 min wait)...", "Which rides suit my 6-year-old?", "Try Dumbo and Fantasyland first!"],
    itemColors: ["#a855f7", "rgba(255,255,255,0.6)", "#a855f7", "rgba(255,255,255,0.6)"],
  },
  {
    icon: "☀️",
    title: "My Day Planner",
    desc: "Build your perfect park day. Add attractions, set time estimates, and get the most out of every visit.",
    gradient: "from-yellow-400 to-orange-400",
    color: "#f59e0b",
    items: ["9:00 AM — Space Mountain", "10:00 AM — Haunted Mansion", "10:30 AM — Big Thunder", "11:30 AM — Pirates"],
    itemColors: ["#f59e0b", "#f59e0b", "#f59e0b", "#f59e0b"],
  },
  {
    icon: "🍔",
    title: "Food & Dining Guides",
    desc: "Curated restaurant reviews for every park with menus, prices and recommendations from real visitors.",
    gradient: "from-pink-400 to-rose-400",
    color: "#f43f5e",
    items: ["Skipper Canteen ⭐ 4.6 — $$", "Be Our Guest ⭐ 4.8 — $$$", "Cosmic Rays ⭐ 4.1 — $", "Columbia Harbour ⭐ 4.4 — $$"],
    itemColors: ["rgba(255,255,255,0.8)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.8)"],
  },
  {
    icon: "🌍",
    title: "Global Coverage",
    desc: "From Walt Disney World to Tokyo DisneySea — 60+ parks across 6 continents, all in one app.",
    gradient: "from-emerald-400 to-teal-400",
    color: "#10b981",
    items: ["🇺🇸 Walt Disney World", "🇯🇵 Tokyo Disneyland", "🇳🇱 Efteling", "🇪🇸 PortAventura"],
    itemColors: ["rgba(255,255,255,0.8)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.8)"],
  },
  {
    icon: "🗺️",
    title: "Interactive Maps",
    desc: "Explore every park on an interactive map. Find attractions, food and your group — all in one place.",
    gradient: "from-teal-400 to-cyan-400",
    color: "#06b6d4",
    items: ["📍 Attraction locations", "🍽️ Dining spots", "🏨 On-site hotels", "🚻 Facilities & services"],
    itemColors: ["rgba(255,255,255,0.8)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.8)"],
  },
];

function PhoneMockup({ feature, flip }) {
  return (
    <div style={{
      width: 160, height: 290,
      background: "#1a1a2e",
      borderRadius: 28,
      border: "2px solid rgba(255,255,255,0.1)",
      padding: 8,
      boxShadow: `0 30px 70px rgba(0,0,0,0.4), 0 0 40px ${feature.color}22`,
      transform: flip ? "rotate(2deg)" : "rotate(-2deg)",
      flexShrink: 0,
      position: "relative",
    }}>
      <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 36, height: 5, background: "#000", borderRadius: 3, zIndex: 10 }} />
      <div style={{ background: "#0a0a1a", borderRadius: 22, height: "100%", overflow: "hidden", padding: "18px 10px 10px" }}>
        <div style={{ fontSize: 6, color: "rgba(255,255,255,0.3)", marginBottom: 2, textAlign: "right" }}>9:41</div>
        <div style={{ fontSize: 7, fontWeight: 800, color: feature.color, letterSpacing: 1, marginBottom: 8 }}>
          {feature.title.toUpperCase()}
        </div>
        {feature.items.map((item, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.06)",
            borderRadius: 8,
            padding: "5px 7px",
            marginBottom: 5,
            borderLeft: `2px solid ${feature.color}`,
          }}>
            <span style={{ fontSize: 6.5, color: feature.itemColors[i], fontWeight: 600, lineHeight: 1.3 }}>{item}</span>
          </div>
        ))}
        <div style={{ marginTop: 10, background: feature.color, borderRadius: 8, padding: "5px 10px", textAlign: "center" }}>
          <span style={{ fontSize: 6.5, color: "#fff", fontWeight: 700 }}>Open in Funparks →</span>
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-24" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8f7ff 100%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-bold mb-4">✨ Features</div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4" style={{ fontFamily: "Syne,sans-serif" }}>
            Everything for<br />
            <span style={{ background: "linear-gradient(135deg,#FF6B2B,#f43f5e,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              the perfect park day
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Every feature a theme park enthusiast could dream of.</p>
        </div>

        <div className="space-y-20">
          {features.map((feature, i) => {
            const flip = i % 2 !== 0;
            return (
              <div key={i} className={`flex flex-col ${flip ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-20`}>
                <div className="flex-shrink-0 flex items-center justify-center" style={{ minWidth: 200 }}>
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", inset: -30, background: `radial-gradient(circle, ${feature.color}25 0%, transparent 70%)`, borderRadius: "50%", filter: "blur(15px)" }} />
                    <PhoneMockup feature={feature} flip={flip} />
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <div className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} items-center justify-center text-2xl mb-5 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-4" style={{ fontFamily: "Syne,sans-serif" }}>{feature.title}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">{feature.desc}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold" style={{ color: feature.color }}>
                    <span>See it in action →</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}