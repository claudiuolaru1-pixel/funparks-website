import { readFileSync } from 'fs';
import { join } from 'path';
import { notFound } from 'next/navigation';

function getPosts() {
  try {
    const data = readFileSync(join(process.cwd(), 'public', 'blog-posts.json'), 'utf8');
    return JSON.parse(data);
  } catch(e) { return []; }
}

export async function generateMetadata({ params }) {
  const posts = getPosts();
  const post = posts.find(p => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };
  const url = `https://funparks.app/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: ['theme park', post.category, 'funparks', 'theme park guide'],
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: `${post.date}T00:00:00.000Z`,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: post.title }],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt, images: ['/og-image.png'] },
    alternates: { canonical: url },
  };
}

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map(p => ({ slug: p.slug }));
}

function renderMarkdown(content) {
  if (!content) return '';
  return content
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-gray-900 mt-8 mb-3" style="font-family:Syne,sans-serif">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-black text-gray-900 mt-10 mb-4" style="font-family:Syne,sans-serif">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-black text-gray-900 mt-8 mb-4" style="font-family:Syne,sans-serif">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-purple-600 hover:text-purple-800 underline font-medium" target="_blank" rel="noopener">$1</a>')
    .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1 text-gray-600">$1</li>')
    .replace(/\n\n/g, '</p><p class="mb-4 text-gray-600 leading-relaxed">');
}

export default function BlogPost({ params }) {
  const posts = getPosts();
  const post = posts.find(p => p.slug === params.slug);
  if (!post) notFound();

  const related = posts.filter(p => p.slug !== post.slug).slice(0, 3);
  const categoryColors = {
    'Comparison': '#FF6B2B', 'Top Lists': '#a855f7', 'Guide': '#06b6d4',
    'Tips': '#10b981', 'News': '#f59e0b', 'Review': '#f43f5e',
  };
  const accentColor = categoryColors[post.category] || '#FF6B2B';
  const html = renderMarkdown(post.content);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: `${post.date}T00:00:00.000Z`,
    dateModified: `${post.date}T00:00:00.000Z`,
    author: { '@type': 'Organization', name: 'Funparks', url: 'https://funparks.app' },
    publisher: { '@type': 'Organization', name: 'Funparks', url: 'https://funparks.app' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://funparks.app/blog/${post.slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="min-h-screen" style={{ background: '#f8f7ff' }}>
        <div className="pt-32 pb-16 px-6" style={{ background: 'linear-gradient(135deg, #020818 0%, #051d52 50%, #0d4fa0 100%)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-4xl">{post.emoji}</span>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white" style={{ background: accentColor + '33', border: `1px solid ${accentColor}66` }}>{post.category}</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight" style={{ fontFamily: 'Syne,sans-serif' }}>{post.title}</h1>
            <p className="text-blue-200 text-lg mb-6 leading-relaxed">{post.excerpt}</p>
            <div className="flex items-center justify-center gap-4 text-blue-300 text-sm flex-wrap">
              <span>Funparks Team</span>
              <span>•</span>
              <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>•</span>
              <span>{post.readTime} read</span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-12">
          <article className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100">
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: `<p class="mb-4 text-gray-600 leading-relaxed">${html}</p>` }} />
          </article>

          <div className="mt-10 rounded-3xl p-8 text-center" style={{ background: 'linear-gradient(135deg, #051d52, #0d4fa0)' }}>
            <div className="text-4xl mb-3">🎢</div>
            <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'Syne,sans-serif' }}>Plan smarter with Funparks</h3>
            <p className="text-blue-200 mb-6">Live wait times, My Day planner, maps and guides for 60+ parks worldwide. Free on iOS and Android.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="https://apps.apple.com/app/funparks/id6744030777" className="px-6 py-3 rounded-2xl font-bold text-sm hover:scale-105 transition-transform" style={{ background: '#fff', color: '#051d52' }}>App Store</a>
              <a href="https://play.google.com/store/apps/details?id=com.funparks.app" className="px-6 py-3 rounded-2xl font-bold text-sm hover:scale-105 transition-transform" style={{ background: '#FF6B2B', color: '#fff' }}>Google Play</a>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-black text-gray-900 mb-6" style={{ fontFamily: 'Syne,sans-serif' }}>More from the blog</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {related.map((p, i) => (
                  <a key={i} href={`/blog/${p.slug}`} className="bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-200 group">
                    <div className="text-3xl mb-3">{p.emoji}</div>
                    <h3 className="font-black text-gray-900 text-sm leading-tight group-hover:text-purple-700 transition-colors" style={{ fontFamily: 'Syne,sans-serif' }}>{p.title}</h3>
                    <p className="text-gray-500 text-xs mt-2">{p.readTime} read</p>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <a href="/blog" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold transition-colors">Back to all posts</a>
          </div>
        </div>
      </div>
    </>
  );
}