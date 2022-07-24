import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Flex, Text, Image } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import ParticlesComponent from 'components/util/ParticlesComponent';
import GrandfatherPNG from 'public/img/grandfather.png';
import { US, JP, CN, EE, ES, DE, TR, ID, RU, FR, GR, SE } from 'country-flag-icons/react/3x2';
import i18n from 'i18next';

const Header = () => {
  const origin =
    typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

  const router = useRouter();
  const { t } = useTranslation('common');
  const title = t('title');

  return (
    <Box zIndex="1" h="340px">
      <Flex alignItems={'center'} pl="12px" w="100%" h="40px" bg="#333">
        <Text m="4px" color="#fff">
          Choose a language :{' '}
        </Text>
        <a href={`${origin}/en`}>
          <Box onClick={() => i18n.changeLanguage('en')} cursor="pointer" m="4px" w="24px">
            <US title="United States" />
          </Box>
        </a>
        <a href={`${origin}`}>
          <Box cursor="pointer" m="4px" w="24px">
            <JP title="Japan" />
          </Box>
        </a>
        <a href={`${origin}/es`}>
          <Box m="4px" w="24px">
            <ES title="Spain" />
          </Box>
        </a>
        <a href={`${origin}/et`}>
          <Box onClick={() => router.replace(`${origin}/et`)} m="4px" w="24px">
            <EE title="Estonia" />
          </Box>
        </a>
        <a href={`${origin}/de`}>
          <Box m="4px" w="24px">
            <DE title="German" />
          </Box>
        </a>
        <a href={`${origin}/tr`}>
          <Box m="4px" w="24px">
            <TR title="Turkey" />
          </Box>
        </a>
        <a href={`${origin}/id`}>
          <Box m="4px" w="24px">
            <ID title="Indonesia" />
          </Box>
        </a>
        <a href={`${origin}/zh`}>
          <Box m="4px" w="24px">
            <CN title="Chinese" />
          </Box>
        </a>
        <a href={`${origin}/ru`}>
          <Box m="4px" w="24px">
            <RU title="Russia" />
          </Box>
        </a>
        <a href={`${origin}/fr`}>
          <Box m="4px" w="24px">
            <FR title="France" />
          </Box>
        </a>
        <a href={`${origin}/el`}>
          <Box m="4px" w="24px">
            <GR title="Greek" />
          </Box>
        </a>
        <a href={`${origin}/sv`}>
          <Box m="4px" w="24px">
            <SE title="Sweden" />
          </Box>
        </a>
      </Flex>
      <Flex w="100%" h="300px" p="24px" justifyContent="center" alignItems="center">
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
        <Image
          src={GrandfatherPNG.src}
          w="100px"
          animation="fuwafuwa 5s infinite cubic-bezier(0.19,-0.19, 0.8, 1.43)"
        />
        <ParticlesComponent />
      </Flex>
    </Box>
  );
};

export default Header;
