// オートコンプリート（検索機能の検索候補の出力）に扱う辞書データを作成するスクリプト。
const options = {
  KanaToKanji: true,
  KanjiToKana: true,
  KanaToHira: true,
  HiraToKana: true
}

require('dotenv').config({path: '.env.development.local'});
const axios = require(`axios`);
const fs = require('fs');
const craeteKanjiToHiraData = require('./kanjiToHira');
const createHiraToKanjiData = require('./hiraToKanji');

const getGASdata = async () => {
  // const url = 'https://api.sssapi.app/TnpJCwCCOHue5hf5PfK3m';
  // const url = 'https://api.sssapi.app/TnpJCwCCOHue5hf5PfK3m';
  // うまく行かない場合はデータ数を小分けにして出力する予定
  const url = 'https://api.sssapi.app/dx7gk-tr25LFukz41HquN';
  const aminoData = await axios.get(url).then((r) => r);
  const aminoJSON = aminoData.data;

  return aminoJSON;
};

const getItemNoAndFoodNameArr = (GASdata) => {
  const ItemNoAndFoodNameArr = GASdata.map(oneFoodData => ({ 'ItemNo': oneFoodData['ItemNo'], 'FoodName': oneFoodData['FoodName']}));
  return ItemNoAndFoodNameArr;
}

const getFoodNameToKeywords = (ItemNoAndFoodNameArr) => {
  const unNeedSpell = /＜|＞|［|］|（|）|二次品目|副品目|一般用|その他|低カロリータイプ|電子レンジ調理|/g;
  const keywordsObj = ItemNoAndFoodNameArr.map(oneFoodData => {
    const foodNameDeletedUnNeedSpell = oneFoodData['FoodName'].replace(unNeedSpell, '').replace('　　', '　');
    const cuttedTerms = foodNameDeletedUnNeedSpell.split('　').filter(keyword => keyword !== '');

    return { 'ItemNo': oneFoodData['ItemNo'], 'FoodName': oneFoodData['FoodName'], 'keywords': cuttedTerms};
  });

  return keywordsObj;
}

const combineKeywords = (keywordsSource, keywordAddedKanji, keywordsAddedHira) => {

  return keywordsSource.map((oneFoodData, index) => {
    const { keywords } = oneFoodData;
    const kanjiKeyword = keywordAddedKanji[index]['addedKeywords'] === undefined ? [] : keywordAddedKanji[index]['addedKeywords'];
    const hiraKeyword = keywordsAddedHira[index]['addedKeywords'] === undefined ? [] : keywordsAddedHira[index]['addedKeywords'];
    const combinedKeywords = keywords.concat(kanjiKeyword, hiraKeyword);
    delete oneFoodData['keywords'];

    return {...oneFoodData, addedKeywords: combinedKeywords}
  })
}

const createNewJSON = async () => {
  // ※GASdata.slice(1500, 2000)あたりでのデータでAPIエラーが生じる（原因未特定）
  const GASdata = await getGASdata();
  const ItemNoAndFoodNameArr = getItemNoAndFoodNameArr(GASdata),
    keywordsSource = getFoodNameToKeywords(ItemNoAndFoodNameArr),
    keywordAddedKanji = await createHiraToKanjiData(keywordsSource),
    keywordsAddedHira = await craeteKanjiToHiraData(keywordsSource),
    combinedKeywordSource = await combineKeywords(keywordsSource, keywordAddedKanji, keywordsAddedHira);

  const JSONdata = JSON.stringify(combinedKeywordSource, null, 2);
  await fs.writeFileSync('data/generated/JPsuggestDictionary.json', JSONdata);
};

createNewJSON();