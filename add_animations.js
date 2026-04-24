const fs=require('fs');

// Add AnimateOnScroll to LatestBlog component
let blog=fs.readFileSync('components/LatestBlog.js','utf8');
if(!blog.includes('AnimateOnScroll')){
  blog=`import AnimateOnScroll from './AnimateOnScroll';\n`+blog;
  // Wrap the heading
  blog=blog.replace(
    '<div style={{display:\'flex\',alignItems:\'center\',justifyContent:\'space-between\',marginBottom:\'40px\',flexWrap:\'wrap\',gap:\'12px\'}}>',
    '<AnimateOnScroll animation="fadeUp"><div style={{display:\'flex\',alignItems:\'center\',justifyContent:\'space-between\',marginBottom:\'40px\',flexWrap:\'wrap\',gap:\'12px\'}}>'
  );
  blog=blog.replace(
    '</Link>\n        </div>\n\n        <div style={{display:\'grid\'',
    '</Link>\n        </div>\n        </AnimateOnScroll>\n\n        <div style={{display:\'grid\''
  );
  // Wrap featured post
  blog=blog.replace(
    '          {/* Featured post - larger */}\n          <Link href={',
    '          {/* Featured post - larger */}\n          <AnimateOnScroll animation="fadeUp" delay={100}>\n          <Link href={'
  );
  blog=blog.replace(
    'className="featured-post">',
    'className="featured-post hover-lift">'
  );
  // Close AnimateOnScroll after featured
  blog=blog.replace(
    '          </Link>\n\n          {/* Smaller posts */}',
    '          </Link>\n          </AnimateOnScroll>\n\n          {/* Smaller posts */}'
  );
  fs.writeFileSync('components/LatestBlog.js',blog,'utf8');
  console.log('LatestBlog animated');
}

// Add hover-lift to park cards in parks page
let parks=fs.readFileSync('app/parks/page.js','utf8');
parks=parks.replace(
  /style=\{\{display:'block',background:'white',borderRadius:'16px',overflow:'hidden',border:'2px solid #f0f0f8',textDecoration:'none',boxShadow:'0 2px 8px rgba\(0,0,0,0\.04\)'\}\}/g,
  "style={{display:'block',background:'white',borderRadius:'16px',overflow:'hidden',border:'2px solid #f0f0f8',textDecoration:'none',boxShadow:'0 2px 8px rgba(0,0,0,0.04)',transition:'transform 0.2s ease, box-shadow 0.2s ease'}} onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 12px 32px rgba(0,0,0,0.12)';}} onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.04)';}}"
);
fs.writeFileSync('app/parks/page.js',parks,'utf8');
console.log('Parks hover animation added');

// Add hover to park detail buttons
let parkDetail=fs.readFileSync('app/parks/[id]/page.js','utf8');
// Already has inline styles, just verify
console.log('Park detail has buttons:',parkDetail.includes('Get Your Tickets'));

console.log('Done');