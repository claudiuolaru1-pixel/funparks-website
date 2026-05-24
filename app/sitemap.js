import { readFileSync } from 'fs';
import { join } from 'path';

export default function sitemap() {
  let posts = [];
  try {
    const data = readFileSync(join(process.cwd(), 'public', 'blog-posts.json'), 'utf8');
    posts = JSON.parse(data);
  } catch(e) {}

  const baseUrl = 'https://funparks.app';
  const now = new Date().toISOString();

  const staticPages = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const blogPages = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: `${post.date}T00:00:00.000Z`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}