const fs=require('fs');
const path='app/agent/page.js';
let c=fs.readFileSync(path,'utf8');

// All replacements use Buffer-based detection - no emoji literals in this file
// Broken UTF-8 sequences appear as latin1 misread unicode
// We replace by detecting the byte patterns as latin1 strings

function fixMojibake(str){
  // Each broken emoji is UTF-8 bytes read as latin1
  // We detect them by their characteristic byte patterns
  const buf=Buffer.from(str,'latin1');
  const out=[];
  let i=0;
  while(i<buf.length){
    // 4-byte UTF-8 emoji: F0 9X XX XX -> appears as 4 latin1 chars: \u00f0 \u009X \u00XX \u00XX
    if(buf[i]===0xf0 && i+3<buf.length){
      const cp=((buf[i]&0x07)<<18)|((buf[i+1]&0x3f)<<12)|((buf[i+2]&0x3f)<<6)|(buf[i+3]&0x3f);
      out.push(String.fromCodePoint(cp));
      i+=4;
    // 3-byte UTF-8: E0-EF XX XX
    } else if(buf[i]>=0xe0 && buf[i]<=0xef && i+2<buf.length){
      const cp=((buf[i]&0x0f)<<12)|((buf[i+1]&0x3f)<<6)|(buf[i+2]&0x3f);
      out.push(String.fromCodePoint(cp));
      i+=3;
    // 2-byte UTF-8: C2-DF XX  
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

// Check if file has mojibake (broken emojis show as sequences starting with \u00f0)
const hasMojibake=c.includes('\u00f0\u009f');
console.log('Has mojibake:',hasMojibake);

if(hasMojibake){
  c=fixMojibake(c);
  fs.writeFileSync(path,c,'utf8');
  console.log('Fixed!');
} else {
  console.log('No fix needed');
}

console.log('Has Weekly Schedule:',c.includes('Weekly Schedule'));
console.log('Has PLATFORMS:',c.includes('PLATFORMS'));
