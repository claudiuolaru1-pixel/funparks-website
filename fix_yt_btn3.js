const fs = require("fs");
let c = fs.readFileSync("app/agent/page.js", "utf8");

const idx = c.indexOf('"Upload to YouTube Shorts"');
if (idx === -1) { console.log("Not found"); process.exit(1); }

// Find the start of the label tag before this
const labelStart = c.lastIndexOf("<label ", idx);
// Find the end of the label tag after this
const labelEnd = c.indexOf("</label>", idx) + "</label>".length;

console.log("Label from", labelStart, "to", labelEnd);

const newBtn = `<button onClick={copyYouTubeMeta} disabled={!blog} style={{flex:1,padding:"12px",borderRadius:"12px",border:"none",fontFamily:"inherit",fontSize:"14px",fontWeight:"800",cursor:!blog?"not-allowed":"pointer",background:"linear-gradient(135deg,#FF0000,#cc0000)",color:"white",opacity:!blog?0.5:1}}>
                  {ytUploaded==="copied" ? "✓ Copied! Open YouTube Studio →" : "▶ Copy for YouTube Shorts"}
                </button>`;

c = c.slice(0, labelStart) + newBtn + c.slice(labelEnd);

// Also fix the Connect YouTube link section
const connectIdx = c.indexOf("Connect YouTube Account");
if (connectIdx !== -1) {
  const aStart = c.lastIndexOf("<a ", connectIdx);
  const divEnd = c.indexOf("</div>", connectIdx) + "</div>".length;
  const newLinks = `{ytUploaded==="copied" && <a href="https://studio.youtube.com" target="_blank" rel="noopener noreferrer" style={{padding:"8px 16px",borderRadius:"10px",background:"rgba(255,0,0,0.15)",border:"1px solid rgba(255,0,0,0.4)",color:"#ff4444",fontSize:"12px",fontWeight:"700",textDecoration:"none"}}>▶ Open YouTube Studio</a>}</div>`;
  c = c.slice(0, aStart) + newLinks + c.slice(divEnd);
  console.log("Connect link replaced!");
}

fs.writeFileSync("app/agent/page.js", c, "utf8");
console.log("Done!");