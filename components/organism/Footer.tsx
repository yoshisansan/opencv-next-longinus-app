import { Box, Flex } from '@chakra-ui/react';
import { url } from 'inspector';
import MoonWebp from 'public/img/moon.webp';

const Footer = () => (
  <Flex
    style={{
      backgroundImage: `url(${MoonWebp.src})`
    }}
    objectFit="cover"
    mt="24px"
    w="100%"
    h="80px"
    p="0 18px"
    background="#007985"
    justifyContent="space-between"
    alignItems="center"
    zIndex="10"
    position="absolute">
    <Box color="#fff">Footer</Box>
  </Flex>
);

export default Footer;
