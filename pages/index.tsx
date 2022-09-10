import { useContext } from 'react';
import { HostContext } from '../context/HostContext';
import type { NextPage } from 'next';

// react query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// chakra ui
import { Divider, Box, Stack, Heading, Text } from '@chakra-ui/react';

// components
import Layout from '../components/Layout';
import Banner from '../components/Banner/Banner';
import Categories from '../components/Categories/Categories';
import Products from '../components/Products/Products';
import Footer from '../components/Footer';

// apis
import { findProducts, getCategories } from '../apis/api';

const Home: NextPage = () => {
  const host = useContext(HostContext);

  // access the client
  const queryClient = useQueryClient();

  // queries
  const { isLoading, isError, data } = useQuery(['products'], async () => await findProducts(host?.url));
  const {
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    data: dataCategories,
  } = useQuery(['categories'], async () => await getCategories(host?.url));

  return (
    <>
      <Layout>
        <Banner />
        <Categories isLoading={isLoadingCategories} isError={isErrorCategories} data={dataCategories} />

        <Divider my={8} />

        <Products isLoading={isLoading} isError={isError} data={data} />

        <Stack direction="column" alignItems="center" textAlign="center">
          <Heading as="h2" size="md">
            Tentang Kami
          </Heading>

          <Text as="p" maxWidth={1048}>
            UD. Putra merupakan usaha yang bergerak di bidang Supplier Seafood dimana nama dari usaha ini diambil dari
            nama pemilik usaha ini sendiri UD. Putra sudah bergerak di bidang supplier seafood sejak tahun 2012 dengan
            melakukan transaksi kepada hotel & restaurant. Ud. Putra siap untuk melayani pelanggan dengan menyediakan
            seafood pilihan kalian dengan keadaan yang bagus dan pengiriman yang tepat waktu.
          </Text>
        </Stack>
      </Layout>

      <Footer />
    </>
  );
};

export default Home;
