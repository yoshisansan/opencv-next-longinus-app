import { Box, Text, Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next'

const LimitAminoAcidCard = ({limitingAminoAcid, limitingAminoRatio, number}: {limitingAminoAcid: string, limitingAminoRatio: number, number: number}) => {
  const { t } = useTranslation('common');
  return (
  <Flex w="100%" h="80px" boxShadow="main" alignItems="center" justifyContent="flex-start">
    <Box w="80px" h="48px">
      <Flex w="48px" h="48px" m="0 auto" alignItems="center" justifyContent="center" borderRadius="100%" bg="#007985">
        <Text textAlign="center" fontSize="big" color="#fff">{number}</Text>
      </Flex>
    </Box>
    <Box>
      <Box>{limitingAminoAcid} - {t(limitingAminoAcid)} {limitingAminoRatio}</Box>
      <Box color="moji.sub">{t('first')} {number} {t('limited amino acid')}</Box>
    </Box>
  </Flex>
  );
}

export default LimitAminoAcidCard