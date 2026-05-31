const fs = require("fs");
let c = fs.readFileSync("app/agent/page.js", "utf8");

// Remove the corrupted "e client';" line that appeared after the function
c = c.replace("  };\r\n\r\ne client';\r\nimport ImageCard", "  };\r\n\r\n");
c = c.replace("  };\ne client';\nimport ImageCard", "  };\r\n\r\n");

// Check if 'use client' is at the top where it belongs
if (!c.startsWith("'use client'")) {
  c = "'use client';\nimport ImageCard from '../../components/ImageCard';\nimport { useState, useEffect } from 'react';\n\n" + c.replace(/^import ImageCard.*\n/, "").replace(/^import \{ useState.*\n/, "");
  console.log("Restored 'use client' directive");
}

fs.writeFileSync("app/agent/page.js", c, "utf8");
console.log("Fixed! Starts with:", c.slice(0, 30));