const fs = require("fs");
let c = fs.readFileSync("app/agent/page.js", "utf8");

// Fix the broken description with literal newlines
const broken = `description: (posts.youtube || "") + "\n\nFull guide: https://funparks.app/blog/" + slug + "\n\n#funparks #themeparks #shorts",`;
const fixed = `description: (posts.youtube || "") + " Full guide: https://funparks.app/blog/" + slug + " #funparks #themeparks #shorts",`;

if (c.includes(broken)) {
  c = c.replace(broken, fixed);
  console.log("Fixed!");
} else {
  // Try to find and fix it another way
  const start = c.indexOf('description: (posts.youtube || "") + "');
  const end = c.indexOf('#funparks #themeparks #shorts",', start) + '#funparks #themeparks #shorts",'.length;
  if (start !== -1 && end !== -1) {
    const oldPart = c.slice(start, end);
    console.log("Found:", JSON.stringify(oldPart));
    c = c.slice(0, start) + `description: (posts.youtube || "") + " Full guide: https://funparks.app/blog/" + slug + " #funparks #themeparks #shorts",` + c.slice(end);
    console.log("Fixed with fallback!");
  } else {
    console.log("Not found");
  }
}

fs.writeFileSync("app/agent/page.js", c, "utf8");