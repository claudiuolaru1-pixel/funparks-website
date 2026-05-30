const fs = require("fs");
let c = fs.readFileSync("app/agent/page.js", "utf8");

// Add fbPosting state after setPublishError useState
c = c.replace(
  "const [publishing, setPublishing] = useState(false);",
  "const [publishing, setPublishing] = useState(false);\n  const [fbPosting, setFbPosting] = useState(false);\n  const [fbPosted, setFbPosted] = useState(false);"
);

// Add postToFacebook function before generate function
c = c.replace(
  "const generate = async () => {",
  `const postToFacebook = async () => {
    if (!posts.facebook) return alert("Generate content first!");
    setFbPosting(true); setFbPosted(false);
    try {
      const res = await fetch("/api/facebook", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ caption: posts.facebook, link: "https://funparks.app/blog/" + slug })
      });
      const data = await res.json();
      if (data.success) setFbPosted(true);
      else alert("Error: " + data.error);
    } catch(e) { alert("Error: " + e.message); }
    setFbPosting(false);
  };

  const generate = async () => {`
);

// Add Post to Facebook button after Copy button in platforms loop
c = c.replace(
  "<div style={{display:'flex',gap:'7px',marginTop:'10px'}}>\n                    <button style={{...btnStyle(),fontSize:'12px'}} onClick={()=>copyText(posts[p.id]||'','post_'+p.id)}>",
  `<div style={{display:'flex',gap:'7px',marginTop:'10px',flexWrap:'wrap'}}>
                    <button style={{...btnStyle(),fontSize:'12px'}} onClick={()=>copyText(posts[p.id]||'','post_'+p.id)}>`
);

c = c.replace(
  "</div>\n                  </div>\n                );\n              })}",
  `{p.id==='facebook' && (
                      <button style={{...btnStyle('orange'),fontSize:'12px',opacity:fbPosting?0.6:1}} onClick={postToFacebook} disabled={fbPosting||fbPosted}>
                        {fbPosted ? 'Posted to Facebook!' : fbPosting ? 'Posting...' : 'Post to Facebook'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}`
);

fs.writeFileSync("app/agent/page.js", c, "utf8");
console.log("Done! Replacements made:", (c.match(/postToFacebook/g)||[]).length);