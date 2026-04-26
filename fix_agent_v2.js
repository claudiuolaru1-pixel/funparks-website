const fs=require('fs');
const lines=fs.readFileSync('app/agent/page.js','utf8').split('\n');

// 1. Fix category useState at line 104 (index 103)
lines[103]="  const [category, setCategory] = useState(()=>{try{return sessionStorage.getItem('fp_category')||'Park Guide';}catch{return 'Park Guide';}});";

// 2. Fix blog useState at line ~105-110 - find them
for(let i=100;i<115;i++){
  if(lines[i].includes("const [blog, setBlog] = useState(null)")){
    lines[i]="  const [blog, setBlog] = useState(()=>{try{const s=sessionStorage.getItem('fp_blog');return s?JSON.parse(s):null;}catch{return null;}});";
    console.log('Fixed blog state at',i+1);
  }
  if(lines[i].includes("const [posts, setPosts] = useState({})")){
    lines[i]="  const [posts, setPosts] = useState(()=>{try{const s=sessionStorage.getItem('fp_posts');return s?JSON.parse(s):{};}catch{return {};}});";
    console.log('Fixed posts state at',i+1);
  }
  if(lines[i].includes("const [hashtags, setHashtags] = useState([])")){
    lines[i]="  const [hashtags, setHashtags] = useState(()=>{try{const s=sessionStorage.getItem('fp_hashtags');return s?JSON.parse(s):[];}catch{return [];}});";
    console.log('Fixed hashtags state at',i+1);
  }
  if(lines[i].includes("const [slug, setSlug] = useState('')")){
    lines[i]="  const [slug, setSlug] = useState(()=>{try{return sessionStorage.getItem('fp_slug')||'';}catch{return '';}});";
    console.log('Fixed slug state at',i+1);
  }
}

// 3. Save to sessionStorage after generation - after line 199 (setHashtags)
for(let i=195;i<205;i++){
  if(lines[i] && lines[i].includes('setHashtags(parsed.hashtags')){
    lines.splice(i+1,0,
      "      try{sessionStorage.setItem('fp_blog',JSON.stringify(parsed.blog));sessionStorage.setItem('fp_posts',JSON.stringify({instagram:parsed.instagram,tiktok:parsed.tiktok,youtube:parsed.youtube,facebook:parsed.facebook}));sessionStorage.setItem('fp_hashtags',JSON.stringify(parsed.hashtags||[]));sessionStorage.setItem('fp_slug',newSlug);sessionStorage.setItem('fp_category',category);}catch(e){}"
    );
    console.log('Added sessionStorage save at',i+2);
    break;
  }
}

// 4. Fix prompt - line 160 area
for(let i=155;i<175;i++){
  if(lines[i] && lines[i].includes('skip-the-line / fast track content')){
    lines[i]="- For skip-the-line tickets: use URL https://www.getyourguide.com/s/?q=PARKNAME+skip+the+line&partner_id=GVNQTTL replacing PARKNAME with actual park name";
    console.log('Fixed prompt line',i+1);
  }
  if(lines[i] && lines[i].includes('For tours and experiences: link to Viator')){
    lines[i]="- For tours: use URL https://www.viator.com/search/PARKNAME+tours?pid=P00298240&mcid=42383&medium=link replacing PARKNAME";
  }
  if(lines[i] && lines[i].includes('For Asian parks: link to Klook')){
    lines[i]="- For Asian parks: use URL https://affiliate.klook.com/redirect?aid=119449&k_site=https://www.klook.com/search/?query=PARKNAME replacing PARKNAME";
  }
  if(lines[i] && lines[i].includes('For hotel recommendations: link to Booking')){
    lines[i]="- For hotels: use URL https://www.booking.com/searchresults.html?aid=4347407&ss=CITY+PARKNAME replacing CITY and PARKNAME";
  }
  if(lines[i] && lines[i].includes('Always use the actual park name')){
    lines[i]="- Always use actual park names in URLs, never generic URLs";
  }
}

fs.writeFileSync('app/agent/page.js',lines.join('\n'),'utf8');
console.log('Done. Lines:',lines.length);