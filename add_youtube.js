const fs = require("fs");
let c = fs.readFileSync("app/agent/page.js", "utf8");

// Add youtube state after videoLoading state
c = c.replace(
  "const [videoLoading, setVideoLoading] = useState(false);",
  `const [videoLoading, setVideoLoading] = useState(false);
  const [ytUploading, setYtUploading] = useState(false);
  const [ytUploaded, setYtUploaded] = useState(null);`
);

// Add uploadToYouTube function before openVideo function
c = c.replace(
  "const openVideo = async () => {",
  `const uploadToYouTube = async (file) => {
    if (!blog) return alert("Generate content first!");
    setYtUploading(true); setYtUploaded(null);
    try {
      const form = new FormData();
      form.append("video", file);
      form.append("title", blog.title || "Funparks Theme Park Guide");
      form.append("description", (posts.youtube || "") + "\\n\\nFull guide: https://funparks.app/blog/" + slug);
      form.append("tags", "themeparks,funparks,rollercoaster,themepark,shorts,travel");
      const res = await fetch("/api/youtube/upload", { method: "POST", body: form });
      const data = await res.json();
      if (data.success) setYtUploaded(data.url);
      else alert("Upload error: " + data.error);
    } catch(e) { alert("Error: " + e.message); }
    setYtUploading(false);
  };

  const openVideo = async () => {`
);

// Add YouTube buttons in publish tab after video button
c = c.replace(
  `<button onClick={openVideo} disabled={videoLoading||!blog} style={{flex:1,padding:"12px",borderRadius:"12px",border:"none",fontFamily:"inherit",fontSize:"14px",fontWeight:"800",cursor:"pointer",background:"linear-gradient(135deg,#06b6d4,#a855f7)",color:"white",opacity:!blog?0.5:1}}>
                {videoLoading ? "Generating..." : "🎬 Preview Video (TikTok / YouTube Shorts)"}
              </button>`,
  `<button onClick={openVideo} disabled={videoLoading||!blog} style={{flex:1,padding:"12px",borderRadius:"12px",border:"none",fontFamily:"inherit",fontSize:"14px",fontWeight:"800",cursor:"pointer",background:"linear-gradient(135deg,#06b6d4,#a855f7)",color:"white",opacity:!blog?0.5:1}}>
                {videoLoading ? "Generating..." : "🎬 Preview Video (TikTok / YouTube Shorts)"}
              </button>
              <label style={{flex:1,padding:"12px",borderRadius:"12px",border:"none",fontFamily:"inherit",fontSize:"14px",fontWeight:"800",cursor:(!blog||ytUploading)?"not-allowed":"pointer",background:"linear-gradient(135deg,#FF0000,#cc0000)",color:"white",opacity:(!blog||ytUploading)?0.5:1,textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}>
                {ytUploading ? "Uploading..." : ytUploaded ? "✓ Uploaded!" : "▶ Upload to YouTube Shorts"}
                <input type="file" accept="video/*" style={{display:"none"}} disabled={!blog||ytUploading} onChange={e=>e.target.files[0]&&uploadToYouTube(e.target.files[0])} />
              </label>`
);

// Add YouTube connect button and uploaded link
c = c.replace(
  `{blog && <button onClick={publishToSite}`,
  `<div style={{marginBottom:"12px",display:"flex",gap:"10px",flexWrap:"wrap",alignItems:"center"}}>
              <a href="/api/youtube" target="_blank" rel="noopener noreferrer" style={{padding:"8px 16px",borderRadius:"10px",background:"rgba(255,0,0,0.1)",border:"1px solid rgba(255,0,0,0.3)",color:"#ff4444",fontSize:"12px",fontWeight:"700",textDecoration:"none"}}>
                🔗 Connect YouTube Account
              </a>
              {ytUploaded && <a href={ytUploaded} target="_blank" rel="noopener noreferrer" style={{padding:"8px 16px",borderRadius:"10px",background:"rgba(255,0,0,0.1)",border:"1px solid rgba(255,0,0,0.3)",color:"#ff4444",fontSize:"12px",fontWeight:"700",textDecoration:"none"}}>▶ View on YouTube</a>}
            </div>
            {blog && <button onClick={publishToSite}`
);

fs.writeFileSync("app/agent/page.js", c, "utf8");
console.log("Done! YouTube refs:", (c.match(/uploadToYouTube/g)||[]).length);