import Link from 'next/link';
import { Box, Flex, Text } from '@chakra-ui/react';
import HamburgerMenu from 'components/molecular/HamburgerMenu';
import ParticlesComponent from 'components/util/ParticlesComponent';

const Header = () => (
  <Box h="200px">
    <Flex
      w="100%"
      h="200px"
      p="0 18px"
      backgroundColor="#000"
      justifyContent="center"
      alignItems="center"
      borderBottom="main"
    >
      <Link href="/" passHref>
        <Text
          transform={`scaleY(1.4)`}
          fontFamily="Times New Roman"
          cursor="pointer"
          fontSize="36px"
          fontWeight="bold"
          color="#fff"
          letterSpacing="0.01em"
        >
          ロンギヌスの槍を投げ放題サイト
        </Text>
      </Link>
      {/* <ParticlesComponent /> */}
    </Flex>
  </Box>
);

export default Header;
