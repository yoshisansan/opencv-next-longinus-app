require('dotenv').config({ path: '.env.development.local' });

module.exports = {
  i18n: {
    defaultLocale: 'ja',
    locales: ['en', 'de', 'ja', 'zh', 'es', 'id', 'et', 'tr', 'ru', 'fr', 'el', 'sv']
  },
  ns: ['common', 'manualTranslations'],
  domains: [
    {
      domain: 'https://longinus.aminosan.app/en',
      defaultLocale: 'en',
      http: true
    },
    {
      domain: 'https://longinus.aminosan.app/de',
      defaultLocale: 'de',
      http: true
    },
    {
      domain: 'https://longinus.aminosan.app/es',
      defaultLocale: 'es',
      http: true
    },
    {
      domain: 'https://longinus.aminosan.app/id',
      defaultLocale: 'id',
      http: true
    },
    {
      domain: 'https://longinus.aminosan.app/et',
      defaultLocale: 'et',
      http: true
    },
    {
      domain: 'https://longinus.aminosan.app/tr',
      defaultLocale: 'tr',
      http: true
    },
    {
      domain: 'https://longinus.aminosan.app/zh',
      defaultLocale: 'zh',
      http: true
    },
    {
      domain: 'https://longinus.aminosan.app/jp',
      defaultLocale: 'ja',
      http: true
    },
    {
      domain: 'https://longinus.aminosan.app/ru',
      defaultLocale: 'ru',
      http: true
    },
    {
      domain: 'https://longinus.aminosan.app/fr',
      defaultLocale: 'fr',
      http: true
    },
    {
      domain: 'https://longinus.aminosan.app/el',
      defaultLocale: 'el',
      http: true
    },
    {
      domain: 'https://longinus.aminosan.app/sv',
      defaultLocale: 'sv',
      http: true
    }
  ],
  reloadOnPrerender: false // true にすると next dev モードのときにリロードするだけで JSON の更新が画面に反映されます
};
