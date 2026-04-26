const fs=require('fs');
let c=fs.readFileSync('app/api/generate/route.js','utf8');

// Remove BOM
if(c.charCodeAt(0)===0xFEFF)c=c.slice(1);

// Return the raw text so we can debug what Claude actually returns
const oldReturn=`  const data = await res.json();
  // Log for debugging
  if(data.error){
    console.error('Claude API error:',JSON.stringify(data));
    return NextResponse.json({error:'Claude API error: '+data.error.message,details:data},{status:500});
  }
  return NextResponse.json(data);`;

const newReturn=`  const data = await res.json();
  if(data.error){
    return NextResponse.json({error:'API error: '+JSON.stringify(data.error),raw:data},{status:500});
  }
  if(!data.content||!data.content.length){
    return NextResponse.json({error:'Empty response. Type: '+data.type+' Keys: '+Object.keys(data).join(','),raw:data},{status:500});
  }
  return NextResponse.json(data);`;

c=c.replace(oldReturn,newReturn);

// Use haiku for testing - known working model
c=c.replace("model: 'claude-sonnet-4-20250514'","model: 'claude-haiku-4-5-20251001'");

fs.writeFileSync('app/api/generate/route.js',c,'utf8');
console.log('Fixed. Model: haiku, BOM removed');