import { VFC } from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next'

const PlusMinusNum: VFC<{diffProtein: number}> = ({diffProtein}) => {
  const sign = Math.sign(diffProtein);
  if(sign){
    return (
      <Box as="span" color="brand.main" fontSize="base" fontWeight="bold">(+{diffProtein}g)</Box>
    )
  }

  return <Box as="span" color="moji.red" fontSize="base" fontWeight="bold">(-{diffProtein}g)</Box>
}

const TotalProteinCard: VFC<{sumOfSingleUnitProtein: number | undefined, totalProtein: number, addFoodLength: number}> = ({sumOfSingleUnitProtein, totalProtein, addFoodLength}) => {
  const { t } = useTranslation('common');
  const sum = sumOfSingleUnitProtein === undefined ? 0 : sumOfSingleUnitProtein;
  const diffProtein = Number((totalProtein - sum).toFixed(1));

  return (
    <Box w="100%" bg="#fff" boxShadow="main">
      <Box w="100%" p="8px 12px" fontSize="base" color="#fff" bg="#007985">{t('Total protein based on amino acid score')}</Box>
      <Flex h="46px" justifyContent="center" alignItems="center">
        {addFoodLength > 0 ?
        <>
          <Text fontSize="base" textAlign="center">
            {sumOfSingleUnitProtein}
          </Text>
          <Text fontSize="mini"> ▶︎ </Text>
          <Text lineHeight="46px" fontSize="big" textAlign="center">{totalProtein}g</Text>
          <Text><PlusMinusNum diffProtein={diffProtein} /></Text>
        </>
        :
          <Text lineHeight="46px" fontSize="big" textAlign="center">{totalProtein}g</Text>
        }
      </Flex>
    </Box>
  )
};

export default TotalProteinCard