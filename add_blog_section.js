const fs=require('fs');

// 1. Create LatestBlog component for homepage
const blogComponent=`import fs from 'fs';
import path from 'path';
import Link from 'next/link';

function getPosts(){
  try{
    const p=path.join(process.cwd(),'public','blog-posts.json');
    const raw=fs.readFileSync(p,'utf8').replace(/^\\uFEFF/,'');
    return JSON.parse(raw).slice(0,3);
  }catch{return[];}
}

export default function LatestBlog(){
  const posts=getPosts();
  if(!posts.length)return null;
  const [featured,...rest]=posts;
  return(
    <section style={{background:'#f8f7ff',padding:'80px 0'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'40px',flexWrap:'wrap',gap:'12px'}}>
          <div>
            <div style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'6px 14px',borderRadius:'999px',background:'white',border:'1px solid #e5e7eb',color:'#7c3aed',fontSize:'12px',fontWeight:700,marginBottom:'12px'}}>
              Latest from the Blog
            </div>
            <h2 style={{fontFamily:'Syne,sans-serif',fontSize:'clamp(1.8rem,3vw,2.5rem)',fontWeight:900,color:'#1a1a2e',margin:0}}>
              Park Guides & Travel Tips
            </h2>
          </div>
          <Link href="/blog" style={{padding:'10px 20px',borderRadius:'12px',background:'white',border:'2px solid #e5e7eb',color:'#374151',textDecoration:'none',fontSize:'14px',fontWeight:700}}>
            View All Posts
          </Link>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'20px'}}>
          {/* Featured post - larger */}
          <Link href={'/blog/'+featured.slug} style={{textDecoration:'none',gridColumn:'span 2',minWidth:0}}
            className="featured-post">
            <div style={{background:'white',borderRadius:'20px',overflow:'hidden',border:'2px solid #f0f0f8',boxShadow:'0 4px 20px rgba(0,0,0,0.06)',height:'100%',display:'flex',flexDirection:'column'}}>
              <div style={{background:'linear-gradient(135deg,#1a1a2e,#2d1b69)',padding:'40px 36px',flex:1,display:'flex',flexDirection:'column',justifyContent:'space-between',minHeight:'220px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'16px'}}>
                  <span style={{fontSize:'28px'}}>{featured.emoji||'🎢'}</span>
                  <span style={{padding:'4px 12px',borderRadius:'999px',background:'rgba(255,255,255,0.15)',color:'rgba(255,255,255,0.9)',fontSize:'12px',fontWeight:700}}>{featured.category}</span>
                  <span style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',marginLeft:'auto'}}>{featured.readTime} read</span>
                </div>
                <div>
                  <h3 style={{fontFamily:'Syne,sans-serif',fontSize:'clamp(1.2rem,2vw,1.6rem)',fontWeight:900,color:'white',margin:'0 0 10px',lineHeight:1.3}}>{featured.title}</h3>
                  <p style={{color:'rgba(255,255,255,0.6)',fontSize:'15px',margin:'0 0 16px',lineHeight:1.6}}>{featured.excerpt}</p>
                  <span style={{color:'#FF6B2B',fontSize:'13px',fontWeight:700}}>Read More →</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Smaller posts */}
          {rest.map(post=>(
            <Link key={post.slug} href={'/blog/'+post.slug} style={{textDecoration:'none'}}>
              <div style={{background:'white',borderRadius:'20px',overflow:'hidden',border:'2px solid #f0f0f8',boxShadow:'0 2px 12px rgba(0,0,0,0.04)',height:'100%',display:'flex',flexDirection:'column'}}>
                <div style={{padding:'24px',flex:1,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                  <div>
                    <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'12px'}}>
                      <span style={{fontSize:'20px'}}>{post.emoji||'🎢'}</span>
                      <span style={{padding:'3px 10px',borderRadius:'999px',background:'#f3f0ff',color:'#7c3aed',fontSize:'11px',fontWeight:700}}>{post.category}</span>
                    </div>
                    <h3 style={{fontFamily:'Syne,sans-serif',fontSize:'16px',fontWeight:900,color:'#1a1a2e',margin:'0 0 8px',lineHeight:1.4}}>{post.title}</h3>
                    <p style={{color:'#6b7280',fontSize:'13px',margin:'0 0 16px',lineHeight:1.6}}>{post.excerpt}</p>
                  </div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <span style={{color:'#9ca3af',fontSize:'12px',fontWeight:500}}>{post.readTime} read</span>
                    <span style={{color:'#FF6B2B',fontSize:'13px',fontWeight:700}}>Read →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync('components/LatestBlog.js',blogComponent,'utf8');
console.log('Created LatestBlog component');

// 2. Update homepage to include LatestBlog between ParksShowcase and SocialStrip
let page=fs.readFileSync('app/page.js','utf8');
if(!page.includes('LatestBlog')){
  page=page.replace(
    "import SocialStrip from '@/components/SocialStrip';",
    "import SocialStrip from '@/components/SocialStrip';\nimport LatestBlog from '@/components/LatestBlog';"
  );
  page=page.replace(
    '<SocialStrip />',
    '<LatestBlog /><SocialStrip />'
  );
  fs.writeFileSync('app/page.js',page,'utf8');
  console.log('Updated homepage with LatestBlog');
}