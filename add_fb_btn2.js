const fs = require("fs");
let c = fs.readFileSync("app/agent/page.js", "utf8");

// Find the closing div of the copy button section and add Facebook button after it
const oldText = "onClick={()=>copyText(posts[p.id]||'','post_'+p.id)}>";
const newText = "onClick={()=>copyText(posts[p.id]||'','post_'+p.id)}>";

// Find the platforms map closing and add button before it
const target = "</div>\n                  </div>\n                );\n              })}";
const replacement = `</div>
                    {p.id==='facebook' && (
                      <button style={{...btnStyle('orange'),fontSize:'12px',marginTop:'6px',opacity:fbPosting?0.6:1,width:'100%'}} onClick={postToFacebook} disabled={fbPosting||fbPosted}>
                        {fbPosted ? '✓ Posted to Facebook!' : fbPosting ? 'Posting...' : '📘 Post to Facebook'}
                      </button>
                    )}
                  </div>
                );
              })}`;

if (c.includes(target)) {
  c = c.replace(target, replacement);
  console.log("Button added successfully!");
} else {
  // Try alternate line endings
  const target2 = "</div>\r\n                  </div>\r\n                );\r\n              })}";
  if (c.includes(target2)) {
    c = c.replace(target2, replacement);
    console.log("Button added (CRLF)!");
  } else {
    console.log("Target not found - dumping nearby context:");
    const idx = c.indexOf("copyText(posts[p.id]");
    console.log(JSON.stringify(c.substring(idx, idx+300)));
  }
}

fs.writeFileSync("app/agent/page.js", c, "utf8");