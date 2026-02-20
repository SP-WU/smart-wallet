/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      'pino-pretty': 'pino-pretty',
    });
    return config;
  },
};

export default nextConfig;