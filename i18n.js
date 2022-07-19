import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';

i18n
  .use(detector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    // lng: localStorage.getItem('language') || 'en',
    lng: 'en',
    backend: {
      /* translation file path */
      loadPath: '/public/locales/{{lng}}/common.json'
    },
    fallbackLng: ['en', 'se', 'da'],
    debug: true,
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    },
    react: {
      wait: true
    }
  });

export default i18n;
