// マニュアル翻訳データを参照して翻訳されていないプロパティだけDeepLで翻訳して翻訳ファイル（common.js）を生成するscript
// ※翻訳ファイルのため生成されたJSONファイルはpublic/locales/各言語へ置かれています（data/generate以下ではない）
// nodeで必要な際に実行する

const axios = require('axios')
const EN_JSON = require('../../public/locales/en/manualTranslations.json')
const DE_JSON = require('../../public/locales/de/manualTranslations.json')
const JA_JSON = require('../../public/locales/ja/manualTranslations.json')
const fs = require('fs')
require('dotenv').config({path: '.env.development.local'});

const translate = async(baseLang, targetLang) => {
  const baseLangManualJSON = baseLang.manualJSON;
  const targetManualJSON = targetLang.manualJSON;

  const afterTranslation = Object.entries(targetManualJSON).map(async([key, value]) => {
    if(value === "" || value === null || value === undefined) {
      const baseLangSentence = baseLangManualJSON[key],
        { deeplKeyName } = targetLang,
        url = `https://api-free.deepl.com/v2/translate?auth_key=${process.env.DEEPL_AUTH_KEY}&text=${baseLangSentence}&target_lang=${deeplKeyName}`,
        deepLres = await axios.post(url).then(r => r),
        translatedSentence = String(deepLres.data.translations[0].text);

      return {[key]: translatedSentence};
    }

    return {[key]: value};
  });

  const translatedArr = await Promise.all([...afterTranslation]).then(r => r);
  return Object.assign(...translatedArr);
}

const createDeepLTranslatedJSON = async(baseLang, targetLangArr) => {
  targetLangArr.map(async(targetLang) => {
    await translate(baseLang, targetLang).then(async(dataForJSON) => {
      const JSONdata = JSON.stringify(dataForJSON, null, 2);
      await fs.writeFileSync(targetLang.outputDir, JSONdata);
    });
  });

  // baseLangは翻訳せずにそのままdeeplTranslationファイルへ
  const JSONdata = JSON.stringify(baseLang.manualJSON, null, 2);
  await fs.writeFileSync(baseLang.outputDir, JSONdata);
}

const options = {
  baseLang: {
    name: 'en',
    deeplKeyName: 'EN',
    manualJSON: EN_JSON,
    outputDir: 'public/locales/en/common.json'
  },
  targetLangArr: [
    {
      name: 'ja',
      deeplKeyName: 'JA',
      manualJSON: JA_JSON,
      outputDir: 'public/locales/ja/common.json'
    },
    // {
    //   name: 'de',
    //   deeplKeyName: 'DE',
    //   manualJSON: DE_JSON,
    //   outputDir: 'public/locales/de/common.json'
    // }s
  ]
}

createDeepLTranslatedJSON(options.baseLang, options.targetLangArr);