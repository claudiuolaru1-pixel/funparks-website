const fs=require('fs');
const path='app/agent/page.js';
let c=fs.readFileSync(path,'utf8');

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

// Check for any mojibake - just look for \u00f0 anywhere
const hasMojibake=c.includes('\u00f0');
console.log('Has mojibake:',hasMojibake);

if(hasMojibake){
  c=fixMojibake(c);
  fs.writeFileSync(path,c,'utf8');
  console.log('Fixed!');
  console.log('Sample:', c.split('\n').find(l=>l.includes('Monday'))?.trim().substring(0,60));
} else {
  console.log('No fix needed');
}
