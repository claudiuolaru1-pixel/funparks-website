const fs = require("fs");
let c = fs.readFileSync("app/agent/page.js", "utf8");

const start = c.indexOf("const uploadToYouTube = async (file) => {");
const end = c.indexOf("  };\r\n\r\n  const openVideo", start);
const end2 = c.indexOf("  };\n\n  const openVideo", start);
const actualEnd = end !== -1 ? end + 5 : end2 + 4;

console.log("Found from", start, "to", actualEnd);

const newFn = `const uploadToYouTube = async (file) => {
    if (!blog) return alert("Generate content first!");
    setYtUploading(true); setYtUploaded(null);
    try {
      const initRes = await fetch("/api/youtube/initupload", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
          title: (blog.title || "Funparks Theme Park Guide").slice(0, 100),
          description: (posts.youtube || "") + " Full guide: https://funparks.app/blog/" + slug + " #funparks #themeparks #shorts"
        })
      });
      const initData = await initRes.json();
      if (!initData.uploadUrl) throw new Error(initData.error || "Failed to init upload");

      const uploadRes = await fetch(initData.uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type || "video/mp4" },
        body: file,
      });

      if (uploadRes.status === 200 || uploadRes.status === 201) {
        const result = await uploadRes.json();
        if (result.id) setYtUploaded("https://youtube.com/shorts/" + result.id);
        else throw new Error("Upload succeeded but no video ID returned");
      } else {
        const errText = await uploadRes.text();
        throw new Error("Upload failed: " + errText.slice(0, 150));
      }
    } catch(e) { alert("Error: " + e.message); }
    setYtUploading(false);
  };`;

c = c.slice(0, start) + newFn + "\r\n\r\n  " + c.slice(actualEnd);
fs.writeFileSync("app/agent/page.js", c, "utf8");
console.log("Done!");