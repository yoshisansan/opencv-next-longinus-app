import aminoAcidsScoringPatternJSON from 'data/handmade/aminoAcidsScoringPattern.json'
import { SourceTableDataT, SourceTableOnlyAminoT } from 'types/SourceTableData'
import { AminoScoreCompositionT, AminoScoreT } from 'types/AminoScoringPatternType'
import { AminoRatioT, AminoAcidsRatioType } from 'types/ItemNoTypes'
import { AddFoodInputValueT } from 'types/TableComponentType'

class AminoCalClass {
  aminoAcidsScore!: AminoScoreT;

  // 子供の年齢層〜大人までアミノスコア評点パターンのどれか引数を入れる
  constructor(age: number) {
    const {point5, until2, until10, until14, until17, adult} = aminoAcidsScoringPatternJSON;
    const getAminoAcidsScore = (age: number): AminoScoreT => {
      if(age <= 0.5) return point5;
      if(age <= 2) return until2;
      if(age <= 10) return until10;
      if(age <= 14) return until14;
      if(age <= 17) return until17;
      return adult;
    }
    this.aminoAcidsScore = getAminoAcidsScore(age);
  }

  //一つの食材データのオブジェクトからアミノ酸スコアを計算する処理
  oneFoodAminoScoreCal = (oneFoodData: SourceTableDataT) => {
    const essentialAminoAcids = ['ILE', 'LEU', 'LYS', 'AAS', 'AAA', 'THR', 'TRP', 'VAL', 'HIS'];
    const aminoAcidsRatio = this.aminoAcidsRatioCal(essentialAminoAcids, oneFoodData);
    const aminoAcidsScore = this.sortLimitingAminoAcidsRatio(aminoAcidsRatio, 1)[0];

    return aminoAcidsScore;
  }

  //アミノ酸評点パターンに基づいたアミノ酸の比率を計算(任意のアミノ酸の配列に対応)
  aminoAcidsRatioCal = (targetAmino: string[], oneFoodData: SourceTableDataT ) => {
    const aminoResult = [...targetAmino].map((aminoOne) => {
      return this.oneAminoRatioCal(aminoOne, oneFoodData);
    });

    return aminoResult;
  };

  //一つのアミノ酸をアミノ酸評点パターンに基づいて計算
  oneAminoRatioCal = (aminoOne: string, oneFoodData: SourceTableDataT) => {
    // 計算方法は アミノ酸スコア ＝ (アミノ酸mg / プロテインg) / アミノ酸評点パターンmg;
    // 参考：https://note.com/nutrepi/n/n1d81abdd8b08
    const aminoOneKey = aminoOne as keyof AminoScoreCompositionT,
      oneFoodAminoVal = oneFoodData[aminoOneKey],
      oneFoodProteinVal = oneFoodData['PROTEIN'],
      aminoValPerProtein = oneFoodAminoVal / oneFoodProteinVal,
      aminoPatternScore = this.aminoAcidsScore[aminoOneKey],
      aminoScore = Number(((aminoValPerProtein / aminoPatternScore)).toFixed(2));

    return { [aminoOne]: aminoScore };

  };

  // foodFactorsCal = (amionRatioList: AminoAcidsRatioType) => {
  //   const sortAminoRatioList = amionRatioList.sort((aAmino: AminoRatioT, bAmino: AminoRatioT) => {
  //     const [valA] = Object.values(aAmino);
  //     const [valB] = Object.values(bAmino);

  //     return valA > valB ? 1 : -1;
  //   });
  //   console.log(sortAminoRatioList)
  //   return sortAminoRatioList;
  // }

  //制限アミノ酸を算出して制限アミノ酸の名前をキーに、値をスコアにしたオブジェクトの配列を返す処理
  sortLimitingAminoAcidsRatio = (amionRatioList: AminoAcidsRatioType, limit: number) => {
    if(limit > 4) {
      console.error('limitの数字は５未満にしてください');
      throw new Error('limitの数字は５未満にしてください');
    }

    const sortAminoRatioList = amionRatioList.sort((aAmino: AminoRatioT, bAmino: AminoRatioT) => {
      const [valA] = Object.values(aAmino);
      const [valB] = Object.values(bAmino);

      return valA > valB ? 1 : -1;
    });
    return sortAminoRatioList.slice(0, limit);
  }

