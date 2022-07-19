// スプレッドシートから引っ張ってきた食材データを最初に加工するファイル。生成後は data/generated/sourceDataTreatment.jsonへ出力
const axios = require('axios')
const fs = require('fs')

const getGASdata = async () => {
  const url = 'https://api.sssapi.app/TnpJCwCCOHue5hf5PfK3m';
  const aminoData = await axios.get(url).then((r) => r);
  const aminoJSON = aminoData.data;

  return aminoJSON;
};

const cutKakkoOfValue = (source) => {
  // 日本語ソースの不要な()を削除する
  const afterCutData = source.map((obj) => {
    Object.entries(obj).map(([key, value]) => {
      if (key === 'FoodName' || key === 'Remarks') return;
      const afterCutKakkoVal = Number(String(value).replace(/[^0-9.]/g, ''));
      obj[key] = afterCutKakkoVal;
    });

    return obj;
  });

  return afterCutData;
};

const setNull = (source) => {
  // "-"の文字をnull型に変える
  const afterSetNullData = source.map((obj) => {
    Object.entries(obj).map(([key, value]) => {
      obj[key] = value === '-' ? null : value;
    });

    return obj;
  });

  return afterSetNullData;
};

const createNewJSON = async () => {
  const GASdata = await getGASdata(),
    afterCutKakkoGASdata = cutKakkoOfValue(GASdata),
    afterSetNullGASdata = setNull(afterCutKakkoGASdata),
    JSONdata = JSON.stringify(afterSetNullGASdata, null, 2);

  await fs.writeFileSync('data/generated/sourceTableData.json', JSONdata);
};

createNewJSON();