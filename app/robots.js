export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: 'https://funparks.app/sitemap.xml',
    host: 'https://funparks.app',
  };
}