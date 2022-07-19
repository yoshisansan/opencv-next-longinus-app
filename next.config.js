const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  eslint: {
    dirs: ['pages', 'components', 'data/create', 'types'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false, crypto: false };
    return config;
  },
};
