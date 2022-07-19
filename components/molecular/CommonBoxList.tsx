import Link from 'next/link'
import CommonBox from 'components/atom/CommonBox'
import { useTranslation } from 'next-i18next';
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Box, Text, List, ListItem, Flex } from '@chakra-ui/react';
import { EachOrderPagesType, PagesType } from 'types/CommonBoxTypes';

const CommonBoxList = ({listItem}: {listItem: EachOrderPagesType}) => {
  const ListComponents = Object.values(listItem).map((oneList: PagesType, index: number) => {

    return (
    <ListItem borderBottom="main" key={index}>
      <Link href={`/${oneList.pass}`} passHref>
        <Flex p="8px 0" justifyContent="space-between" alignItems="center" _hover={{ backgroundColor: "#e0e0e0",  cursor: "pointer" }}>
          <Text ml="12px" w="90%">{oneList.text}</Text>
          <Box w="24px" mr="12px"><ExternalLinkIcon w="24px" h="24px"/></Box>
        </Flex>
      </Link>
    </ListItem>
    )
  })
  const { t } = useTranslation('common');
  return(
  <CommonBox lead={t("Descending order pages")}>
    <List spacing={3} >
      {ListComponents}
    </List>
  </CommonBox>
)};

export default CommonBoxList