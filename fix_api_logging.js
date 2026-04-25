const fs=require('fs');
let c=fs.readFileSync('app/api/generate/route.js','utf8');

// Add logging to see what Claude returns
const oldReturn=`  const data = await res.json();
  return NextResponse.json(data);`;

const newReturn=`  const data = await res.json();
  // Log for debugging
  if(data.error){
    console.error('Claude API error:',JSON.stringify(data));
    return NextResponse.json({error:'Claude API error: '+data.error.message,details:data},{status:500});
  }
  return NextResponse.json(data);`;

c=c.replace(oldReturn,newReturn);
fs.writeFileSync('app/api/generate/route.js',c,'utf8');
console.log('Added error logging');