import {useContext, useEffect, useState} from 'react'
import { Box, Text, Flex } from '@chakra-ui/react'
import AminoCalClass from 'components/calculation/aminoCalClass'
import { FoodInputValueContext } from 'components/atom/FoodInputContext'
import { AminoTableContext } from 'components/atom/AminoTableContext'
// import { AminoTableContext } from 'components/atom/AminoTableContext';
import { SourceTableDataT } from 'types/SourceTableData';
import { AminoCalAgeContext } from 'components/atom/AminoCalAgeContext'

const AddedProteinCard = ({foodElement, lead, oneFoodData}: {foodElement: string, lead: string, oneFoodData: SourceTableDataT}) => {
  const foodInputValueContext = useContext(FoodInputValueContext);
  const aminoTableContext = useContext(AminoTableContext);

  const { aminoCalInstance } = useContext(AminoCalAgeContext),
    oneFoodLimitVal = aminoCalInstance.oneFoodAminoScoreCal(oneFoodData),
    defaultFirstLimitVal = Object.values(oneFoodLimitVal)[0] >= 1 ? 1 : Object.values(oneFoodLimitVal)[0];
  const limitingAminoVal = Object.values(aminoTableContext.afterAddedFoodLimitingAminoAcids[0])[0],
    firstLimitingAminoVal = limitingAminoVal >= 1 ? 1 : limitingAminoVal;
  // oneFoodData["PROTEIN"] * foodInputValueContext.addFoodInputValue[foodElement];
  const isBaseFood = foodElement === 'baseFood';
  const inputValue = isBaseFood ? foodInputValueContext.baseFoodInputValue : foodInputValueContext.addFoodInputValue[foodElement];
  // let proteinVal = foodElement === 'baseFood' ? foodInputValueContext.baseFoodProteinVal : foodInputValueContext.addFoodProteinVal[foodElement];
  const [protein, setProtein] = useState(oneFoodData['PROTEIN'] * inputValue / 100),
    beforeProtein = Number((protein * defaultFirstLimitVal).toFixed(2)),
    beforeAddedFoodProtein = isNaN(beforeProtein) ? 0 : beforeProtein,
    afterProtein = Number((protein * firstLimitingAminoVal).toFixed(2)),
    afterAddedFoodProtein = isNaN(afterProtein) ? 0 : afterProtein;

  useEffect(() => {
      // 食材追加時にaddFoodのstate更新がなされていないためuseEffectのタイミングで値を取得
      if(foodElement === 'baseFood') return;
      const oneFoodProtein = oneFoodData['PROTEIN'] * inputValue / 100;
      if(isNaN(oneFoodProtein)) return;
      foodInputValueContext.handleAddFoodProteinVal(oneFoodProtein, foodElement);
      setProtein(oneFoodProtein);

    },[foodInputValueContext.addFoodInputValue, foodInputValueContext.addFoodProteinVal]);

  return (
    <Flex w="100%" bg="#fff" boxShadow="main" p="8px 12px" justifyContent="space-between" alignItems="center">
      <Box w="100%" fontSize="base">{lead}</Box>
      <Flex alignItems="center">
        <Text fontSize="base" textAlign="center">
          {beforeAddedFoodProtein}
        </Text>
        <Text fontSize="mini"> ▶︎ </Text>
        <Text fontSize="big" textAlign="center">
          {afterAddedFoodProtein}
          <Text as="span" fontSize="xmini">/{protein.toFixed(1)}g</Text>
        </Text>
      </Flex>
    </Flex>
  )
};

export default AddedProteinCard