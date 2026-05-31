const fs = require("fs");
let c = fs.readFileSync("app/agent/page.js", "utf8");

// Find and replace the entire uploadToYouTube function
const start = c.indexOf("const uploadToYouTube = async (file) => {");
const end = c.indexOf("  };\n\n  const openVideo", start);
const end2 = c.indexOf("  };\r\n\r\n  const openVideo", start);
const actualEnd = end !== -1 ? end + 4 : end2 + 5;

if (start === -1) {
  console.log("Function start not found");
  process.exit(1);
}

console.log("Found function from", start, "to", actualEnd);

const newFn = `const uploadToYouTube = async (file) => {
    if (!blog) return alert("Generate content first!");
    setYtUploading(true); setYtUploaded(null);
    try {
      const tokenRes = await fetch("/api/youtube/token");
      const tokenData = await tokenRes.json();
      if (!tokenData.access_token) throw new Error(tokenData.error || "YouTube not connected - click Connect YouTube Account first");

      const metadata = {
        snippet: {
          title: (blog.title || "Funparks Theme Park Guide").slice(0, 100),
          description: (posts.youtube || "") + "\n\nFull guide: https://funparks.app/blog/" + slug + "\n\n#funparks #themeparks #shorts",
          tags: ["funparks","themeparks","themepark","rollercoaster","shorts","travel"],
          categoryId: "17"
        },
        status: { privacyStatus: "public", selfDeclaredMadeForKids: false }
      };

      const boundary = "funparks_" + Date.now();
      const metaStr = JSON.stringify(metadata);
      const videoBuffer = await file.arrayBuffer();
      const enc = new TextEncoder();
      const p1 = enc.encode("--" + boundary + "\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n" + metaStr + "\r\n");
      const p2 = enc.encode("--" + boundary + "\r\nContent-Type: " + (file.type || "video/mp4") + "\r\n\r\n");
      const p3 = new Uint8Array(videoBuffer);
      const p4 = enc.encode("\r\n--" + boundary + "--");
      const total = new Uint8Array(p1.length + p2.length + p3.length + p4.length);
      let off = 0;
      [p1,p2,p3,p4].forEach(p=>{total.set(p,off);off+=p.length;});

      const uploadRes = await fetch("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=multipart&part=snippet,status", {
        method: "POST",
        headers: { Authorization: "Bearer " + tokenData.access_token, "Content-Type": "multipart/related; boundary=" + boundary },
        body: total,
      });

      const result = await uploadRes.json();
      if (result.id) setYtUploaded("https://youtube.com/shorts/" + result.id);
      else throw new Error(result.error?.message || "Upload failed");
    } catch(e) { alert("Error: " + e.message); }
    setYtUploading(false);
  };`;

c = c.slice(0, start) + newFn + c.slice(actualEnd);
fs.writeFileSync("app/agent/page.js", c, "utf8");
console.log("Done!");