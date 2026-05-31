const fs = require("fs");
let c = fs.readFileSync("app/agent/page.js", "utf8");

const oldText = "Preview Video (TikTok / YouTube Shorts)\"}\r\n              </button>\r\n            </div>";
const newText = `Preview Video (TikTok / YouTube Shorts)"}\r\n              </button>\r\n                <label style={{flex:1,padding:"12px",borderRadius:"12px",fontFamily:"inherit",fontSize:"14px",fontWeight:"800",cursor:(!blog||ytUploading)?"not-allowed":"pointer",background:"linear-gradient(135deg,#FF0000,#cc0000)",color:"white",opacity:(!blog||ytUploading)?0.5:1,textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}>\r\n                  {ytUploading ? "Uploading..." : ytUploaded ? "Uploaded!" : "Upload to YouTube Shorts"}\r\n                  <input type="file" accept="video/*" style={{display:"none"}} disabled={!blog||ytUploading} onChange={e=>e.target.files[0]&&uploadToYouTube(e.target.files[0])} />\r\n                </label>\r\n            </div>`;

if (c.includes(oldText)) {
  c = c.replace(oldText, newText);
  console.log("Upload button added!");
} else {
  console.log("Not found");
}

fs.writeFileSync("app/agent/page.js", c, "utf8");