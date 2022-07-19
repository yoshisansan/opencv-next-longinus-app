import 'styles/globalFont.css';
import { VFC } from 'react';
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import {
  ChakraProvider,
  ColorModeScript,
  useColorMode,
  Button,
} from '@chakra-ui/react';
import { chakraGlobalTheme } from 'components/util/chakraGlobalSettings';
import Layout from 'components/template/Layout';

const App: VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={chakraGlobalTheme}>
      <ColorModeScript
        initialColorMode={chakraGlobalTheme.config.initialColorMode}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default appWithTranslation(App);
