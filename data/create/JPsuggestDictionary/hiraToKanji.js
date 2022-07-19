
const HIRA_TO_KANJI_API = require('./api/hiraToKanjiAPI');
require('dotenv').config({path: '.env.development.local'});

const sleep = (second) => {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve()
      }, second * 1000)
  })
}

const translateHiraToKanji = async(targetKeywords) => {
  const kanjiRegex = /([\u{3005}\u{3007}\u{303b}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{20000}-\u{2FFFF}][\u{E0100}-\u{E01EF}\u{FE00}-\u{FE02}]?)/mu; // 漢字が一文字でも含まれているのかどうかの正規表現

  let kanjisArr = [];
  for (const keyword of targetKeywords) {
    // await sleep(0.1);
    const kanjiArr = await HIRA_TO_KANJI_API(keyword);
    const kanjis = kanjiArr.filter(kanji => kanjiRegex.test(kanji));
    kanjisArr.push(kanjis);
  }

  return kanjisArr;
}

const createHiraToKanjiData = async(keywordsSource) => {
    // ひらがなオンリーの単語のみ漢字へ変換（処理が複雑になる、変換不要なキーワードが多いため）
    const unNeedKeywords = /えんどう/g;
    const hiraRegex = /^[ぁ-んー]*$/; // 漢字が一文字でも含まれているのかどうかの正規表現

    let resKanji = [];
    for (const oneFoodData of keywordsSource) {
      const targetKeywords = oneFoodData['keywords'].filter(oneKeyword => hiraRegex.test(oneKeyword));
      let kanjis = [];
      if(targetKeywords.length > 0){ kanjis = await translateHiraToKanji(targetKeywords) };

      resKanji.push({...oneFoodData, addedKeywords: targetKeywords.length > 0 ? kanjis[0].slice(0,2) : []});
    }

    return resKanji;
  }

module.exports = createHiraToKanjiData;