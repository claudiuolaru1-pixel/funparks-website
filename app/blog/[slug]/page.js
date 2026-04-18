import { notFound } from 'next/navigation';

async function getPost(slug) {
  try {
    const fs = require('fs');
    const path = require('path');
    const file = path.join(process.cwd(), 'public', 'blog-posts.json');
    const posts = JSON.parse(fs.readFileSync(file, 'utf8'));
    return posts.find(p => p.slug === slug) || null;
  } catch(e) { return null; }
}

async function getAllSlugs() {
  try {
    const fs = require('fs');
    const path = require('path');
    const file = path.join(process.cwd(), 'public', 'blog-posts.json');
    const posts = JSON.parse(fs.readFileSync(file, 'utf8'));
    return posts.map(p => ({ slug: p.slug }));
  } catch(e) { return []; }
}

export async function generateStaticParams() {
  return getAllSlugs();
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Post not found' };
  return { title: post.title + ' — Funparks Blog', description: post.excerpt };
}

function renderContent(text) {
  return text.split('\n\n').map((para, i) => {
    if (para.startsWith('**') && para.endsWith('**')) {
      return '<h3 style="font-family:Syne,sans-serif;font-size:20px;font-weight:800;color:#1a1a2e;margin:28px 0 12px">' + para.replace(/\*\*/g,'') + '</h3>';
    }
    const formatted = para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    return '<p style="color:#374151;line-height:1.8;margin-bottom:16px;font-size:16px">' + formatted + '</p>';
  }).join('');
}

export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  const shareUrl = `https://funparks.app/blog/${post.slug}`;

  return (
    <div className="min-h-screen pt-32 pb-24" style={{background:'#f8f7ff'}}>
      <div className="max-w-3xl mx-auto px-6">
        {/* Back */}
        <a href="/blog" className="inline-flex items-center gap-2 text-purple-600 font-bold text-sm mb-8 hover:text-purple-800 transition-colors">
          ← Back to Blog
        </a>

        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-bold px-3 py-1 rounded-full inline-block mb-4" style={{background:'#FF6B2B'+'15',color:'#FF6B2B'}}>{post.category}</span>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight" style={{fontFamily:'Syne,sans-serif'}}>{post.emoji} {post.title}</h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-4">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-gray-400 text-sm font-medium pb-6 border-b-2 border-gray-100">
            <span>📅 {new Date(post.date).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</span>
            <span>·</span><span>⏱️ {post.readTime} read</span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8"
          dangerouslySetInnerHTML={{__html: renderContent(post.content)}} />

        {/* Share */}
        <div className="bg-white rounded-2xl p-6 border-2 border-purple-100">
          <p className="font-black text-gray-900 mb-4" style={{fontFamily:'Syne,sans-serif'}}>Share this post 📤</p>
          <div className="flex flex-wrap gap-3">
            {[
              {name:'Instagram',color:'#E1306C',url:'https://www.instagram.com/funparksworld/'},
              {name:'TikTok',color:'#010101',url:'https://www.tiktok.com/@funparks'},
              {name:'Facebook',color:'#1877F2',url:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`},
              {name:'Copy Link',color:'#a855f7',url:null},
            ].map(s=>(
              s.url ? (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90"
                  style={{background:s.color}}>{s.name}</a>
              ) : (
                <button key={s.name} onClick={"navigator.clipboard.writeText('"+shareUrl+"').then(()=>alert('Link copied!'))"}
                  className="px-4 py-2 rounded-xl text-white text-sm font-bold"
                  style={{background:s.color}}>{s.name} 🔗</button>
              )
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-3 font-medium">🔗 {shareUrl}</p>
        </div>

        {/* CTA */}
        <div className="mt-8 rounded-3xl p-8 text-white text-center" style={{background:'linear-gradient(135deg,#1a1a2e,#2d1b69)'}}>
          <p className="text-2xl font-black mb-2" style={{fontFamily:'Syne,sans-serif'}}>Get the Funparks app 🎢</p>
          <p className="text-white/60 mb-6 text-sm">Real-time wait times, AI assistant, 57 parks worldwide. Free forever.</p>
          <a href="https://play.google.com/store/apps/details?id=com.funparks.app" target="_blank" rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-xl font-bold text-sm shadow-xl"
            style={{background:'linear-gradient(135deg,#FF6B2B,#f43f5e,#a855f7)'}}>
            Download Free →
          </a>
        </div>
      </div>
    </div>
  );
}
