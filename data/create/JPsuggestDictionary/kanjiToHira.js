const KANJI_TO_HIRA_API = require('./api/kanjiToHiraAPI');

const translateKanjiToHira = async(oneFoodData) => {
  const kanjiRegex = /([\u{3005}\u{3007}\u{303b}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{20000}-\u{2FFFF}][\u{E0100}-\u{E01EF}\u{FE00}-\u{FE02}]?)/mu; // 漢字が一文字でも含まれているのかどうかの正規表現
  const targetKanjiKeywords = oneFoodData['keywords'].filter(oneKeyword => kanjiRegex.test(oneKeyword));
  const hiragana = await KANJI_TO_HIRA_API(JSON.stringify(targetKanjiKeywords));

  return hiragana;
}

const craeteKanjiToHiraData = async(keywordsSource) => {
  // const unNeedKeywords = /こしあん入り|/g;
  const resHiragana = await Promise.all(keywordsSource.map(async(oneFoodData) => {
    const hiragana = await translateKanjiToHira(oneFoodData);
    try {
      const hiragana = await translateKanjiToHira(oneFoodData);
      return await {...oneFoodData, addedKeywords: JSON.parse(hiragana.converted)}
    } catch(e) {
      console.logError(`${oneFoodData}`);
      console.log(`以下のデータは${typeof hiragana.converted}です。`);
      console.log(e);
    }
  }));

  return resHiragana;
}

module.exports = craeteKanjiToHiraData;