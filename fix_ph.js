const fs = require('fs');
const file = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\funparks-website\\components\\Hero.js";
let c = fs.readFileSync(file, 'utf8');
c = c.replace(
  '<p className="text-sm font-medium" style={{color:"rgba(255,255,255,0.25)"}}>Free forever',
  '<a href="https://www.producthunt.com/products/funparks-theme-park-guide?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-funparks-theme-park-guide" target="_blank" rel="noopener noreferrer" style={{display:"inline-block",marginBottom:"16px"}}>\n            <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1190158&theme=light" alt="Funparks on Product Hunt" width="250" height="54" />\n          </a>\n          <p className="text-sm font-medium" style={{color:"rgba(255,255,255,0.25)"}}>Free forever'
);
fs.writeFileSync(file, c, 'utf8');
console.log('Done');