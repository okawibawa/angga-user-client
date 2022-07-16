import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

// chakra ui
import { Box, Heading, Text } from '@chakra-ui/react';

// components
import Layout from '../components/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <Heading textAlign="center" as="h1">
        Hello world!
      </Heading>
    </Layout>
  );
};

export default Home;
