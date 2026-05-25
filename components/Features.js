"use client";

const APP_STORE = "https://apps.apple.com/app/funparks-theme-park-guide/id6763944775";
const PLAY_STORE = "https://play.google.com/store/apps/details?id=com.funparks.app";

const features = [
  {
    icon: "⚡",
    title: "Live Wait Times",
    desc: "See real-time queue times for every attraction before you leave the hotel. Skip the guesswork — go straight to the rides that matter.",
    gradient: "from-orange-400 to-red-400",
    color: "#FF6B2B",
    screenshot: "/screenshots/live_wait_time.jpg",
  },
  {
    icon: "🤖",
    title: "AI Park Assistant",
    desc: "Ask anything — Plan my day at Cedar Point or Best ride for my 8-year-old. Get instant personalized recommendations.",
    gradient: "from-purple-400 to-blue-400",
    color: "#a855f7",
    screenshot: "/screenshots/ai_park_assistant.jpg",
  },
  {
    icon: "☀️",
    title: "My Day Planner",
    desc: "Build your perfect park day. Add attractions, set time estimates, and get the most out of every visit.",
    gradient: "from-yellow-400 to-orange-400",
    color: "#f59e0b",
    screenshot: "/screenshots/my_day_planner.jpg",
  },
  {
    icon: "🗺️",
    title: "Interactive Maps",
    desc: "Explore every park on an interactive map. Find attractions, food and your group — all in one place.",
    gradient: "from-teal-400 to-cyan-400",
    color: "#06b6d4",
    screenshot: "/screenshots/interactive_map.jpg",
  },
  {
    icon: "🍔",
    title: "Food & Dining Guides",
    desc: "Curated restaurant reviews for every park with menus, prices and recommendations from real visitors.",
    gradient: "from-pink-400 to-rose-400",
    color: "#f43f5e",
    screenshot: "/screenshots/food_and_dinning.jpg",
  },
  {
    icon: "🌍",
    title: "Global Coverage",
    desc: "From Walt Disney World to Tokyo DisneySea — 60+ parks across 6 continents, all in one app.",
    gradient: "from-emerald-400 to-teal-400",
    color: "#10b981",
    screenshot: "/screenshots/overview.jpg",
  },
];

function PhoneMockup({ screenshot, color, flip }) {
  return (
    <div style={{
      width: 180, height: 320,
      background: "#1a1a2e",
      borderRadius: 32,
      border: "3px solid rgba(255,255,255,0.12)",
      padding: 8,
      boxShadow: `0 30px 70px rgba(0,0,0,0.4), 0 0 50px ${color}30`,
      transform: flip ? "rotate(2deg)" : "rotate(-2deg)",
      flexShrink: 0,
      position: "relative",
    }}>
      <div style={{ position: "absolute", top: 11, left: "50%", transform: "translateX(-50%)", width: 40, height: 6, background: "#000", borderRadius: 3, zIndex: 10 }} />
      <div style={{ borderRadius: 26, height: "100%", overflow: "hidden", position: "relative" }}>
        <img
          src={screenshot}
          alt="App screenshot"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
        />
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

        <div className="space-y-24">
          {features.map((feature, i) => {
            const flip = i % 2 !== 0;
            return (
              <div key={i} className={`flex flex-col ${flip ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-20`}>
                <div className="flex-shrink-0 flex items-center justify-center" style={{ minWidth: 200 }}>
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", inset: -30, background: `radial-gradient(circle, ${feature.color}25 0%, transparent 70%)`, borderRadius: "50%", filter: "blur(20px)" }} />
                    <PhoneMockup screenshot={feature.screenshot} color={feature.color} flip={flip} />
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <div className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} items-center justify-center text-2xl mb-5 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-4" style={{ fontFamily: "Syne,sans-serif" }}>{feature.title}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">{feature.desc}</p>
                  <div className="mt-6 flex gap-3 justify-center lg:justify-start flex-wrap">
                    <a href={APP_STORE} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-lg" style={{ background: feature.color }}>
                      🍎 App Store
                    </a>
                    <a href={PLAY_STORE} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 hover:shadow-lg" style={{ background: feature.color + "15", color: feature.color, border: `1px solid ${feature.color}40` }}>
                      ▶ Google Play
                    </a>
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