import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/poppins';
import '@fontsource/poppins/600.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
