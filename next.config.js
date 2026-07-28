/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.qrserver.com'],
  },
  async redirects() {
    return [
      {
        source: '/blog/funparks.app',
        destination: '/blog',
        permanent: true,
      },
    ];
  },
}
module.exports = nextConfig