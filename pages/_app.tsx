import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import HostContextProvider from '../context/HostContext';
import theme from '../styles/theme';
import NextNProgress from 'nextjs-progressbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@fontsource/poppins';
import '@fontsource/poppins/600.css';
import '../styles/global.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <HostContextProvider>
        <ChakraProvider theme={theme}>
          <NextNProgress color="red" startPosition={0.3} stopDelayMs={200} height={4} showOnShallow={true} />
          <Component {...pageProps} />
        </ChakraProvider>
      </HostContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
