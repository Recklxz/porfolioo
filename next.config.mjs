/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/portfolioo',
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './image-loader.js',
  },
  // Disable experimental features that might cause issues
  experimental: {
    webpackBuildWorker: false,
    parallelServerCompiles: false,
    parallelServerBuildTraces: false,
  },
  // Compiler options
  compiler: {
    // Disable React strict mode during build
    reactStrictMode: false,
  },
};

export default nextConfig;
