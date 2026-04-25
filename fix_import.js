const fs=require('fs');
let c=fs.readFileSync('app/agent/page.js','utf8');
c=c.replace(
  "import ImageCard from '../components/ImageCard';",
  "import ImageCard from '../../components/ImageCard';"
);
fs.writeFileSync('app/agent/page.js',c,'utf8');
console.log('Fixed import path');