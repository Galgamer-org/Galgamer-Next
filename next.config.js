/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // i18n: {
  //   locales: ["ja"],
  //   defaultLocale: "ja",
  // },
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: false,
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
  },
}

module.exports = nextConfig
