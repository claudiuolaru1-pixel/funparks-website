const fs = require("fs");
let c = fs.readFileSync("app/agent/page.js", "utf8");

// Add video state after fbPosted state
c = c.replace(
  "const [fbPosted, setFbPosted] = useState(false);",
  "const [fbPosted, setFbPosted] = useState(false);\n  const [videoLoading, setVideoLoading] = useState(false);"
);

// Add openVideo function before postToFacebook function
c = c.replace(
  "const postToFacebook = async () => {",
  `const openVideo = async () => {
    if (!blog) return alert("Generate content first!");
    setVideoLoading(true);
    try {
      const res = await fetch("/api/video", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ title: blog.title, excerpt: blog.excerpt, content: blog.content })
      });
      const html = await res.text();
      const blob = new Blob([html], {type:"text/html"});
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch(e) { alert("Error: " + e.message); }
    setVideoLoading(false);
  };

  const postToFacebook = async () => {`
);

// Add video button after the Post to Facebook button in publish tab
c = c.replace(
  "{blog && <button onClick={publishToSite}",
  `<div style={{display:"flex",gap:"10px",marginBottom:"16px",flexWrap:"wrap"}}>
              <button onClick={openVideo} disabled={videoLoading||!blog} style={{flex:1,padding:"12px",borderRadius:"12px",border:"none",fontFamily:"inherit",fontSize:"14px",fontWeight:"800",cursor:"pointer",background:"linear-gradient(135deg,#06b6d4,#a855f7)",color:"white",opacity:!blog?0.5:1}}>
                {videoLoading ? "Generating..." : "🎬 Preview Video (TikTok / YouTube Shorts)"}
              </button>
            </div>
            {blog && <button onClick={publishToSite}`
);

fs.writeFileSync("app/agent/page.js", c, "utf8");
console.log("Done! Video function count:", (c.match(/openVideo/g)||[]).length);