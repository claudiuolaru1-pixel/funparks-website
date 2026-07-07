const fs = require("fs");
let c = fs.readFileSync("app/promo/page.js", "utf8");
c = c.replace(
  'images: [{ url: "/og-image.png", width: 1200, height: 630 }]',
  'images: [{ url: "https://funparks.app/screenshots/funparks_social.jpg", width: 1080, height: 1080, alt: "Funparks Theme Park App" }]'
);
fs.writeFileSync("app/promo/page.js", c, "utf8");
console.log("Fixed!");