const fs = require("fs");
let c = fs.readFileSync("app/agent/page.js", "utf8");

// Find the video button div and add the YouTube upload label after it
const oldText = `{videoLoading ? "Generating..." : "🎬 Preview Video (TikTok / YouTube Shorts)"}
                </button>
              </div>`;

const newText = `{videoLoading ? "Generating..." : "🎬 Preview Video (TikTok / YouTube Shorts)"}
                </button>
                <label style={{flex:1,padding:"12px",borderRadius:"12px",fontFamily:"inherit",fontSize:"14px",fontWeight:"800",cursor:(!blog||ytUploading)?"not-allowed":"pointer",background:"linear-gradient(135deg,#FF0000,#cc0000)",color:"white",opacity:(!blog||ytUploading)?0.5:1,textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}>
                  {ytUploading ? "Uploading..." : ytUploaded ? "✓ Uploaded!" : "▶ Upload to YouTube Shorts"}
                  <input type="file" accept="video/*" style={{display:"none"}} disabled={!blog||ytUploading} onChange={e=>e.target.files[0]&&uploadToYouTube(e.target.files[0])} />
                </label>
              </div>`;

if (c.includes(oldText)) {
  c = c.replace(oldText, newText);
  console.log("Upload button added!");
} else {
  console.log("Text not found, trying encoded version...");
  const idx = c.indexOf("Preview Video (TikTok");
  console.log("Found at:", idx);
  console.log(JSON.stringify(c.substring(idx, idx+200)));
}

fs.writeFileSync("app/agent/page.js", c, "utf8");