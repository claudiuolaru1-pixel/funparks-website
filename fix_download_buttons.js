const fs=require('fs');
const path=require('path');

const files=[
  'components/DownloadSection.js',
  'components/Footer.js',
  'components/Hero.js',
  'components/Navbar.js',
  'app/blog/[slug]/page.js',
  'app/parks/[id]/page.js',
];

files.forEach(f=>{
  const p=path.join(process.cwd(),f);
  if(!fs.existsSync(p))return;
  let c=fs.readFileSync(p,'utf8');
  const orig=c;

  // Replace download link text
  c=c.replace(/Download Free 🎢/g,'Coming Soon 🎢');
  c=c.replace(/Download Free →/g,'Coming Soon →');
  c=c.replace(/Download Free on Android/g,'Coming Soon on Android');
  c=c.replace(/Download Now/g,'Coming Soon');
  c=c.replace(/Get it Free/g,'Coming Soon');

  // Replace Google Play button labels
  c=c.replace(/Google Play/g,'Google Play — Soon');
  c=c.replace(/App Store/g,'App Store — Soon');

  // Disable the play.google.com links (replace href with #)
  c=c.replace(/href="https:\/\/play\.google\.com\/store\/apps[^"]*"/g,'href="#" onClick={(e)=>e.preventDefault()}');
  c=c.replace(/href='https:\/\/play\.google\.com\/store\/apps[^']*'/g,"href='#' onClick={(e)=>e.preventDefault()}");

  // Replace any apple store links too
  c=c.replace(/href="https:\/\/apps\.apple\.com[^"]*"/g,'href="#" onClick={(e)=>e.preventDefault()}');
  c=c.replace(/href='https:\/\/apps\.apple\.com[^']*'/g,"href='#' onClick={(e)=>e.preventDefault()}");

  if(c!==orig){
    fs.writeFileSync(p,c,'utf8');
    console.log('Updated:',f);
  } else {
    console.log('No changes:',f);
  }
});
console.log('Done');