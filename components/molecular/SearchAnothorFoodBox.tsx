
import {VFC} from 'react'
import { useTranslation } from 'next-i18next';
import SearchBar from 'components/atom/SearchBar'
import CommonBox from 'components/atom/CommonBox'

const SearchBarBox: VFC = () => {
  const { t } = useTranslation('common');

  return(
    <CommonBox lead={t("Add anothor foods")}>
      <SearchBar searchType="addFood" pass={null}/>
    </CommonBox>
  )
};

export default SearchBarBox