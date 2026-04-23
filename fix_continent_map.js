const fs=require('fs');
const path=require('path');

const oldMap = `const continentMap={
  'USA':'Americas','United States':'Americas','Canada':'Americas','Argentina':'Americas',
  'Chile':'Americas','Brazil':'Americas','Mexico':'Americas',
  'Japan':'Asia','China':'Asia','South Korea':'Asia','Hong Kong':'Asia',
  'Singapore':'Asia','Thailand':'Asia','Taiwan':'Asia','Indonesia':'Asia',
  'Malaysia':'Asia','Philippines':'Asia',
  'Germany':'Europe','France':'Europe','Netherlands':'Europe','Belgium':'Europe',
  'Spain':'Europe','Italy':'Europe','United Kingdom':'Europe','Sweden':'Europe',
  'Denmark':'Europe','Poland':'Europe',
  'UAE':'Middle East',
  'Australia':'Oceania','New Zealand':'Oceania',
  'South Africa':'Africa',
};`;

const newMap = `const continentMap={
  'USA':'Americas','United States':'Americas','Canada':'Americas','Argentina':'Americas',
  'Chile':'Americas','Brazil':'Americas','Mexico':'Americas',
  'Japan':'Asia','China':'Asia','South Korea':'Asia','Hong Kong':'Asia',
  'Singapore':'Asia','Thailand':'Asia','Taiwan':'Asia','Indonesia':'Asia',
  'Malaysia':'Asia','Philippines':'Asia',
  'Germany':'Europe','France':'Europe','Netherlands':'Europe','Belgium':'Europe',
  'Spain':'Europe','Italy':'Europe','United Kingdom':'Europe','Sweden':'Europe',
  'Denmark':'Europe','Poland':'Europe','Portugal':'Europe',
  'UAE':'Middle East','United Arab Emirates':'Middle East',
  'Australia':'Oceania','New Zealand':'Oceania',
  'South Africa':'Africa',
};`;

const files=[
  'app/parks/page.js',
  'app/parks/[id]/page.js',
];

files.forEach(f=>{
  const p=path.join(process.cwd(),f);
  if(!fs.existsSync(p)){console.log('Not found:',f);return;}
  let c=fs.readFileSync(p,'utf8');
  if(c.includes("'UAE':'Middle East'")){
    c=c.replace(oldMap,newMap);
    fs.writeFileSync(p,c,'utf8');
    console.log('Fixed:',f);
  } else {
    console.log('Pattern not found in:',f);
  }
});