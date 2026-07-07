const fs = require("fs");
const files = [
  "app/layout.js",
  "app/blog/page.js"
];

files.forEach(file => {
  if (!fs.existsSync(file)) { console.log("Not found:", file); return; }
  let c = fs.readFileSync(file, "utf8");
  c = c.replace(/\/og-image\.png/g, "https://funparks.app/screenshots/funparks_social.jpg");
  fs.writeFileSync(file, c, "utf8");
  console.log("Fixed:", file);
});