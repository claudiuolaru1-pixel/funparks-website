const fs = require('fs');
const path = require('path');
const site = 'C:/Users/claud/OneDrive/Desktop/funparks-website';
const write = (p, c) => {
  fs.mkdirSync(path.dirname(p), {recursive:true});
  fs.writeFileSync(p, c, 'utf8');
  console.log('wrote:', p.replace(site,''));
};

// ─── BLOG DATA FILE ───────────────────────────────────────────────────────────
write(site+'/public/blog-posts.json', JSON.stringify([
  {
    slug: 'how-to-beat-the-queue-steel-vengeance',
    title: 'How to Beat the Queue at Steel Vengeance',
    excerpt: "Steel Vengeance at Cedar Point regularly hits 2-hour waits by 10am. Here's the exact strategy to ride it multiple times in a day.",
    category: 'Park Guide',
    emoji: '🎢',
    date: '2026-04-10',
    readTime: '5 min',
    content: `Steel Vengeance at Cedar Point is the most critically acclaimed roller coaster ever built — and also one of the hardest to ride without a long wait. Here is exactly how to beat the queue.

**Arrive at park opening**

The single most important thing you can do is arrive before the gates open. Steel Vengeance is at the back of the park in Frontier Town. Walk, don't stroll. You have about 15 minutes before queues start building.

**Use Fast Lane Plus**

Cedar Point's Fast Lane Plus covers Steel Vengeance and is worth every dollar on busy days. Buy it online the day before — it sells out on peak days.

**Best times to ride**

The best windows are: the first 30 minutes after opening, the last hour before close, and during evening fireworks shows when crowds thin dramatically.

**The single rider line**

Steel Vengeance has a single rider line that moves significantly faster than the main queue. If you don't mind splitting from your group, this is the fastest way in.

**Check the app**

The Funparks app shows real-time wait times for Steel Vengeance and all Cedar Point attractions. Check it before you commit to a queue — sometimes Maverick or Millennium Force are shorter and equally spectacular.

**Pro tip: Early Entry**

Staying at Hotel Breakers gives you Early Entry — 30 minutes before general admission. That 30-minute head start on Steel Vengeance is worth more than almost any other perk at any American theme park.`
  },
  {
    slug: 'tokyo-disneyland-vs-disneysea',
    title: 'Tokyo Disneyland vs DisneySea — Which Should You Visit?',
    excerpt: 'Two extraordinary parks, one trip to Japan. We break down everything you need to know to choose — or convince yourself to do both.',
    category: 'Comparison',
    emoji: '🇯🇵',
    date: '2026-03-28',
    readTime: '8 min',
    content: `Tokyo DisneySea is widely considered the greatest theme park ever built. Tokyo Disneyland is a perfect recreation of the original Disneyland with Japanese precision and attention to detail that exceeds anything in California or Florida. Together they form the greatest theme park destination on Earth.

**Tokyo Disneyland**

If you love classic Disney magic — Cinderella's Castle, Space Mountain, Haunted Mansion, Pirates of the Caribbean — Tokyo Disneyland delivers these in their finest form. The park is immaculately maintained and the attention to detail is extraordinary. The food is also significantly better than any other Disney park worldwide.

**Tokyo DisneySea**

DisneySea is genuinely unlike any other theme park in the world. Seven themed ports of call arranged around a volcano and a lagoon. Journey to the Center of the Earth. Tower of Terror with an original storyline. Indiana Jones Adventure. Soaring: Fantastic Flight. Fantasy Springs. There is nothing comparable anywhere.

**Which one should you choose?**

If you can only do one — DisneySea. It is the more unique experience and the one that exists nowhere else. Disneyland is extraordinary but you can visit a version of it in California or Florida.

If you can do both — visit Disneyland first, DisneySea second. End your Tokyo Disney trip at DisneySea for the most magical possible finale.

**Practical tips**

Book tickets on the official Oriental Land Company website well in advance. DisneySea sells out faster. Stay at the MiraCosta Hotel inside DisneySea for the most extraordinary theme park hotel experience in the world.`
  }
], null, 2));

