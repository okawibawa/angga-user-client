import { useRouter } from 'next/router';
import { useContext } from 'react';
import { HostContext } from '../../context/HostContext';
import Countdown from 'react-countdown';

import Layout from '../../components/Layout';
import Footer from '../../components/Footer';

import { Text, Stack, Heading, Skeleton } from '@chakra-ui/react';

// react query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getPaymentByID } from '../../apis/api';

const AboutUs = () => {
  const router = useRouter();
  const host = useContext(HostContext);

  console.log({ index: router.query.index });

  const { isLoading, data, isError } = useQuery([`payment-${router.query.index}`], () =>
    getPaymentByID(host?.url, router.query.index)
  );

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  return (
    <>
      <Layout>
        <Stack direction="column" alignItems="center" textAlign="center" minHeight="50vh">
          <Heading as="h2" size="md" mb={8}>
            Selesaikan Proses Pembayaran
          </Heading>

          <Stack border="1px" width="50%" maxWidth="40rem" py={4} px={6} borderRadius={6}>
            <Stack direction="row" justifyContent="space-between">
              <Text>Bank</Text>
              {isLoading ? (
                <Skeleton height="32px" width="3rem" />
              ) : (
                <Text as="p">{data.data.data.attributes.xendit_va_object.bank_code}</Text>
              )}
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Text>Jumlah</Text>
              {isLoading ? (
                <Skeleton height="32px" width="3rem" />
              ) : (
                <Text as="p">{formatter.format(data.data.data.attributes.xendit_va_object.expected_amount)}</Text>
              )}
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Text>Nomor VA</Text>
              {isLoading ? (
                <Skeleton height="32px" width="3rem" />
              ) : (
                <Text as="p">{data.data.data.attributes.xendit_va_object.account_number}</Text>
              )}
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Text>Bayar dalam</Text>

              <Text as="p">
                <Countdown date={Date.now() + 86400000} />
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Layout>

      <Footer />
    </>
  );
};

export default AboutUs;
