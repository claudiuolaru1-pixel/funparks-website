const fs=require('fs');
const path=require('path');
const files=[
  'components/Hero.js',
  'components/Stats.js',
  'components/ParksShowcase.js',
  'components/DownloadSection.js',
  'components/Footer.js',
  'app/page.js',
  'app/about/page.js',
  'app/parks/page.js',
];
let total=0;
files.forEach(f=>{
  const p=path.join(process.cwd(),f);
  if(!fs.existsSync(p))return;
  let c=fs.readFileSync(p,'utf8');
  const u=c
    .replace(/57\+/g,'64+')
    .replace(/57 parks/g,'64 parks')
    .replace(/57\+ parks/g,'64+ parks')
    .replace(/\b57\b/g,'64');
  if(c!==u){fs.writeFileSync(p,u,'utf8');console.log('updated:',f);total++;}
});
console.log('done, updated',total,'files');