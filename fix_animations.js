const fs=require('fs');

// Rewrite LatestBlog without AnimateOnScroll - pure CSS animations
let c=fs.readFileSync('components/LatestBlog.js','utf8');

// Remove AnimateOnScroll import and usage
c=c.replace("import AnimateOnScroll from './AnimateOnScroll';\n",'');
c=c.replace(/<AnimateOnScroll[^>]*>/g,'');
c=c.replace(/<\/AnimateOnScroll>/g,'');

// Fix the background so it contrasts with homepage
c=c.replace(
  "background:'#f8f7ff',padding:'80px 0'",
  "background:'white',padding:'80px 0',borderTop:'1px solid #f0f0f8'"
);

fs.writeFileSync('components/LatestBlog.js',c,'utf8');
console.log('LatestBlog simplified');

// Add scroll animation via pure CSS in globals.css
let css=fs.readFileSync('app/globals.css','utf8');
if(!css.includes('fadeInUp')){
  css+=`
/* Pure CSS scroll animations */
@keyframes fadeInUp {
  from { opacity:0; transform:translateY(24px); }
  to { opacity:1; transform:translateY(0); }
}
.fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16,1,0.3,1) both; }
.fade-in-up-1 { animation: fadeInUp 0.6s 0.1s cubic-bezier(0.16,1,0.3,1) both; }
.fade-in-up-2 { animation: fadeInUp 0.6s 0.2s cubic-bezier(0.16,1,0.3,1) both; }
.fade-in-up-3 { animation: fadeInUp 0.6s 0.3s cubic-bezier(0.16,1,0.3,1) both; }
/* Park card hover */
.park-card { transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease; }
.park-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.10) !important; border-color: #c4b5fd !important; }
/* Blog card hover */
.blog-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
.blog-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.08) !important; }
`;
  fs.writeFileSync('app/globals.css',css,'utf8');
  console.log('Added CSS animations');
}

// Add park-card class to parks page cards
let parks=fs.readFileSync('app/parks/page.js','utf8');
parks=parks.replace(
  /style=\{\{display:'block',background:'white',borderRadius:'16px',overflow:'hidden',border:'2px solid #f0f0f8',textDecoration:'none',boxShadow:'0 2px 8px rgba\(0,0,0,0\.04\)',transition:'transform 0\.2s ease, box-shadow 0\.2s ease'\}\}/g,
  "className='park-card' style={{display:'block',background:'white',borderRadius:'16px',overflow:'hidden',border:'2px solid #f0f0f8',textDecoration:'none',boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}"
);
// If no match try without transition
parks=parks.replace(
  /style=\{\{display:'block',background:'white',borderRadius:'16px',overflow:'hidden',border:'2px solid #f0f0f8',textDecoration:'none',boxShadow:'0 2px 8px rgba\(0,0,0,0\.04\)'\}\}/g,
  "className='park-card' style={{display:'block',background:'white',borderRadius:'16px',overflow:'hidden',border:'2px solid #f0f0f8',textDecoration:'none',boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}"
);
fs.writeFileSync('app/parks/page.js',parks,'utf8');
console.log('Park cards have hover class');

// Add blog-card class to LatestBlog cards
let blog=fs.readFileSync('components/LatestBlog.js','utf8');
blog=blog.replace(
  "className=\"featured-post hover-lift\"",
  "className=\"blog-card\""
);
fs.writeFileSync('components/LatestBlog.js',blog,'utf8');
console.log('Blog cards have hover class');

console.log('Done');