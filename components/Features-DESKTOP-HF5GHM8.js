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
      width: 200, height: 380,
      background: "#0d1929",
      borderRadius: 36,
      border: "2px solid rgba(255,255,255,0.1)",
      padding: 8,
      boxShadow: `0 0 0 1px ${color}20, 0 0 50px ${color}30, 0 30px 70px rgba(0,0,0,0.5)`,
      transform: flip ? "rotate(2deg)" : "rotate(-2deg)",
      flexShrink: 0,
      position: "relative",
    }}>
      <div style={{position:"absolute",top:12,left:"50%",transform:"translateX(-50%)",width:50,height:7,background:"#000",borderRadius:4,zIndex:10}} />
      <div style={{borderRadius:30,overflow:"hidden",height:"100%"}}>
        <img src={screenshot} alt="App screenshot" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}} />
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-24" style={{background:"linear-gradient(180deg, #050a14 0%, #080f1e 100%)"}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4" style={{background:"rgba(168,85,247,0.12)",border:"1px solid rgba(168,85,247,0.25)",color:"#a855f7"}}>
            ✨ Features
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-4" style={{fontFamily:"Syne,sans-serif",color:"#f0f4ff"}}>
            Everything for<br />
            <span style={{background:"linear-gradient(135deg,#FF6B2B,#f43f5e,#a855f7)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
              the perfect park day
            </span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{color:"rgba(255,255,255,0.45)"}}>Every feature a theme park enthusiast could dream of.</p>
        </div>

        <div className="space-y-24">
          {features.map((feature, i) => {
            const flip = i % 2 !== 0;
            return (
              <div key={i} className={`flex flex-col ${flip ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-20`}>
                <div className="flex-shrink-0 flex items-center justify-center" style={{minWidth:220}}>
                  <div style={{position:"relative"}}>
                    <div style={{position:"absolute",inset:-40,background:`radial-gradient(circle, ${feature.color}20 0%, transparent 70%)`,borderRadius:"50%",filter:"blur(20px)"}} />
                    <PhoneMockup screenshot={feature.screenshot} color={feature.color} flip={flip} />
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <div className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} items-center justify-center text-2xl mb-5 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-3xl font-black mb-4" style={{fontFamily:"Syne,sans-serif",color:"#f0f4ff"}}>{feature.title}</h3>
                  <p className="text-lg leading-relaxed max-w-md mx-auto lg:mx-0" style={{color:"rgba(255,255,255,0.5)"}}>{feature.desc}</p>
                  <div className="mt-8 flex gap-3 justify-center lg:justify-start flex-wrap">
                    <a href={APP_STORE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl hover:scale-105 transition-transform" style={{background:"#000",border:"1px solid rgba(255,255,255,0.15)",color:"#fff",textDecoration:"none"}}>
                      <span style={{fontSize:18}}>🍎</span>
                      <div>
                        <div style={{fontSize:8,opacity:0.5,letterSpacing:0.5,textTransform:"uppercase"}}>Download on the</div>
                        <div style={{fontSize:12,fontWeight:800,fontFamily:"Syne,sans-serif"}}>App Store</div>
                      </div>
                    </a>
                    <a href={PLAY_STORE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl hover:scale-105 transition-transform" style={{background:"#000",border:"1px solid rgba(255,255,255,0.15)",color:"#fff",textDecoration:"none"}}>
                      <span style={{fontSize:18}}>▶️</span>
                      <div>
                        <div style={{fontSize:8,opacity:0.5,letterSpacing:0.5,textTransform:"uppercase"}}>Get it on</div>
                        <div style={{fontSize:12,fontWeight:800,fontFamily:"Syne,sans-serif"}}>Google Play</div>
                      </div>
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