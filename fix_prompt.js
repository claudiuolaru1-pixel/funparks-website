const fs = require("fs");
let c = fs.readFileSync("app/agent/page.js", "utf8");

c = c.replace(
  '"youtube": "YouTube Shorts description max 120 words with strong CTA, mention funparks.app/blog",',
  '"youtube": "YouTube Shorts description max 120 words with strong CTA, always end with: Full guide at funparks.app/blog — link in bio!",\n'
);

c = c.replace(
  '"tiktok": "TikTok caption starting with viral hook (Nobody tells you... / POV: you just discovered... / This changes everything about...), 150-250 words, trending hashtags",',
  '"tiktok": "TikTok caption starting with viral hook (Nobody tells you... / POV: you just discovered... / This changes everything about...), 150-250 words, trending hashtags, always end with: Full guide at funparks.app/blog — link in bio! #funparks",\n'
);

fs.writeFileSync("app/agent/page.js", c, "utf8");
console.log("Done:", (c.match(/link in bio/g)||[]).length, "replacements");