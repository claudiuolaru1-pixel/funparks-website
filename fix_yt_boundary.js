const fs = require("fs");
let c = fs.readFileSync("app/agent/page.js", "utf8");

// Find and replace the entire p1/p2/p3/p4 section
const start = c.indexOf('const p1 = enc.encode("--" + boundary +');
const end = c.indexOf('[p1,p2,p3,p4].forEach', start) + '[p1,p2,p3,p4].forEach(p=>{total.set(p,off);off+=p.length;});'.length;

if (start === -1) { console.log("Not found"); process.exit(1); }

const newPart = `const p1 = enc.encode("--" + boundary + "\\r\\nContent-Type: application/json; charset=UTF-8\\r\\n\\r\\n" + metaStr + "\\r\\n");
      const p2 = enc.encode("--" + boundary + "\\r\\nContent-Type: " + (file.type || "video/mp4") + "\\r\\n\\r\\n");
      const p3 = new Uint8Array(videoBuffer);
      const p4 = enc.encode("\\r\\n--" + boundary + "--");
      const total = new Uint8Array(p1.length + p2.length + p3.length + p4.length);
      let off = 0;
      [p1,p2,p3,p4].forEach(p=>{total.set(p,off);off+=p.length;});`;

c = c.slice(0, start) + newPart + c.slice(end);
fs.writeFileSync("app/agent/page.js", c, "utf8");
console.log("Fixed boundary strings!");