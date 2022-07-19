module.exports = {
  i18n: {
    defaultLocale: 'ja',
    locales: ['en', 'de', 'ja'],
  },
  domains: [
    {
      domain: 'localhost:3000/en',
      defaultLocale: 'en',
      http: true,
    },
    {
      domain: 'localhost:3000/de',
      defaultLocale: 'de',
      http: true,
    },
    {
      domain: 'localhost:3000',
      defaultLocale: 'ja',
      http: true,
    },
  ],
};