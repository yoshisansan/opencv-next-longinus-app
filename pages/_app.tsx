import 'styles/globalFont.css';
import { FC } from 'react';
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { chakraGlobalTheme } from 'components/util/chakraGlobalSettings';
import { GoogleAnalytics, usePageViews } from 'nextjs-google-analytics';
import Layout from 'components/template/Layout';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  usePageViews();
  return (
    <ChakraProvider theme={chakraGlobalTheme}>
      <GoogleAnalytics />
      <ColorModeScript initialColorMode={chakraGlobalTheme.config.initialColorMode} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default appWithTranslation(App);
