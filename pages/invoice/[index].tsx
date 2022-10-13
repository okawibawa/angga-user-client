import { useRouter } from 'next/router';
import React, { useContext, useState, useEffect, ChangeEvent } from 'react';
import { HostContext } from '../../context/HostContext';
import Link from 'next/link';
import Countdown from 'react-countdown';
import { parseCookies, setCookie } from 'nookies';

import Layout from '../../components/Layout';
import Footer from '../../components/Footer';

import { Alert, Divider, Text, Stack, Heading, Skeleton, Box, Input, VStack, Select, Button, Image, Textarea } from '@chakra-ui/react';

// react query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getPaymentByID, addRatings } from '../../apis/api';

const AboutUs = () => {
  const router = useRouter();
  const host = useContext(HostContext);
  const cookies = parseCookies();

  const [currentMenu, setCurrentMenu] = useState<any>(['detail']);
  const [details, setDetails] = useState<any>([]);
  const [pro, setPro] = useState<any>();
  const [tran, setTran] = useState(0);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  useEffect(() => { }, [currentMenu]);

  const { isLoading, data, isError } = useQuery([`payment-${router.query.index}`], () =>
    getPaymentByID(host?.url, router.query.index)
  );

  const handleDetails = (name: string) => (e: ChangeEvent<any>) => {
    setDetails({ ...details, [name]: e.target.value });
  };

  const handleUpdate = async () => {
    const body: any = [
      {
        value: details.rating,
        desc: details.dekripsi,
        product: pro.data.id
      },
    ];

    setIsLoadingUpdate(true);

    console.log(body)

    const result: any = await addRatings(host?.url, cookies.sfJwt, body, tran);

    if (result.status == 200) {
      router.reload();
    }
  }
  // console.group(pro)

  // console.log({ data })

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  return (
    <>
      {currentMenu[0] == 'detail' ? (
        <Layout>
          <Stack direction="column" alignItems="center" textAlign="center" minHeight="50vh">
            {!isLoading && (
              <Heading as="h2" size="md" mb={8}>
                {data.data.data.attributes.xendit_va_object.status == 'PENDING' ? 'Selesaikan Proses Pembayaran' : 'Detail Transaksi'}
              </Heading>
            )}

            <Stack textAlign="left" border="1px" width="50%" maxWidth="36rem" py={4} px={6} borderRadius={6}>
              <Stack direction='row' justifyContent='space-between' alignItems="center">
                <Heading as="h2" size="md" mb={2}>
                  Detail
                </Heading>

                {!isLoading &&
                  <>
                    {
                      data.data.data.attributes.xendit_va_object.status == 'PENDING' &&
                      <a href={data.data.data.attributes.xendit_va_object.invoice_url}>
                        <Alert status='info' py={2} width="max-content" borderRadius={6} fontWeight='bold'>Bayar Sekarang</Alert>
                      </a>
                    }
                  </>
                }
              </Stack>

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Text>Status Pembayaran</Text>
                {isLoading ? (
                  <Skeleton height="32px" width="3rem" />
                ) : (
                  <Text fontWeight="bold">
                    {data.data.data.attributes.xendit_va_object.status}
                  </Text>
                )}
              </Stack>

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Text>Status Pengiriman</Text>
                {isLoading ? (
                  <Skeleton height="32px" width="3rem" />
                ) : (
                  <Text fontWeight="bold">
                    {data.data.data.attributes.transaction.data.attributes.status.toUpperCase()}
                  </Text>
                )}
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Text>Kurir</Text>
                {isLoading ? (
                  <Skeleton height="32px" width="3rem" />
                ) : (
                  <Text as="p">{formatter.format(data.data.data.attributes.transaction.data.attributes.courier.amount)}, JNE</Text>
                )}
                {/* ({data.data.data.attributes.transaction.data.attributes.courier.type}) */}

              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Text>Total</Text>
                {isLoading ? (
                  <Skeleton height="32px" width="3rem" />
                ) : (
                  <Text as="p">{formatter.format(data.data.data.attributes.xendit_va_object.amount)}</Text>
                )}
              </Stack>

              {/* <Stack direction="row" justifyContent="space-between">
              <Text>Bayar sebelum</Text>

              {isLoading ? (
                <Skeleton height="32px" width="3rem" />
              ) : (
                <Text as="p">
                  Change
                </Text>
              )}
            </Stack> */}

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
                      {data.data.data.attributes.transaction.data.attributes.transaction_details.data.map(
                        (product: any) => (
                          <>
                            <Stack spacing={2} border="1px" py={1} px={2} borderRadius={6} width="100%">
                              <Stack direction="row" justifyContent="space-between">
                                <Text as="p">Nama</Text>

                                <Link
                                  href="#"
                                >
                                  <a>
                                    <Text as="p" textDecoration="none">
                                      {product.attributes.product.data.attributes.name}
                                    </Text>
                                  </a>
                                </Link>
                              </Stack>

                              <Stack direction="row" justifyContent="space-between">
                                <Text as="p">Jumlah</Text>

                                <Text as="p">{product.attributes.qty}</Text>
                              </Stack>

                              <Stack direction="row" justifyContent="space-between">
                                <Text as="p">Harga</Text>

                                <Text as="p">
                                  {formatter.format(product.attributes.product.data.attributes.price)}
                                </Text>
                              </Stack>

                              <Stack direction="row" justifyContent="space-between">
                                <Text as="p">Subtotal</Text>

                                <Text as="p">
                                  {formatter.format(Number(product.attributes.qty) * Number(product.attributes.product.data.attributes.price))}
                                </Text>
                              </Stack>

                              <Stack>
                                {product.attributes.is_rate ? (<Text as="p">Sudah diberi rating</Text>) : (
                                  <Text as="p"
                                    onClick={() => { setCurrentMenu(['rating']); setPro(product.attributes.product); setTran(product.id) }}
                                    // onClick={() => { setCurrentMenu(['rating', product.attributes.product, product.id]) }}
                                    cursor="pointer">
                                    <Alert status='info' py={2} width="max-content" borderRadius={6} fontWeight='bold'>Beri Ulasan</Alert>
                                  </Text>
                                )}

                              </Stack>
                            </Stack>
                          </>
                        )
                      )}
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Layout>
      ) : (
        <Layout>
          <Box width={['100%', '50%']} mx={'auto'}>
            <Box width={['100%', '100%']} mx={'auto'} >
              {isLoading ? (
                <Skeleton width={384} height={384} />
              ) : (
                <Image
                  src={
                    pro.data.attributes.image.data
                      ? pro.data.attributes.image.data[0].attributes.url
                      : '/default-placeholder.png'
                  }
                  // src={'/default-placeholder.png'}
                  alt="Products"
                  width={384}
                  height={384}
                />
              )}
            </Box>
            <Heading as="h6">{pro.data.attributes.name}</Heading>
            <Divider my={8} />

            <VStack align="stretch" spacing={4} mb={6}>
              <Box>
                <Text as="p">Rating</Text>
                <Select
                  placeholder="Pilih Rating"
                  onChange={handleDetails('rating')}
                  defaultValue={
                    details.rating
                      ? details.rating
                      : null
                  }
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Select>
              </Box>
              <Box>
                <Text as="p">Deskripsi</Text>
                <Textarea
                  placeholder="Deskripsi"
                  defaultValue={
                    details.dekripsi
                      ? details.dekripsi : ''
                  }
                  onChange={handleDetails('dekripsi')}
                />
              </Box>
            </VStack>
            <Button colorScheme="blue" onClick={handleUpdate} isLoading={isLoadingUpdate} loadingText="Menambah Rating">
              Simpan
            </Button>
          </Box>
        </Layout>
      )}

      <Footer />
    </>
  );
};

export default AboutUs;
