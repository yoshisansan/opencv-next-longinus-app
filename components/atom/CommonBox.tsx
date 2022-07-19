import { Box, Text } from '@chakra-ui/react';

const CommonBox = ({lead, children}: {lead: string, children?: JSX.Element[] | JSX.Element}) => {
  return (
    <Box w="100%" p="8px 16px 24px 16px" backgroundColor="#fff" boxShadow="main" borderRadius="main" position="relative">
      {/* Nextのサーバーとクライアント間でTextが一致しないというエラーの対処としてsuppressHydrationWarning属性付与 */}
      <Text as="h2" color="moji.main" p="0 0 8px 0" fontSize="20px" fontWeight="bold">{lead}</Text>
      <Box>{children}</Box>
    </Box>
  )
};

export default CommonBox