// ─── BLOG LIST PAGE ───────────────────────────────────────────────────────────
write(site+'/app/blog/page.js', `export const metadata = { title: 'Blog — Funparks', description: 'Theme park guides, tips, ride reviews and app updates.' };

async function getPosts() {
  try {
    const fs = require('fs');
    const path = require('path');
    const file = path.join(process.cwd(), 'public', 'blog-posts.json');
    const data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
  } catch(e) { return []; }
}

export default async function BlogPage() {
  const posts = await getPosts();
  const accents = ['#FF6B2B','#f43f5e','#a855f7','#06b6d4','#10b981','#f59e0b'];
  return (
    <div className="min-h-screen pt-32 pb-24" style={{background:'#f8f7ff'}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-purple-100 text-purple-600 text-sm font-bold mb-6">✍️ Blog</div>
          <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-4" style={{fontFamily:'Syne,sans-serif'}}>
            Park guides,<br/><span style={{background:'linear-gradient(135deg,#FF6B2B,#f43f5e,#a855f7)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>tips & stories</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-lg">Insider guides, ride reviews, park tips and app updates from the Funparks team.</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-lg font-semibold">No posts yet — check back soon!</p>
          </div>
        ) : (
          <>
            {/* Featured post */}
            <a href={'/blog/'+posts[0].slug} className="block bg-white rounded-3xl p-8 mb-8 border-2 border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-lg" style={{background:'linear-gradient(135deg,#fff7f5,#fdf4ff)'}}>{posts[0].emoji}</div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold px-3 py-1 rounded-full" style={{background:'#FF6B2B'+'15',color:'#FF6B2B'}}>{posts[0].category}</span>
                    <span className="text-gray-400 text-xs font-medium">Featured</span>
                  </div>
                  <h2 className="text-gray-900 font-black text-2xl mb-2 group-hover:text-purple-600 transition-colors" style={{fontFamily:'Syne,sans-serif'}}>{posts[0].title}</h2>
                  <p className="text-gray-500 text-sm mb-4 max-w-2xl leading-relaxed">{posts[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-gray-400 text-xs font-medium">
                    <span>{new Date(posts[0].date).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</span>
                    <span>·</span><span>{posts[0].readTime} read</span>
                  </div>
                </div>
              </div>
            </a>

            {/* Post grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.slice(1).map((p,i)=>(
                <a key={p.slug} href={'/blog/'+p.slug} className="block bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-purple-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-sm" style={{background:'linear-gradient(135deg,#fff7f5,#fdf4ff)'}}>{p.emoji}</div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block" style={{background:accents[i%accents.length]+'15',color:accents[i%accents.length]}}>{p.category}</span>
                  <h2 className="text-gray-900 font-black text-base mb-2 group-hover:text-purple-600 transition-colors" style={{fontFamily:'Syne,sans-serif'}}>{p.title}</h2>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{p.excerpt}</p>
                  <div className="flex gap-3 text-gray-400 text-xs font-medium">
                    <span>{new Date(p.date).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span>
                    <span>·</span><span>{p.readTime} read</span>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
`);

// ─── INDIVIDUAL BLOG POST PAGE ────────────────────────────────────────────────
write(site+'/app/blog/[slug]/page.js', `import { notFound } from 'next/navigation';

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
  return text.split('\\n\\n').map((para, i) => {
    if (para.startsWith('**') && para.endsWith('**')) {
      return '<h3 style="font-family:Syne,sans-serif;font-size:20px;font-weight:800;color:#1a1a2e;margin:28px 0 12px">' + para.replace(/\\*\\*/g,'') + '</h3>';
    }
    const formatted = para.replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>');
    return '<p style="color:#374151;line-height:1.8;margin-bottom:16px;font-size:16px">' + formatted + '</p>';
  }).join('');
}

export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  const shareUrl = \`https://funparks.app/blog/\${post.slug}\`;

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
              {name:'Facebook',color:'#1877F2',url:\`https://www.facebook.com/sharer/sharer.php?u=\${encodeURIComponent(shareUrl)}\`},
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
`);

console.log('\n✅ Blog system written! Run: npm run dev to test, then git push to deploy.');
