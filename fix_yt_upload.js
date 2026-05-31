const fs = require("fs");
let c = fs.readFileSync("app/agent/page.js", "utf8");

const oldFn = `const uploadToYouTube = async (file) => {
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
  };`;

const newFn = `const uploadToYouTube = async (file) => {
    if (!blog) return alert("Generate content first!");
    setYtUploading(true); setYtUploaded(null);
    try {
      const tokenRes = await fetch("/api/youtube/token");
      const tokenData = await tokenRes.json();
      if (!tokenData.access_token) throw new Error(tokenData.error || "Not connected");

      const metadata = {
        snippet: {
          title: (blog.title || "Funparks Theme Park Guide").slice(0, 100),
          description: (posts.youtube || "") + "\\n\\nFull guide: https://funparks.app/blog/" + slug + "\\n\\n#funparks #themeparks #shorts",
          tags: ["funparks","themeparks","themepark","rollercoaster","shorts","travel"],
          categoryId: "17"
        },
        status: { privacyStatus: "public", selfDeclaredMadeForKids: false }
      };

      const boundary = "funparks_" + Date.now();
      const metaStr = JSON.stringify(metadata);
      const videoBuffer = await file.arrayBuffer();
      const enc = new TextEncoder();
      const p1 = enc.encode("--" + boundary + "\\r\\nContent-Type: application/json; charset=UTF-8\\r\\n\\r\\n" + metaStr + "\\r\\n");
      const p2 = enc.encode("--" + boundary + "\\r\\nContent-Type: " + (file.type || "video/mp4") + "\\r\\n\\r\\n");
      const p3 = new Uint8Array(videoBuffer);
      const p4 = enc.encode("\\r\\n--" + boundary + "--");
      const total = new Uint8Array(p1.length + p2.length + p3.length + p4.length);
      let off = 0;
      [p1, p2, p3, p4].forEach(p => { total.set(p, off); off += p.length; });

      const uploadRes = await fetch("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=multipart&part=snippet,status", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + tokenData.access_token,
          "Content-Type": "multipart/related; boundary=" + boundary,
        },
        body: total,
      });

      const result = await uploadRes.json();
      if (result.id) setYtUploaded("https://youtube.com/shorts/" + result.id);
      else throw new Error(result.error?.message || "Upload failed");
    } catch(e) { alert("Error: " + e.message); }
    setYtUploading(false);
  };`;

if (c.includes(oldFn)) {
  c = c.replace(oldFn, newFn);
  console.log("Upload function updated!");
} else {
  console.log("Function not found - checking CRLF...");
  const idx = c.indexOf("const uploadToYouTube");
  console.log("Found at:", idx);
}

fs.writeFileSync("app/agent/page.js", c, "utf8");