const fs = require("fs");
let c = fs.readFileSync("app/agent/page.js", "utf8");

// Replace the broken uploadToYouTube function with a simple copy approach
const start = c.indexOf("const uploadToYouTube = async (file) => {");
const end1 = c.indexOf("  };\r\n\r\n  const openVideo", start);
const end2 = c.indexOf("  };\n\n  const openVideo", start);
const actualEnd = end1 !== -1 ? end1 + 5 : end2 + 4;

const newFn = `const copyYouTubeMeta = async () => {
    if (!blog) return alert("Generate content first!");
    const ytText = (blog.title || "") + "\n\n" + (posts.youtube || "") + "\n\nFull guide: https://funparks.app/blog/" + slug + "\n\n#funparks #themeparks #themepark #rollercoaster #shorts #travel #themepark2025";
    try { await navigator.clipboard.writeText(ytText); } catch(e) { const ta=document.createElement("textarea");ta.value=ytText;document.body.appendChild(ta);ta.select();document.execCommand("copy");document.body.removeChild(ta); }
    setYtUploaded("copied");
  };`;

c = c.slice(0, start) + newFn + "\r\n\r\n  " + c.slice(actualEnd);

// Replace the upload button label with simple buttons
const oldBtn = `<label style={{flex:1,padding:"12px",borderRadius:"12px",fontFamily:"inherit",fontSize:"14px",fontWeight:"800",cursor:(!blog||ytUploading)?"not-allowed":"pointer",background:"linear-gradient(135deg,#FF0000,#cc0000)",color:"white",opacity:(!blog||ytUploading)?0.5:1,textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}>
                  {ytUploading ? "Uploading..." : ytUploaded ? "Uploaded!" : "Upload to YouTube Shorts"}
                  <input type="file" accept="video/*" style={{display:"none"}} disabled={!blog||ytUploading} onChange={e=>e.target.files[0]&&uploadToYouTube(e.target.files[0])} />
                </label>`;

const newBtn = `<button onClick={copyYouTubeMeta} disabled={!blog} style={{flex:1,padding:"12px",borderRadius:"12px",border:"none",fontFamily:"inherit",fontSize:"14px",fontWeight:"800",cursor:!blog?"not-allowed":"pointer",background:"linear-gradient(135deg,#FF0000,#cc0000)",color:"white",opacity:!blog?0.5:1}}>
                  {ytUploaded==="copied" ? "Copied! Open YouTube Studio →" : "Copy Title & Description for YouTube"}
                </button>`;

if (c.includes(oldBtn)) {
  c = c.replace(oldBtn, newBtn);
  console.log("Button replaced!");
} else {
  console.log("Button not found - checking...");
  const idx = c.indexOf("Upload to YouTube Shorts");
  console.log("Found at:", idx);
}

// Fix YouTube connect link to open YouTube Studio when copied
const oldLink = `<a href="/api/youtube" target="_blank" rel="noopener noreferrer" style={{padding:"8px 16px",borderRadius:"10px",background:"rgba(255,0,0,0.1)",border:"1px solid rgba(255,0,0,0.3)",color:"#ff4444",fontSize:"12px",fontWeight:"700",textDecoration:"none"}}>
                🔗 Connect YouTube Account
                </a>
              {ytUploaded && <a href={ytUploaded} target="_blank" rel="noopener noreferrer" style={{padding:"8px 16px",borderRadius:"10px",background:"rgba(255,0,0,0.1)",border:"1px solid rgba(255,0,0,0.3)",color:"#ff4444",fontSize:"12px",fontWeight:"700",textDecoration:"none"}}>▶ View on YouTube</a>}`;

const newLink = `{ytUploaded==="copied" && <a href="https://studio.youtube.com" target="_blank" rel="noopener noreferrer" style={{padding:"8px 16px",borderRadius:"10px",background:"rgba(255,0,0,0.15)",border:"1px solid rgba(255,0,0,0.4)",color:"#ff4444",fontSize:"12px",fontWeight:"700",textDecoration:"none"}}>▶ Open YouTube Studio to Upload</a>}`;

if (c.includes(oldLink)) {
  c = c.replace(oldLink, newLink);
  console.log("Link replaced!");
} else {
  console.log("Link not found");
}

fs.writeFileSync("app/agent/page.js", c, "utf8");
console.log("Done!");