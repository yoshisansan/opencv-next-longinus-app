import { Box, Flex } from '@chakra-ui/react';
import MoonWebp from 'public/img/moon.webp';

const Footer = () => (
  <Flex
    style={{
      backgroundImage: `url(${MoonWebp.src})`,
      backgroundRepeat: 'no-repeat'
    }}
    objectFit="cover"
    mt="24px"
    w="100%"
    h="80px"
    p="0 18px"
    background="#000"
    justifyContent="space-between"
    alignItems="center"
    zIndex="10"
    position="absolute">
    <Box color="#fff">Copyright © 2022- あきふみ All Rights Reserved.</Box>
  </Flex>
);

export default Footer;
