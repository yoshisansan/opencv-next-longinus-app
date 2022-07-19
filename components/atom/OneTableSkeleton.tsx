import { VFC, useContext } from 'react'
import { Box, Table, Thead, Th, Tr, Td, Tbody, Skeleton } from '@chakra-ui/react';
import AminoTableHeadFood from 'components/molecular/AminoTableHeadFood';
import { imageDictionary, foodImages } from 'components/util/imageDictionary';
import { FoodImagesType } from 'types/UtilTypes';
import { SourceTableDataT } from 'types/SourceTableData'
import { AminoTableContext } from 'components/atom/AminoTableContext';
import AminoCalClass from 'components/calculation/aminoCalClass';
import { AminoCalAgeContext } from './AminoCalAgeContext';
import AminoTableHeadFoodSkeleton from 'components/molecular/AminoTableHeadFoodSkeleton';

const OneTableSkeleton: VFC<{oneFoodData: SourceTableDataT, setColumnKeys: string[], index: number}> = ({oneFoodData, setColumnKeys, index}) => {
  const { aminoCalInstance } = useContext(AminoCalAgeContext);
  const aminoTableContext = useContext(AminoTableContext);
  const limitingAmionAcidsName = aminoTableContext.limitingAminoAcids.map(oneLimitAmino => Object.keys(oneLimitAmino)[0]);

  const createOneTableDOM = (oneFoodData: SourceTableDataT, setColumnKeys: string[], index: number): JSX.Element => {
    const imageName = imageDictionary[oneFoodData.FoodGroup] as keyof FoodImagesType;
    const imgSrc = foodImages[imageName];

    const TabelHeader = (
        <Box fontSize="base" lineHeight="1.618"><AminoTableHeadFoodSkeleton imgSrc={imgSrc} oneFoodData={oneFoodData}/></Box>
    )

    const TrTable = setColumnKeys
      .map((oneColKey, i) => {
        if(oneColKey === 'FoodName') return;
        const oneAminoRatioObj = oneColKey === 'PROTEIN' ? '-' : aminoCalInstance.oneAminoRatioCal(oneColKey, oneFoodData);
        const oneAminoRatio = Object.values(oneAminoRatioObj)[0];
        const keyN = oneColKey as keyof SourceTableDataT;

        // 第一制限だけスタイルされていないので修正予定
        const tes = limitingAmionAcidsName.findIndex(oneLimitAmino => oneLimitAmino !== keyN) === -1 ? '#e0e0e0' : '#fff';

          return (
          <Tr bg={tes} key={`${String(index)}-${String(i)}Tr-Skeleton`}>
            <Td><Skeleton>{oneColKey}</Skeleton></Td>
            <Td suppressHydrationWarning={true} isNumeric><Skeleton>{oneAminoRatio}</Skeleton></Td>
            <Td suppressHydrationWarning={true} isNumeric><Skeleton>{oneFoodData[keyN]}</Skeleton></Td>
          </Tr>
          )
        })
      .filter(item => item); // FoodNameの分が空で返ってくるので空を削除

      
      return (
        <Box key={`${String(index)}-Skeleton`}>
        {TabelHeader}
        <Table mb="16px" boxShadow="base" key={`${String(index)}Table-Skeleton`} variant="simple">
          <Thead>
            <Tr>
              <Th><Skeleton>名前</Skeleton></Th>
              <Th isNumeric><Skeleton>アミノ酸スコア/ 1g</Skeleton></Th>
              <Th isNumeric><Skeleton>アミノ酸量 / 100g</Skeleton></Th>
            </Tr>
          </Thead>
          <Tbody>
            {TrTable}
          </Tbody>
        </Table>
        </Box>
      );
  };

  const OneTableDOM = createOneTableDOM(oneFoodData, setColumnKeys, index);

  return (
    <>
      {OneTableDOM}
    </>
  )
};

export default OneTableSkeleton;