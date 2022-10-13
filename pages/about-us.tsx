import Layout from '../components/Layout';
import Footer from '../components/Footer';

import { Text, Stack, Heading } from '@chakra-ui/react';

const AboutUs = () => {
  return (
    <>
      <Layout>
        <Stack direction="column" alignItems="center" textAlign="center" minHeight="50vh">
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

export default AboutUs;
