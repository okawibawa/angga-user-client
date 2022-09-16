import { useRouter } from 'next/router';
import { useContext } from 'react';
import { HostContext } from '../../context/HostContext';
import Link from 'next/link'
import Countdown from 'react-countdown';

import Layout from '../../components/Layout';
import Footer from '../../components/Footer';

import { Alert, Divider, Text, Stack, Heading, Skeleton } from '@chakra-ui/react';

// react query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getPaymentByID } from '../../apis/api';

const AboutUs = () => {
  const router = useRouter();
  const host = useContext(HostContext);

  const { isLoading, data, isError } = useQuery([`payment-${router.query.index}`], () =>
    getPaymentByID(host?.url, router.query.index)
  );
  
  console.log({ data })

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

          <Stack textAlign="left" border="1px" width="50%" maxWidth="36rem" py={4} px={6} borderRadius={6}>
            <Heading as="h2" size="md" mb={2}>
              Detail
            </Heading>
    
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Text>Status</Text>
              {isLoading ? (
                <Skeleton height="32px" width="3rem" />
              ) : (
                <Alert width="min-content" borderRadius={6} status="warning" fontWeight="bold">{data.data.data.attributes.xendit_va_object.status}</Alert>
              )}
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Text>Bank</Text>
              {isLoading ? (
                <Skeleton height="32px" width="3rem" />
              ) : (
                <Text as="p">{data.data.data.attributes.xendit_va_object.bank_code.replace("_", " ")}</Text>
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
              <Text>Total</Text>
              {isLoading ? (
                <Skeleton height="32px" width="3rem" />
              ) : (
                <Text as="p">{formatter.format(data.data.data.attributes.xendit_va_object.expected_amount)}</Text>
              )}
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Text>Bayar sebelum</Text>

              {isLoading ? (
                <Skeleton height="32px" width="3rem" />
              ) : (
                <Text as="p">{new Date(data.data.data.attributes.xendit_va_object.expiration_date).toLocaleString()}</Text>
              )}
            </Stack>
    
            <Divider py={3} />
    
            <Stack direction="column">
              <Heading as="h2" size="md" mb={2}>
                Pembelian
              </Heading>
    
              <Stack direction="row" spacing={2}>
                {isLoading ? (
                  <Text>Mohon tunggu...</Text>
                ) : (
                  <Stack direction="column" width="100%">
                    {data.data.data.attributes.transaction.data.attributes.transaction_details.data.map((product: any) => (
                      <>
                        <Stack spacing={2} border="1px" py={1} px={2} borderRadius={6} width="100%">
                          <Stack direction="row" justifyContent="space-between">
                            <Text as="p">
                              Nama
                            </Text>

                            <Link href={{ pathname: '/product-detail/[index]', query: { index: product.attributes.product.data.attributes.slug }}}>
                              <a>
                                <Text as="p" textDecoration="none">
                                  {product.attributes.product.data.attributes.name}
                                </Text>
                              </a>
                            </Link>
                          </Stack>
      
                          <Stack direction="row" justifyContent="space-between">
                            <Text as="p">
                              Jumlah
                            </Text>

                            <Text as="p">
                              {product.attributes.qty}
                            </Text>
                          </Stack>
      
                          <Stack direction="row" justifyContent="space-between">
                            <Text as="p">
                              Harga
                            </Text>

                            <Text as="p">
                              {formatter.format(Number(product.attributes.product.data.attributes.price))}
                            </Text>
                          </Stack>
      
                          <Stack direction="row" justifyContent="space-between">
                            <Text as="p">
                              Subtotal
                            </Text>

                            <Text as="p">
                              {formatter.format(Number(product.attributes.product.data.attributes.price) * Number(product.attributes.qty))}
                            </Text>
                          </Stack>
                        </Stack>      
                      </>
                    ))}                  
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Layout>

      <Footer />
    </>
  );
};

export default AboutUs;
