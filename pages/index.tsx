import Head from 'next/head';
import { Heading } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SEO from 'components/util/seo';
import { Box, Text, Stack } from '@chakra-ui/react';
import { QuestionIcon, MinusIcon, AddIcon } from '@chakra-ui/icons';
import MediaPipeComponent from 'components/template/MediaPipeComponent';

const Home = () => {
  const { t } = useTranslation('common');

  const eachOrderPages = {
    essential: {
      text: t('Look at essential amino acid'),
      pass: 'essential'
    },
    'essential-child': {
      text: t('Look at essential amino acids for children'),
      pass: 'essential-child'
    },
    bcaa: {
      text: t('Look at BCAA'),
      pass: 'bcaa'
    },
    conditional: {
      text: t('Look at conditional amino acids'),
      pass: 'conditional'
    },
    glutamic: {
      text: t('Look at glutamic acid'),
      pass: 'glutamic'
    }
  };
  const titleStr = t('title');
  return (
    <>
      <SEO title={`${titleStr} | aminosan.app}`} description={titleStr} url="" pageType="website" />
      <Box
        w="100vw"
        h="80px"
        backgroundColor="#000"
        mr="calc(50% - 50vw)"
        ml="calc(50% - 50vw)"
        p="24px"
        display="table">
        <MediaPipeComponent />
      </Box>
      <Stack maxW="600px" m="0 auto" spacing="12px" direction="column" mt="12px"></Stack>
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
}

export default Home;
