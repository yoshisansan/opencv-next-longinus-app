import { VFC, useContext} from 'react'
import { Box, Flex, Image, Text, Skeleton } from '@chakra-ui/react'
import AminoCalClass from 'components/calculation/aminoCalClass';
import { SourceTableDataT } from 'types/SourceTableData';
import { AminoCalAgeContext } from 'components/atom/AminoCalAgeContext';

// 本番は食品群の番号からローカルフォルダの画像を取り出す
const AminoTableHeadFoodSkeleton: VFC<{oneFoodData: SourceTableDataT, imgSrc: string}> = ({oneFoodData, imgSrc}) => {
  const { aminoCalInstance } = useContext(AminoCalAgeContext),
    firstLimitVal = Object.values(aminoCalInstance.oneFoodAminoScoreCal(oneFoodData))[0],
    aminoAcidsScore = firstLimitVal >= 1 ? 100 : (firstLimitVal * 100).toFixed(0);

  return (
    <Box m="12px 8px">
      <Flex h="100px" w="100%" alignItems="center" justifyContent="center">
      <Skeleton>
        <Image
          w="100px"
          h="100px"
          src={imgSrc}
          alt={oneFoodData.FoodName}
          mr="8px"
          suppressHydrationWarning={true}
        />
        </Skeleton>
        <Box p="8px" h="100px" w="100%" alignItems="center">
          <Skeleton><Text suppressHydrationWarning={true}>{oneFoodData.FoodName}</Text></Skeleton>
          <Skeleton><Text suppressHydrationWarning={true}>Amino Acids Score: {aminoAcidsScore}</Text></Skeleton>
        </Box>
      </Flex>
      <Box w="100px" mt="8px" ml="12px" alignItems="center">
      </Box>
    </Box>
  );
}

export default AminoTableHeadFoodSkeleton