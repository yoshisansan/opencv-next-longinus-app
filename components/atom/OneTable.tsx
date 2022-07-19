import { VFC, useContext } from 'react'
import { Box, Table, Thead, Th, Tr, Td, Tbody } from '@chakra-ui/react';
import AminoTableHeadFood from 'components/molecular/AminoTableHeadFood';
import { useTranslation } from 'next-i18next';
import { imageDictionary, foodImages } from 'components/util/imageDictionary';
import { FoodImagesType } from 'types/UtilTypes';
import { SourceTableDataT } from 'types/SourceTableData'
import { AminoTableContext } from 'components/atom/AminoTableContext';
import AminoCalClass from 'components/calculation/aminoCalClass';
import { AminoCalAgeContext } from 'components/atom/AminoCalAgeContext';

const OneTable: VFC<{oneFoodData: SourceTableDataT, setColumnKeys: string[], index: number}> = ({oneFoodData, setColumnKeys, index}) => {
  const { t } = useTranslation('common');
  const aminoTableContext = useContext(AminoTableContext);
  const { aminoCalInstance } = useContext(AminoCalAgeContext);
  const limitingAmionAcidsName = aminoTableContext.limitingAminoAcids.map(oneLimitAmino => Object.keys(oneLimitAmino)[0]);

  const createOneTableDOM = (oneFoodData: SourceTableDataT, setColumnKeys: string[], index: number): JSX.Element => {
    const imageName = imageDictionary[oneFoodData.FoodGroup] as keyof FoodImagesType;
    const imgSrc = foodImages[imageName];

    const TabelHeader = (
        <Box fontSize="base" lineHeight="1.618"><AminoTableHeadFood imgSrc={imgSrc} oneFoodData={oneFoodData}/></Box>
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
          <Tr bg={tes} key={`${String(index)}-${String(i)}Tr`}>
            <Td>{oneColKey} - {t(oneColKey)}</Td>
            <Td suppressHydrationWarning={true} isNumeric>{oneAminoRatio}</Td>
            <Td suppressHydrationWarning={true} isNumeric>{oneFoodData[keyN]}</Td>
          </Tr>
          )
        })
      .filter(item => item); // FoodNameの分が空で返ってくるので空を削除

      return (
        <Box key={`${String(index)}`}>
        {TabelHeader}
        <Table mb="16px" boxShadow="base" key={`${String(index)}Table`} variant="simple">
          <Thead>
            <Tr>
              <Th>名前</Th>
              <Th isNumeric>{t('Amino Acids Score')} / 1g</Th>
              <Th isNumeric>{t('Amino Acids Volume')} / 100g</Th>
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

export default OneTable;