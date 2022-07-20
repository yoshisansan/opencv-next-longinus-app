import Link from 'next/link';
import { Box, Flex, Text, Image } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import ParticlesComponent from 'components/util/ParticlesComponent';
import GrandfatherPNG from 'public/img/grandfather.png';

const Header = () => {
  const { t } = useTranslation('common');
  const title = t('title');
  return (
    <Box zIndex="1" h="200px">
      <Flex w="100%" h="200px" p="24px" justifyContent="center" alignItems="center">
        <Link href="/" passHref>
          <Text
            transform={`scaleY(1.4)`}
            fontFamily="Times New Roman"
            cursor="pointer"
            fontSize="36px"
            fontWeight="bold"
            color="#fff"
            letterSpacing="0.01em"
            p="18px 24px"
            background="#000">
            {title}
          </Text>
        </Link>
        <Image src={GrandfatherPNG.src} w="100px" />
        <ParticlesComponent />
      </Flex>
    </Box>
  );
};

export default Header;
