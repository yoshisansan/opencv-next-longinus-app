import { SyntheticEvent, useState } from 'react'
import { Box, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import SearchBar from 'components/atom/SearchBar'
import CommonBox from 'components/atom/CommonBox'

const SearchBarBox = ({searchType}: {searchType: string}) => {
  const [pass, setPass] = useState("essential");
  const { t } = useTranslation('common');

  return(
    <CommonBox lead={t('Select Search Option')}>
      <RadioGroup mt="16px" onChange={setPass} value={pass}>
        <Stack spacing={3} direction="column">
          <Radio size="lg" value="essential" name="essential" colorScheme="green" defaultChecked>
            {t("Essential Amino Acids")}
          </Radio>
          <Radio size="lg" value="essential-child" name="essential-child" colorScheme="green" data-pass="essential-child">
            {t("Essential Amino Acids For Children")}
          </Radio>
          <Radio size="lg" value="bcaa" name="bcaa" colorScheme="green" data-pass="bcaa">
            {t("BCAA")}
          </Radio>
          <Radio size="lg" value="conditional" name="conditional" colorScheme="green" data-pass="conditional">
            {t("Conditional Amino Acids")}
          </Radio>
          <Radio size="lg" value="glutamic" name="glutamic" colorScheme="green" data-pass="glutamic">
            {t("Glutamic Acid")}
          </Radio>
        </Stack>
      </RadioGroup>
      <Box pt="8px">
        <SearchBar searchType={searchType} pass={pass}/>
      </Box>
    </CommonBox>
  )
};

export default SearchBarBox