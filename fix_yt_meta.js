const fs = require("fs");
let c = fs.readFileSync("app/agent/page.js", "utf8");

const start = c.indexOf("const copyYouTubeMeta = async () => {");
const end = c.indexOf("  };\r\n\r\n  const openVideo", start);
const end2 = c.indexOf("  };\n\n  const openVideo", start);
const actualEnd = end !== -1 ? end + 5 : end2 + 4;

const newFn = `const copyYouTubeMeta = async () => {
    if (!blog) return alert("Generate content first!");
    const ytDesc = (posts.youtube || "").replace(/\\n/g, " ");
    const ytText = (blog.title || "") + " - " + ytDesc + " Full guide: https://funparks.app/blog/" + slug + " #funparks #themeparks #themepark #rollercoaster #shorts #travel";
    try { await navigator.clipboard.writeText(ytText); } catch(e) { const ta=document.createElement("textarea");ta.value=ytText;document.body.appendChild(ta);ta.select();document.execCommand("copy");document.body.removeChild(ta); }
    setYtUploaded("copied");
  };`;

c = c.slice(0, start) + newFn + "\r\n\r\n  " + c.slice(actualEnd);
fs.writeFileSync("app/agent/page.js", c, "utf8");
console.log("Fixed! Function length:", newFn.length);