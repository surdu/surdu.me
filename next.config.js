/** @type {import('next').NextConfig} */

module.exports = {
  webpack(config) {
    // config.reactStrictMode = true;
    // config.swcMinify = true;

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

