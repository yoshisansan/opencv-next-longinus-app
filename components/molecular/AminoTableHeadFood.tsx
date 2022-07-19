import { VFC, useContext } from 'react'
import Link from 'next/link'
import { Box, Flex, Image, Text, Button } from '@chakra-ui/react'
import { AminoTableContext } from 'components/atom/AminoTableContext'
import AminoCalClass from 'components/calculation/aminoCalClass';
import { useTranslation } from 'next-i18next';
import { SourceTableDataT } from 'types/SourceTableData';
import { useRouter } from 'next/router'
import { AminoCalAgeContext } from 'components/atom/AminoCalAgeContext';

// 本番は食品群の番号からローカルフォルダの画像を取り出す
const AminoTableHeadFood: VFC<{oneFoodData: SourceTableDataT, imgSrc: string}> = ({oneFoodData, imgSrc}) => {
  const { t } = useTranslation('common');
  const { asPath } = useRouter(),
    hasNumberPath = /\/\d{2,}$/.test(asPath); // ローカルパスで一覧ページか食材別のページかどうかを判別するためのboolを入れる
  const { aminoCalInstance } = useContext(AminoCalAgeContext),
    firstLimitVal = Object.values(aminoCalInstance.oneFoodAminoScoreCal(oneFoodData))[0],
    aminoAcidsScore = firstLimitVal >= 1 ? 100 : (firstLimitVal * 100).toFixed(0);
  const aminoTableContext = useContext(AminoTableContext);
  const oneFoodLinkPath = oneFoodData.ItemNo;

  return (
    <Box m="12px 8px">
      <Flex h="160px" w="100%" alignItems="center" justifyContent="center">
        <Box w="100px" h="100%" mt="8px">
          <Image
            w="100px"
            h="100px"
            src={imgSrc}
            alt={oneFoodData.FoodName}
            mr="8px"
            suppressHydrationWarning={true}
          />
          <Box w="100px" mt="8px" alignItems="center">
            { hasNumberPath ?
            <Button onClick={() => {
              aminoTableContext.handleAddFood(oneFoodData);
              }}>{t('ADD')}</Button>
            :
            <Link href={`${asPath}/${oneFoodLinkPath}`} passHref>
              <Button onClick={() => {
                aminoTableContext.handleAddFood(oneFoodData);
                }}>{t('Go to the Page')}</Button>
            </Link>
            }
          </Box>
        </Box>
        <Box p="8px" mt="8px" h="160px" w="100%" alignItems="center">
          <Text suppressHydrationWarning={true}>{oneFoodData.FoodName}</Text>
          <Text suppressHydrationWarning={true}>{t('Amino Acids Score')}: {aminoAcidsScore}</Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default AminoTableHeadFood