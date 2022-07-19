import { Box, Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Search2Icon, CloseIcon } from '@chakra-ui/icons';
import AutoSuggestJP from 'components/organism/AutoSuggestJP'

const SearchBar = ({searchType, pass}: {searchType: string, pass: string | null}) => {
  return (
    <InputGroup w="100%" display="block" h="48px" lineHeight="32px">
      <Flex pos="relative" p="4px 8px 4px 12px" justifyContent="space-between" alignItems="center" boxShadow='md'>
        <Search2Icon pos="absolute" left="8px" top="14px" fontSize="16px" zIndex="10"/>
        <AutoSuggestJP searchType={searchType} pass={pass}/>
        {/* <CloseIcon pos="absolute" right="8px" top="14px" fontSize="16px" zIndex="10"/> */}
      </Flex>
      {/* <Flex p="0 8px" justifyContent="space-between" alignItems="center" boxShadow='md'>
        <Flex alignItems="center">
          <Search2Icon />
          <Box pl="8px"><AutoSuggestJP /></Box>
        </Flex>
        <Flex alignItems="center">
          <CloseIcon />
        </Flex>
      </Flex> */}
    </InputGroup>
  )
};

export default SearchBar;