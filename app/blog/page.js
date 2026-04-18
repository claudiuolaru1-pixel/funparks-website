export const metadata = { title: 'Blog — Funparks', description: 'Theme park guides, tips, ride reviews and app updates.' };

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
