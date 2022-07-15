import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

// chakra ui
import { Box, Heading, Text } from '@chakra-ui/react';

const Home: NextPage = () => {
  return (
    <Box>
      <Heading textAlign="center" as="h1">
        Hello world!
      </Heading>
    </Box>
  );
};

export default Home;
