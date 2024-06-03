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
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /.node$/,
      loader: 'node-loader',
    },
    {
      test: /\.map$/,
      loader: 'ignore-loader',
    }),
    config.module.rules.push({
      test: /\.d.ts$/,
      loader: 'ignore-loader',
    })
    return config
  },
}

module.exports = nextConfig
