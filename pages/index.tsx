import ReactPlayer from 'react-player';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SEO from 'components/util/seo';
import { Flex, Box, Text, Heading, AspectRatio } from '@chakra-ui/react';
import MediaPipeComponent from 'components/template/MediaPipeComponent';
import HowToMP4 from 'public/videos/howto.mp4';

const Home = () => {
  const { t } = useTranslation('common');
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    setTimeout(() => {
      videoRef.current?.play();
    }, 5000);
  }, []);

  const titleStr = t('title');
  return (
    <>
      <SEO title={`${titleStr}`} description={titleStr} url="" pageType="website" />
      <Box
        w="100vw"
        h="80px"
        p="24px"
        backgroundColor="#000"
        mr="calc(50% - 50vw)"
        ml="calc(50% - 50vw)"
        display="table">
        <MediaPipeComponent />
      </Box>
      <Flex w="100%" m="0 auto" mt="24px" maxW="1000px" bg="#fff" justify="center">
        <Box>
          <Heading
            transform={'scaleY(1.4)'}
            fontFamily={'Times New Roman'}
            textAlign="center"
            display={'block'}
            color="#333">
            {t('how to use')}
          </Heading>
          <Text textAlign="center" display={'block'}>
            {t('how to use desc')}
          </Text>
          <Box m="0 auto" mt="36px" mb="36px" w="300px" h="240px">
            <AspectRatio>
              <video controls loop={true} muted ref={videoRef}>
                <source src="/videos/howto.mp4" type="video/mp4" />
              </video>
            </AspectRatio>
          </Box>
        </Box>
      </Flex>
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
