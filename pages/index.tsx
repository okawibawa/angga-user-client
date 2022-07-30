import type { NextPage } from 'next';

import { Divider } from '@chakra-ui/react';

// components
import Layout from '../components/Layout';
import Banner from '../components/Banner/Banner';
import Categories from '../components/Categories/Categories';
import Products from '../components/Products/Products';

const Home: NextPage = () => {
  return (
    <Layout>
      <Banner />
      <Categories />

      <Divider my={8} />

      <Products />
    </Layout>
  );
};

export default Home;
