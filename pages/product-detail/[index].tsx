import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useContext } from 'react';
import { HostContext } from '../../context/HostContext';

type ProductDetailsProps = {
  isLoading: boolean;
  isError: any;
  data: any;
};

// react query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// chakra ui
import { Input, Box, Heading, Text, Divider, Container, Button, Skeleton } from '@chakra-ui/react';

// components
import Layout from '../../components/Layout';

// icons
import { Plus, Minus } from 'iconoir-react';
import { findProductDetail } from '../../apis/api';

const ProductDetail: NextPage = () => {
  const host = useContext(HostContext);
  const router = useRouter();
  let stock: number = 0;

  const [subtotal, setSubtotal] = useState<number>(0);
  const [qty, setQty] = useState<number>(1);

  const { isLoading, isError, data }: ProductDetailsProps = useQuery(
    [`product-detail-${router.query.index}`],
    async () => findProductDetail(host?.url, router.query.index)
  );

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
    <Box>
      <Layout>
        <Box
          display="flex"
          flexDirection={['column', 'row']}
          alignItems={['flex-start']}
          justifyContent={['flex-start', 'space-between']}
          mb={['6rem', 0]}
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
              {isLoading ? <Skeleton height="20px" /> : <Text as="p">{data.data.data[0].attributes.name}</Text>}
            </Heading>
            <Heading as="h3" mb={[0, 4]} size={['xl', 'lg']}>
              {isLoading ? (
                <Skeleton height="20px" />
              ) : (
                <Text>
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
          </Box>

          <Box display={['none', 'block']} width={['100%', '32%']} border="1px solid #ddd" borderRadius={4} p={6}>
            <Heading as="h6" size={['lg', 'md']} mb={4}>
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

            <Box>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Heading as="h6" size={['md', 'sm']} color="gray" mb={4}>
                  Subtotal
                </Heading>

                <Heading as="h6" size={['lg', 'md']} mb={4}>
                  {!isLoading ? formatter.format(subtotal) : <Skeleton height="20px" width="32px" />}
                </Heading>
              </Box>

              <Box>
                <Button mb={2} w="100%" size="sm" colorScheme="blue">
                  + Keranjang
                </Button>

                <Button w="100%" size="sm" colorScheme="blue" variant="outline">
                  Beli
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Layout>

      <Box
        display={['block', 'none']}
        position="fixed"
        bottom={0}
        width="100%"
        py={4}
        boxShadow="0px 2px 14px 3px rgba(107, 107, 107, 0.44)"
        backgroundColor="white"
      >
        <Container maxW="container.xl">
          <Box display="flex" justifyContent="flex-end">
            <Button size="sm" colorScheme="blue" variant="outline">
              Beli
            </Button>
            <Button size="sm" colorScheme="blue" ml={2}>
              + Keranjang
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ProductDetail;
