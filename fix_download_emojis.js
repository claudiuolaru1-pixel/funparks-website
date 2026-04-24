const fs=require('fs');

function fixMojibake(str){
  const buf=Buffer.from(str,'latin1');
  const out=[];
  let i=0;
  while(i<buf.length){
    if(buf[i]===0xf0 && i+3<buf.length){
      const cp=((buf[i]&0x07)<<18)|((buf[i+1]&0x3f)<<12)|((buf[i+2]&0x3f)<<6)|(buf[i+3]&0x3f);
      out.push(String.fromCodePoint(cp));
      i+=4;
    } else if(buf[i]>=0xe0 && buf[i]<=0xef && i+2<buf.length){
      const cp=((buf[i]&0x0f)<<12)|((buf[i+1]&0x3f)<<6)|(buf[i+2]&0x3f);
      out.push(String.fromCodePoint(cp));
      i+=3;
    } else if(buf[i]>=0xc2 && buf[i]<=0xdf && i+1<buf.length){
      const cp=((buf[i]&0x1f)<<6)|(buf[i+1]&0x3f);
      out.push(String.fromCodePoint(cp));
      i+=2;
    } else {
      out.push(String.fromCharCode(buf[i]));
      i++;
    }
  }
  return out.join('');
}

const files=[
  'components/DownloadSection.js',
  'components/Hero.js',
  'components/Footer.js',
  'components/Navbar.js',
  'components/Stats.js',
  'components/Features.js',
  'components/SocialStrip.js',
  'app/agent/page.js',
];

files.forEach(f=>{
  if(!require('fs').existsSync(f))return;
  let c=fs.readFileSync(f,'utf8');
  if(c.includes('\u00f0\u009f')||c.includes('\u00e2\u0080')||c.includes('\u00c3')){
    c=fixMojibake(c);
    fs.writeFileSync(f,c,'utf8');
    console.log('Fixed:',f);
  } else {
    console.log('Clean:',f);
  }
});
