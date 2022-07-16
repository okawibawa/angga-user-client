// theme.ts (tsx file with usage of StyleFunctions, see 4.)
import { extendTheme } from '@chakra-ui/react';

const breakpoints = {
  sm: '37.5em', // 600px
  md: '56.25', // 900px
  lg: '75em', // 1200px
  xl: '112.5em', // 1800px
};

const theme = extendTheme({
  breakpoints,
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
});

export default theme;
