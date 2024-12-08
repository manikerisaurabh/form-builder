/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*', // Include '/api' in the destination
      },
    ];
  },
};

module.exports = nextConfig;
