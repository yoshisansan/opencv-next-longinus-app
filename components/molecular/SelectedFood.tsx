import { VFC, useContext, ChangeEvent, useEffect } from 'react'
import { Box, Flex, Image, Text, Input } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FoodInputValueContext  } from 'components/atom/FoodInputContext';
import AminoCalClass from 'components/calculation/aminoCalClass';
import { SourceTableDataT } from 'types/SourceTableData';
import { AminoCalAgeContext } from 'components/atom/AminoCalAgeContext';

const SelectedFood: VFC<{oneFoodData: SourceTableDataT,foodName: string, imgSrc: string, foodElement: string}> = ({oneFoodData, foodName, imgSrc, foodElement}) => {
  const { t } = useTranslation('common');
  const { aminoCalInstance } = useContext(AminoCalAgeContext),
    oneFoodAminoScoreRatio = aminoCalInstance.oneFoodAminoScoreCal(oneFoodData),
    oneFoodAminoScore = Object.values(oneFoodAminoScoreRatio)[0] >= 1 ? 100 : (Object.values(oneFoodAminoScoreRatio)[0] * 100).toFixed(0);
  // baseFoodかaddFoodかを判定して処理を選択
  const foodInputValueContext = useContext(FoodInputValueContext),
    isBaseFood = foodElement === 'baseFood',
    foodInputValue = isBaseFood ? foodInputValueContext.baseFoodInputValue : foodInputValueContext.addFoodInputValue[foodElement],
    handleFoodValue = isBaseFood ? foodInputValueContext.handleBaseFoodValue : foodInputValueContext.handleAddFoodValue;

  // addFood追加直後にデフォルトの100gを設定する
  useEffect(() => {
    if(!isBaseFood){
      foodInputValueContext.handleAddFoodValue(100, oneFoodData['PROTEIN'], foodElement);
    }
  },[]);

  return (
  <Box h="160px">
    <Flex h="100px" alignItems="center" m="12px 0">
      <Image
        w="100px"
        src={imgSrc}
        alt={foodName}
      />
      <Box p="8px" alignItems="center">
        <Text>{foodName}</Text>
        <Text>{t("Amino Acids Score")}{`: ${oneFoodAminoScore}`}</Text>
      </Box>
    </Flex>
    <Flex alignItems="center">
      <Input w="100px" mr="8px" placeholder="100" value={foodInputValue === undefined ? 0 : foodInputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          //バリデーションチェック
          if(e.target.value === undefined || e.target.value === '' || isNaN(Number(e.target.value))) return handleFoodValue(0, oneFoodData["PROTEIN"], foodElement);
          if(/^[0-9]+$/.test(e.target.value) === false) return;

          handleFoodValue(Number(e.target.value), oneFoodData["PROTEIN"], foodElement);
        }
      }/>
      <Text>g</Text>
    </Flex>
  </Box>
  );
}

export default SelectedFood