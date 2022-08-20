import { useContext } from 'react';
import { HostContext } from '../context/HostContext';
import type { NextPage } from 'next';

// react query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// chakra ui
import { Divider } from '@chakra-ui/react';

// components
import Layout from '../components/Layout';
import Banner from '../components/Banner/Banner';
import Categories from '../components/Categories/Categories';
import Products from '../components/Products/Products';
import Footer from '../components/Footer';

// apis
import { findProducts } from '../apis/api';

const Home: NextPage = () => {
  const host = useContext(HostContext);

  // access the client
  const queryClient = useQueryClient();

  // queries
  const { isLoading, isError, data } = useQuery(['products'], async () => await findProducts(host?.url));

  return (
    <>
      <Layout>
        <Banner />
        <Categories />

        <Divider my={8} />

        <Products isLoading={isLoading} isError={isError} data={data} />
      </Layout>
      <Footer />
    </>
  );
};

export default Home;
