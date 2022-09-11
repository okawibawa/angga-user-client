import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';
import { HostContext } from '../../context/HostContext';

import Layout from '../../components/Layout';

import { Stack, Text, Heading, Box, Button, Skeleton, Divider, Input, Select } from '@chakra-ui/react';

type ProductDetailsProps = {
  isLoading: boolean;
  isError: any;
  data: any;
};

// react query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// icons
import { Plus, Minus, NavArrowDown } from 'iconoir-react';

import { findProductDetail, getFVA } from '../../apis/api';
import Footer from '../../components/Footer';

const BuyNow = () => {
  const host = useContext(HostContext);
  const router = useRouter();
  let stock: number = 0;

  const [subtotal, setSubtotal] = useState<number>(0);
  const [qty, setQty] = useState<number>(1);

  const { isLoading, isError, data }: ProductDetailsProps = useQuery(
    [`product-detail-${router.query.index}`],
    async () => findProductDetail(host?.url, router.query.index)
  );

  useEffect(() => {
    const banks = async () => {
      const result = await getFVA();

      console.log({ result });
    };

    banks();
  }, []);

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  const handleSubtractQty = () => {
    if (Number(qty) === 1) {
      return false;
    } else {
      setQty((qty) => Number(qty) - 1);
      setSubtotal(Number(subtotal) - Number(data.data.data[0].attributes.price));
    }
  };

  if (!isLoading) {
    stock = data.data.data[0].attributes.stock.slice(0, data.data.data[0].attributes.stock.length - 2);
  }

  useEffect(() => {
    if (data) setSubtotal(data.data.data[0].attributes.price);
  }, [data]);

  const handleAddQty = () => {
    if (Number(qty) === Number(stock)) {
      return false;
    } else {
      setQty((qty) => Number(qty) + 1);
      setSubtotal(Number(subtotal) + Number(data.data.data[0].attributes.price));
    }
  };

  const handleChangeQty = (e: React.FormEvent<HTMLInputElement>) => {
    setQty(Number(e.currentTarget.value));
    setSubtotal(Number(data.data.data[0].attributes.price) * Number(e.currentTarget.value));
    stock = data.data.data[0].attributes.stock.slice(0, data.data.data[0].attributes.stock.length - 2);

    if (Number(e.currentTarget.value) > Number(stock)) {
      setQty(stock);
      setSubtotal(Number(data.data.data[0].attributes.price) * Number(stock));
    }

    if (Number(e.currentTarget.value) <= 0) {
      setQty(1);
      setSubtotal(Number(data.data.data[0].attributes.price));
    }
  };

  return (
    <Layout>
      <Stack direction={['column']} spacing={8}>
        <Stack direction={['column']}>
          <Heading as="h2" size="md">
            Beli Langsung
          </Heading>
          <Text as="p">Ini halaman terakhir dari proses belanjamu. Pastikan semua sudah benar, ya ☺️</Text>
        </Stack>

        <Stack direction={['column']}>
          <Heading as="h3" size="sm">
            Barang yang dibeli
          </Heading>

          <Box
            display="flex"
            flexDirection={['column', 'row']}
            alignItems={['flex-start']}
            justifyContent={['flex-start', 'space-between']}
            mb={['6rem', 0]}
            minHeight="50vh"
          >
            <Box width={['100%', '32%']}>
              {isLoading ? (
                <Skeleton width={384} height={384} />
              ) : (
                <Image
                  src={
                    data.data.data[0].attributes.image.data
                      ? data.data.data[0].attributes.image.data[0].attributes.url
                      : '/default-placeholder.png'
                  }
                  alt="Products"
                  width={384}
                  height={384}
                />
              )}
            </Box>

            <Box my={[4, 0]} width={['100%', '32%']}>
              <Heading as="h2" size={['lg', 'md']} mb={2}>
                {isLoading ? (
                  <Skeleton height="20px" />
                ) : (
                  <Text as="p" size={['xs', 'md']}>
                    {data.data.data[0].attributes.name}
                  </Text>
                )}
              </Heading>
              <Heading as="h3" mb={[0, 4]} size={['xl', 'lg']}>
                {isLoading ? (
                  <Skeleton height="20px" />
                ) : (
                  <Text as="p" fontSize={['2xl', '2xl']}>
                    {formatter.format(data.data.data[0].attributes.price)}/{data.data.data[0].attributes.unit}
                  </Text>
                )}
              </Heading>

              <Divider my={[6]} display={['block', 'none']} />

              <Text as="p" fontWeight="bold" mb={2}>
                Deskripsi
              </Text>
              {isLoading ? (
                <Skeleton height="20px" />
              ) : (
                <Text as="p">
                  {data.data.data[0].attributes.description ? data.data.data[0].attributes.description : '-'}
                </Text>
              )}

              <Heading as="h6" size={['sm', 'md']} mb={4}>
                Atur Jumlah (kg)
              </Heading>

              <Box display="flex" alignItems="center" mb={6}>
                <Box
                  border="1px solid #ddd"
                  borderRadius={4}
                  py={2}
                  px={2}
                  display="flex"
                  width="7rem"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box cursor="pointer" onClick={handleSubtractQty}>
                    <Minus color={Number(qty) === 1 ? '#ddd' : '#333'} />
                  </Box>
                  <Input textAlign="center" variant="unstyled" placeholder="0" value={qty} onChange={handleChangeQty} />
                  <Box cursor="pointer" onClick={handleAddQty}>
                    <Plus color={Number(qty) === Number(stock) ? '#ddd' : '#333'} />
                  </Box>
                </Box>

                <Text as="p" ml={2} size={['lg', 'md']} display="flex" alignItems="center">
                  Stok Sisa:{' '}
                  {isLoading ? <Skeleton ml={1} height="20px" width="32px" /> : data.data.data[0].attributes.stock}
                </Text>
              </Box>
            </Box>

            <Stack spacing={4} width={['100%', '32%']}>
              <Box border="1px solid #ddd" borderRadius={4} p={6} mb={[4, 0]}>
                <Stack direction="column" spacing={4}>
                  <Heading as="h6" size="md">
                    Metode Pembayaran
                  </Heading>

                  <Box>
                    <Select placeholder="Pilih metode pembayaran">
                      <option value="option1">Option 1</option>
                    </Select>
                  </Box>
                </Stack>
              </Box>

              <Box border="1px solid #ddd" borderRadius={4} p={6} mb={[4, 0]}>
                <Stack direction="column" spacing={4}>
                  <Heading as="h6" size="md">
                    Ringakasan Belanja
                  </Heading>

                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Heading as="h6" size={['sm', 'sm']} color="gray" mb={4}>
                      Total ({qty})
                    </Heading>

                    <Heading as="h6" size={['sm', 'md']} mb={4}>
                      {!isLoading ? formatter.format(subtotal) : <Skeleton height="20px" width="32px" />}
                    </Heading>
                  </Box>

                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Heading as="h6" size={['sm', 'sm']} color="gray" mb={4}>
                      Total Tagihan
                    </Heading>

                    <Heading as="h6" size={['sm', 'md']} mb={4}>
                      {!isLoading ? formatter.format(subtotal) : <Skeleton height="20px" width="32px" />}
                    </Heading>
                  </Box>

                  <Button colorScheme="blue">Bayar</Button>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default BuyNow;
