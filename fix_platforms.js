const fs=require('fs');
const files=['app/parks/[id]/page.js'];
files.forEach(f=>{
  const p=require('path').join(process.cwd(),f);
  if(!fs.existsSync(p))return;
  let c=fs.readFileSync(p,'utf8');
  // Replace getAffiliateUrls function entirely
  const oldFn=/function getAffiliateUrls[\s\S]*?^}/m;
  const newFn=`function getAffiliateUrls(country,city,name){
  const skipQ=encodeURIComponent(\`\${city||''} \${name}\`.trim());
  const toursQ=encodeURIComponent(\`\${city||''} \${name} tours\`.trim());
  return{
    skipUrl:\`https://www.getyourguide.com/s/?q=\${skipQ}&filters=activity_type%3ASkip+the+Line&partner_id=GVNQTTL\`,
    toursUrl:\`https://www.viator.com/search/\${toursQ}?pid=P00298240&mcid=42383&medium=link\`
  };
}`;
  c=c.replace(oldFn,newFn);
  fs.writeFileSync(p,c,'utf8');
  console.log('Fixed:',f);
});