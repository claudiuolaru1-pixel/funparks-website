const fs=require('fs');
let c=fs.readFileSync('app/api/generate/route.js','utf8');
if(c.charCodeAt(0)===0xFEFF)c=c.slice(1);

const oldTry=`  try {
    const parsed = JSON.parse(jsonStr);
    // Return the parsed object directly - no re-parsing needed on client
    return NextResponse.json({success:true, parsed});
  } catch(e) {
    // Try to fix common issues
    try {
      const fixed = jsonStr
        .replace(/[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F]/g,'')
        .replace(/\\t/g,' ');
      const parsed = JSON.parse(fixed);
      return NextResponse.json({success:true, parsed});
    } catch(e2) {
      return NextResponse.json({error:'JSON parse failed: '+e2.message,preview:jsonStr.substring(0,300)},{status:500});
    }
  }`;

const newTry=`  try {
    // Fix common JSON issues before parsing
    // 1. Replace literal newlines inside string values
    let fixed=jsonStr;
    // Replace newlines/tabs with spaces inside the JSON
    fixed=fixed.replace(/\\r\\n/g,'\\\\n').replace(/\\n/g,'\\\\n').replace(/\\r/g,'\\\\r').replace(/\\t/g,'\\\\t');
    // Fix any double-escaped sequences we may have created
    fixed=fixed.replace(/\\\\\\\\n/g,'\\\\n');
    try {
      const parsed = JSON.parse(fixed);
      return NextResponse.json({success:true, parsed});
    } catch(e1) {
      // Try original without newline fix
      try {
        const parsed = JSON.parse(jsonStr.replace(/[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F]/g,''));
        return NextResponse.json({success:true, parsed});
      } catch(e2) {
        return NextResponse.json({error:'JSON parse failed: '+e2.message,preview:jsonStr.substring(0,300)},{status:500});
      }
    }
  }`;

if(c.includes('Replace literal newlines')){
  console.log('Already fixed');
} else {
  c=c.replace(oldTry,newTry);
  if(c.includes('Replace literal newlines')){
    console.log('Fixed JSON parser');
  } else {
    console.log('Pattern not found - replacing entire try block by position');
    const tryIdx=c.indexOf('  try {');
    const endIdx=c.lastIndexOf('}');
    c=c.substring(0,tryIdx)+newTry+'\n}';
    console.log('Replaced by position');
  }
}

fs.writeFileSync('app/api/generate/route.js',c,'utf8');
console.log('Done');