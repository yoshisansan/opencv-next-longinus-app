import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpointsValue = {
  sm: '320px',
  md: '680px',
  lg: '960px',
  xl: '1200px'
};
const breakpoints = createBreakpoints(breakpointsValue);

export const querySize = {
  max: {
    sm: `(max-width: ${breakpointsValue.sm})`,
    md: `(max-width: ${breakpointsValue.md})`,
    lg: `(max-width: ${breakpointsValue.lg})`,
    xl: `(max-width: ${breakpointsValue.xl})`
  },
  min: {
    sm: `(min-width: ${breakpointsValue.sm})`,
    md: `(min-width: ${breakpointsValue.md})`,
    lg: `(min-width: ${breakpointsValue.lg})`,
    xl: `(min-width: ${breakpointsValue.xl})`
  }
};

const mq = `@media screen and (min-width: 480px)`;

const lightMode = {
  colors: {
    moji: {
      main: '#1F3537',
      sub: '#ACBCBE',
      red: '#F56565'
    },
    solid: {
      main: '#E2E4E4'
    },
    brand: {
      main: '#007985',
      sub: '#00856E'
    },
    background: {
      main: '#E6F2F3',
      brandColor: '#007985'
    },
    colorScheme: {
      500: '#007985'
    }
  },
  fontSizes: {
    xmini: '0.7em',
    mini: '0.8em',
    base: '16px',
    big: '1.4142135623em',
    bigX: '1.6180339887em'
  },
  borders: {
    main: '1px solid #E2E4E4'
  },
  radii: {
    main: '8px'
  },
  shadows: {
    main: 'rgba(0, 0, 0, 0.1) 0px 3px 5px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px'
  },
  colorScheme: {
    500: '#007985'
  }
};

const styles = {
  global: {
    'html, body': {
      color: `moji.main`,
      background: '#000',
      lineHeight: '1.6180339887',
      fontSize: 'base',
      letterSpacing: '0.08em',
      textAlign: 'justify',
      textJustify: 'inter-ideograph',
      fontFamily:
        '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", "BIZ UDPGothic",Meiryo, sans-serif',
      zIndex: 1
    },
    a: {
      color: 'brand.main',
      display: 'inline'
    },
    h1: {
      color: 'moji.main',
      fontSize: 'big',
      fontWeight: 'bold',
      padding: '0.7071067812em 0em',
      [mq]: {
        fontSize: 'bigX'
      }
    },
    h2: {
      color: 'brand.main',
      fontSize: 'big',
      fontWeight: 'bold',
      padding: '0.7071067812em 0em'
    },
    h3: {
      color: 'moji.main',
      fontSize: '20px',
      fontWeight: 'bold',
      padding: '0.7071067812em 0em'
    },
    blockquote: {
      background: '#f0fcff',
      padding: '20px',
      margin: '16px 0',
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      lineHeight: '1.8180339887'
    }
  }
};

export const chakraGlobalTheme = extendTheme({
  colors: lightMode.colors,
  fontSizes: lightMode.fontSizes,
  borders: lightMode.borders,
  radii: lightMode.radii,
  shadows: lightMode.shadows,
  colorScheme: lightMode.colorScheme,
  styles,
  breakpoints
});
