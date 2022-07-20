const { i18n } = require('./next-i18next.config');
const withVideos = require('next-videos');

module.exports = withVideos();
module.exports = {
  i18n,
  eslint: {
    dirs: ['pages', 'components', 'data/create', 'types'] // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  webpack5: true,
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false, path: false, crypto: false };

    config.module.rules.push({
      test: /\.(mp4|webm|ogg|swf|ogv)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: `./.next/static/videos/`,
            outputPath: `${isServer ? '../' : ''}static/videos/`,
            name: '[name]-[hash].[ext]'
          }
        }
      ]
    });

    return config;
  }
};
