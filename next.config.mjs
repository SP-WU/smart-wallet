/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      'pino-pretty': 'pino-pretty',
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.alchemyapi.io',
      },
    ],
  },
};

export default nextConfig;