  //アミノ酸スコアに基づいたプロテインの計算
  proteinPerAminoScoreCal = (
    oneFoodProtein: number,
    firstLimitingRatio: number
  ) => firstLimitingRatio >= 1 ? Number((oneFoodProtein * 1).toFixed(1)) : Number((oneFoodProtein * firstLimitingRatio).toFixed(1));

  // baseFoodと別食材の係数をそれぞれ足し算していく処理
  ratioListAddition = (baseFoodRatioLists: AminoAcidsRatioType, addFoodRatioLists: AminoAcidsRatioType): AminoRatioT[] => {
    const addFoodRatioObject = Object.assign({}, ...addFoodRatioLists); // addFoddRatioLists側だけ１つのオブジェクトにまとめて処理をしやすくする
    const addedRatioList: AminoRatioT[] = baseFoodRatioLists.map((factorObj: AminoRatioT) => {
      const [aminoName, aminoRatio] = Object.entries(factorObj)[0],
        keyN = aminoName as keyof SourceTableOnlyAminoT,
        oneAminoRatio = addFoodRatioObject[keyN],
        sumRatio = oneAminoRatio + aminoRatio;

        return {[aminoName] : sumRatio};
    });

    return addedRatioList;
  }

  //食材AとBに含まれるアミノ酸の平均係数を比較する処理。borderRangeは刻み数とする。刻み数とは、食材AとBとで比較するかどうかを決める範囲のこと。0.1単位で設定し刻み数を超えたら食材AとBとで比較する
  isOverBorderRangeFunc = (aveA: number, aveB: number, borderRange: number): number | false => {
    // 不要な小数点以下の桁を切り捨てる処理。0.1を刻み数として 0.199 > 0.1 のような不等号が生じた場合に 0.199 の少数桁第二位以下は切り捨てて条件分岐したい。
    const rangeDecimalsNum = String(borderRange).split('.')[1].length;
    if(rangeDecimalsNum === undefined) throw new Error('optionBorderRangeには小数点以下の数値を入力してください');
    const powerNum = 10 ** rangeDecimalsNum;
    // 小数桁をoptionBorderRangeの小数桁n + 1以下を切り捨て
    const aveAOfTrunkDecimals = Math.trunc(aveA * powerNum) / powerNum;
    const aveBOfTrunkDecimals = Math.trunc(aveB * powerNum) / powerNum;
    const isOverBorderRange = Math.abs(aveAOfTrunkDecimals - aveBOfTrunkDecimals) > 0.2;

    if(isOverBorderRange) return aveA < aveB ? 1 : -1;

    return false;
  }
  // 入力されたg数に応じてプロテインを算出する処理
  proteinCal = (oneFoodProtein: number, foodInputValue: number) => {
    const foodProtein = (oneFoodProtein / 100) * foodInputValue; // ソースデータの100gあたりのプロテインからgあたりのプロテインへ補正して入力された

    return foodProtein;
  }

  // 複数の食材から平均のアミノ酸比率を算出する処理
  averageAminoRatiosCal = (baseFoodData: SourceTableDataT, addFoods: SourceTableDataT[], targetAmino: string[], baseFoodInputValue: number, addFoodInputValue: AddFoodInputValueT): AminoScoreCompositionT => {
    const baseFoodProtein = (baseFoodData['PROTEIN'] / 100) * baseFoodInputValue; // ソースデータの100gあたりのプロテインからgあたりのプロテインへ補正して入力された
    const addFoodSumProtein = addFoods.map((addFood,index) => {
      let inputVal = addFoodInputValue[`addFood${index + 1}`];
      if(isNaN(inputVal)) inputVal = 100;
      return (addFood['PROTEIN'] / 100) * inputVal
      })
      .reduce((a,b) => a + b);

    const sumProtein = baseFoodProtein + addFoodSumProtein;
    const averageRatioArr = targetAmino
      .map(oneAminoName => {
        const keyN = oneAminoName as keyof AminoScoreCompositionT;
        const addFoodSumVol = addFoods
          .map((oneAddFood, index) => (oneAddFood[keyN] / 100) * addFoodInputValue[`addFood${index + 1}`])
          .reduce((a, b) => a + b);
        const baseFoodVol = (baseFoodData[keyN] / 100) * baseFoodInputValue;
        const sumVol = addFoodSumVol + baseFoodVol,
          aminoMgPerG = sumVol / sumProtein,
          limitAminoVol = Number((aminoMgPerG / this.aminoAcidsScore[keyN]).toFixed(2));

        return {[oneAminoName]: limitAminoVol};
      });

      return Object.assign({}, ...averageRatioArr);

  }

}

export default AminoCalClass;
