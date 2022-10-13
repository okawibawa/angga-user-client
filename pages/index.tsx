import { useContext } from 'react';
import { HostContext } from '../context/HostContext';
import type { NextPage } from 'next';
import { parseCookies } from 'nookies'

// react query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// chakra ui
import { Alert, AlertIcon, AlertTitle, AlertDescription, Divider, Box, Stack, Heading, Text, Spacer } from '@chakra-ui/react';

// components
import Layout from '../components/Layout';
import Banner from '../components/Banner/Banner';
import Categories from '../components/Categories/Categories';
import Products from '../components/Products/Products';
import Footer from '../components/Footer';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Autoplay } from 'swiper';

// Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

// apis
import { findProducts, getCategories } from '../apis/api';

const Home: NextPage = () => {
  const host = useContext(HostContext);
  const cookies = parseCookies()

  // access the client
  const queryClient = useQueryClient();

  // queries
  const { isLoading, isError, data } = useQuery(['products'], async () => await findProducts(host?.url));
  const {
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    data: dataCategories,
  } = useQuery(['categories'], async () => await getCategories(host?.url));

  console.log({ cookies })

  return (
    <>
      <Layout>
        <Banner />

        {cookies.sfJwt && !cookies.sfAddress && (
          <Alert mt={8} status='error'>
            <AlertIcon />
            <AlertTitle>Perhatian!</AlertTitle>
            <AlertDescription>Lengkapi alamat pada halaman profile untuk melakukan transaksi!</AlertDescription>
          </Alert>
        )}

        <Categories isLoading={isLoadingCategories} isError={isErrorCategories} data={dataCategories} />

        <Divider my={8} />

        <Products isLoading={isLoading} isError={isError} data={data} />

        <Stack direction="row" alignItems="center" textAlign="center" mb="20">

          <Box mt={8} width="100%">
          <Box>
            <Heading as="h2" size="md" mb="5">
              Packaging Barang
            </Heading>
            <Text as="p" width="100%">
              Pengiriman barang pada UD.PUTRA dikemas menggunakan plastik untuk pembelian dalam kategori sedikit dan pembelian dalam kategori banyak akan dikirimkan menggunakan box/steraform seperti pada gambar dibawah.
            </Text>
          </Box>

          <Spacer h={4} />
            <Swiper
              scrollbar={{
                hide: true,
              }}
              autoplay={{ delay: 5000 }}
              modules={[Scrollbar, Autoplay]}
              className="mySwiper"
            >
              <SwiperSlide>
                <Box width="100%" backgroundColor="lightyellow" maxWidth="720px">
                  <img style={{ width: 'auto', height: 'auto' }} src="/bungkus2.jpg" alt="banner one" />
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                <Box width="100%" backgroundColor="lightblue" maxWidth="720px">
                  <img src="/bungkus3.jpg" alt="banner 2" style={{ width: 'auto', height: 'auto' }} />
                </Box>
              </SwiperSlide>
            </Swiper>
          </Box>
          
        </Stack>

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
