const fs=require('fs');
let c=fs.readFileSync('app/agent/page.js','utf8');

// 1. Save generated content to sessionStorage after generation
const oldSetBlog=`      setBlog(parsed.blog);
      setPosts({instagram:parsed.instagram,tiktok:parsed.tiktok,youtube:parsed.youtube,facebook:parsed.facebook});
      setHashtags(parsed.hashtags||[]);
      setSlug(newSlug);`;

const newSetBlog=`      setBlog(parsed.blog);
      setPosts({instagram:parsed.instagram,tiktok:parsed.tiktok,youtube:parsed.youtube,facebook:parsed.facebook});
      setHashtags(parsed.hashtags||[]);
      setSlug(newSlug);
      // Save to sessionStorage so content survives navigation
      try {
        sessionStorage.setItem('fp_blog',JSON.stringify(parsed.blog));
        sessionStorage.setItem('fp_posts',JSON.stringify({instagram:parsed.instagram,tiktok:parsed.tiktok,youtube:parsed.youtube,facebook:parsed.facebook}));
        sessionStorage.setItem('fp_hashtags',JSON.stringify(parsed.hashtags||[]));
        sessionStorage.setItem('fp_slug',newSlug);
        sessionStorage.setItem('fp_category',category);
      } catch(e){}`;

c=c.replace(oldSetBlog,newSetBlog);

// 2. Restore from sessionStorage on load
const oldStates=`  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('Park Guide');
  const [tone, setTone] = useState('fun');
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  const [posts, setPosts] = useState({});
  const [hashtags, setHashtags] = useState([]);
  const [slug, setSlug] = useState('');
  const [script, setScript] = useState('');
  const [copied, setCopied] = useState({});
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [publishError, setPublishError] = useState('');`;

const newStates=`  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState(()=>{try{return sessionStorage.getItem('fp_category')||'Park Guide';}catch{return 'Park Guide';}});
  const [tone, setTone] = useState('fun');
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(()=>{try{const s=sessionStorage.getItem('fp_blog');return s?JSON.parse(s):null;}catch{return null;}});
  const [posts, setPosts] = useState(()=>{try{const s=sessionStorage.getItem('fp_posts');return s?JSON.parse(s):{};}catch{return {};}});
  const [hashtags, setHashtags] = useState(()=>{try{const s=sessionStorage.getItem('fp_hashtags');return s?JSON.parse(s):[];}catch{return [];}});
  const [slug, setSlug] = useState(()=>{try{return sessionStorage.getItem('fp_slug')||'';}catch{return '';}});
  const [script, setScript] = useState('');
  const [copied, setCopied] = useState({});
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [publishError, setPublishError] = useState('');`;

c=c.replace(oldStates,newStates);
console.log('State persistence added:',c.includes('sessionStorage'));

// 3. Fix the prompt to use specific affiliate search URLs
const oldPrompt=`- For skip-the-line / fast track content: link to GetYourGuide (partner_id=GVNQTTL)
- For tours and experiences: link to Viator (pid=P00298240)  
- For Asian parks: link to Klook (aid=119449)
- For hotel recommendations: link to Booking.com (aid=4347407)
- CTAs should feel natural, not salesy. Example: "You can book skip-the-line tickets on GetYourGuide here"
- End blog post with a clear CTA section with 2-3 affiliate links`;

const newPrompt=`- For skip-the-line tickets: use this exact URL format: https://www.getyourguide.com/s/?q=PARKNAME+skip+the+line&partner_id=GVNQTTL (replace PARKNAME with the actual park name)
- For tours and experiences: use this exact URL format: https://www.viator.com/search/PARKNAME+tours?pid=P00298240&mcid=42383&medium=link (replace PARKNAME)
- For Asian parks use Klook: https://affiliate.klook.com/redirect?aid=119449&k_site=https://www.klook.com/search/?query=PARKNAME (replace PARKNAME)
- For hotel recommendations: https://www.booking.com/searchresults.html?aid=4347407&ss=CITY+near+PARKNAME (replace CITY and PARKNAME)
- Always use the actual park name and city in the URLs, never generic URLs
- End blog post with a ## Plan Your Visit section containing 2-3 specific affiliate links as markdown: [Link Text](URL)`;

c=c.replace(oldPrompt,newPrompt);
console.log('Prompt fixed:',c.includes('replace PARKNAME'));

fs.writeFileSync('app/agent/page.js',c,'utf8');
console.log('Done');