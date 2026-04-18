const fs=require('fs');
const path=require('path');
const read=(p)=>fs.readFileSync(p,'utf8');
const write=(p,c)=>fs.writeFileSync(p,c,'utf8');

const oldIG='https://instagram.com/funparksapp';
const newIG='https://www.instagram.com/funparksworld/';
const oldTT='https://tiktok.com/@funparksapp';
const newTT='https://www.tiktok.com/@funparks';
const oldYT='https://youtube.com/@funparksapp';
const newYT='https://www.youtube.com/@Funparks-u7k';
const oldFB='https://facebook.com/funparksapp';
const newFB='https://www.facebook.com/funparks';

const files=[
  path.join('components','Navbar.js'),
  path.join('components','Footer.js'),
  path.join('components','SocialStrip.js'),
];

files.forEach(f=>{
  if(!fs.existsSync(f)){console.log('skip (not found):',f);return;}
  let c=read(f);
  c=c.replace(new RegExp(oldIG.replace(/\//g,'\\/').replace(/\./g,'\\.'),'g'),newIG);
  c=c.replace(new RegExp(oldTT.replace(/\//g,'\\/').replace(/\./g,'\\.'),'g'),newTT);
  c=c.replace(new RegExp(oldYT.replace(/\//g,'\\/').replace(/\./g,'\\.'),'g'),newYT);
  c=c.replace(new RegExp(oldFB.replace(/\//g,'\\/').replace(/\./g,'\\.'),'g'),newFB);
  write(f,c);
  console.log('updated:',f);
});
console.log('All social links updated!');