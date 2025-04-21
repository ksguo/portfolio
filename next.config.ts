/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hhxsmffozhsvmyjmbhvz.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
     {
      protocol: 'https',
      hostname: 'cdn.sanity.io',
     }
    ],
  },
};

module.exports = nextConfig;