import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useContext } from 'react';
import { HostContext } from '../../context/HostContext';
import { parseCookies } from 'nookies';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type ProductDetailsProps = {
  isLoading: boolean;
  isError: any;
  data: any;
};

// react query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// chakra ui
import { Input, Box, Heading, Text, Divider, Container, Button, Skeleton, useToast } from '@chakra-ui/react';

// components
import Layout from '../../components/Layout';

// icons
import { Plus, Minus } from 'iconoir-react';
import { createCart, findProductDetail } from '../../apis/api';
import Footer from '../../components/Footer';

const ProductDetail: NextPage = () => {
  const host = useContext(HostContext);
  const router = useRouter();
  let stock: number = 0;
  const toast = useToast();

  const [cookies, setCookies] = useState<any | null>({
    sfJwt: '',
    sfUserId: '',
    sfUsername: '',
    sfAddress: '',
    sfPhone: '',
  });
  const [subtotal, setSubtotal] = useState<number>(0);
  const [qty, setQty] = useState<number>(1);
  const [isLoadingCart, setIsLoadingCart] = useState<boolean>(false);
  const [totalRating, setTotalRating] = useState(0);
  useEffect(() => {}, [totalRating]);

  useEffect(() => {
    const cookies = parseCookies();

    setCookies({ ...cookies });
  }, []);

  const ratingnya = () => {};
  const { isLoading, isError, data }: ProductDetailsProps = useQuery(
    [`product-detail-${router.query.index}`],
    async () => findProductDetail(host?.url, router.query.index),
    {
      onSuccess: (data) => {
        setSubtotal(data.data.data[0].attributes.price);
        console.log(data);
        if (data.data.data[0].attributes.ratings > 1) {
          let total = 0;
          data.data.data[0].attributes.ratings.data.map((rating: any) => {
            total = total + rating.attributes.value;
          });
          setTotalRating(Math.ceil(total / data.data.data[0].attributes.ratings.data.length));
          // console.log(data.data.data[0].attributes.ratings)
        } else {
          setTotalRating(0);
        }
      },
    }
  );

  const handleCreateCart = async () => {
    if (!cookies.sfJwt) {
      router.replace('/login');
      return;
    }

    setIsLoadingCart(true);

    const result: any = await createCart(
      host?.url,
      String(qty),
      String(subtotal),
      cookies.sfUserId,
      data.data.data[0].id
    );

    if (result.status == 200) {
      setIsLoadingCart(false);

      toast({
        title: 'Produk ditambahkan.',
        description: 'Produk berhasil ditambahkan ke keranjang.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  };

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
    // stock = data.data.data[0].attributes.stock.slice(0, data.data.data[0].attributes.stock.length - 2);
    stock = data.data.data[0].attributes.stock;
  }

  const handleAddQty = () => {
    if (Number(qty) === Number(stock)) {
      return false;
    } else {
      setQty((qty) => Number(qty) + 1);
      setSubtotal(Number(subtotal) + Number(data.data.data[0].attributes.price));
    }
  };

  const handleBuyNow = async () => {
    if (!cookies.sfJwt) {
      router.replace('/login');
      return;
    }

    router.push({
      pathname: '/buy-now/[index]',
      query: { index: data.data.data[0].attributes.slug },
    });
  };

  return (
    <Box>
      <Layout>
        <Box
          display="flex"
          flexDirection={['column', 'row']}
          alignItems={['flex-start']}
          justifyContent={['flex-start', 'space-between']}
          mb={['2rem', 0]}
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
            <Heading as="h2" size={['lg', 'md']}>
              {isLoading ? <Skeleton height="20px" /> : <Text as="p">{data.data.data[0].attributes.name}</Text>}
            </Heading>
            <Text mb={2} color={'gold'}>
              {isLoading ? (
                <Skeleton height="10px" />
              ) : (
                <Text>
                  {[...Array(totalRating)].map((value) => (
                    <>
                      <Text as={'span'}>&#9733;</Text>
                    </>
                  ))}
                </Text>
              )}
            </Text>
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
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.data.data[0].attributes.desc}</ReactMarkdown>
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
                {/* <Input textAlign="center" variant="unstyled" placeholder="0" value={qty} onChange={handleChangeQty} /> */}
                <Text as="p">{qty}</Text>
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

              <Text as="p" my={2} color="red.400" display={cookies.sfAddress ? 'none' : 'block'}>
                Lengkapi alamat pengiriman pada halaman{' '}
                <Link href="/profile">
                  <a style={{ textDecoration: 'underline' }}>profile</a>
                </Link>{' '}
                terlebih dahulu.
              </Text>

              {Number(stock) === 0 && (
                <Text as="p" my={2} color="red.400">
                  Stok Habis!
                </Text>
              )}

              <Box>
                <Button
                  onClick={handleCreateCart}
                  mb={2}
                  w="100%"
                  size="sm"
                  colorScheme="blue"
                  isLoading={isLoadingCart}
                  disabled={Number(stock) === 0 ? true : !cookies.sfAddress ? true : false}
                >
                  <>{console.log({ stock })}+ Keranjang</>
                </Button>

                {isLoading ? (
                  <Skeleton height="24px" width="100%" />
                ) : (
                  <Button
                    onClick={handleBuyNow}
                    w="100%"
                    size="sm"
                    colorScheme="blue"
                    variant="outline"
                    isLoading={isLoadingCart}
                    disabled={Number(stock) === 0 ? true : !cookies.sfAddress ? true : false}
                  >
                    Beli Sekarang
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        {/*  */}

        <Box
          display="flex"
          flexDirection={['column', 'row']}
          alignItems={['flex-start']}
          justifyContent={['flex-start', 'space-between']}
          mt={[0, 100]}
          minHeight="50vh"
        >
          <Box width={['100%', '100%']} border="1px solid #ddd" borderRadius={4} p={6}>
            <Heading as="h6" size={['lg', 'md']} mb={4}>
              Ulasan
            </Heading>
            {isLoading ? (
              <Skeleton height="20px" />
            ) : data.data.data[0].attributes.ratings.data.length > 1 ? (
              <Box>
                {data.data.data[0].attributes.ratings.data.map((rating: any) => (
                  <>
                    <Box
                      display="flex"
                      flexDirection={['row', 'row']}
                      alignItems={['flex-start']}
                      justifyContent={['flex-start']}
                      mt={10}
                      minHeight="10vh"
                    >
                      <Box width={['20%', '10%']}>
                        {isLoading ? (
                          <Skeleton width={384} height={384} />
                        ) : (
                          <Image
                            // src={
                            //   data.data.data[0].attributes.image.data
                            //     ? data.data.data[0].attributes.image.data[0].attributes.url
                            //     : '/default-placeholder.png'
                            // }
                            src={'/default-placeholder.png'}
                            alt="Products"
                            width={384}
                            height={384}
                          />
                        )}
                      </Box>
                      <Box my={[4, 0]} width={['100%', '32%']}>
                        <Text as="p" size={['sm', 'md']} ml={[5, 15]}>
                          {isLoading ? <Skeleton height="10px" /> : <Text as="p">{rating.attributes.desc}</Text>}
                        </Text>
                        <Text as="p" mb={[0, 4]} ml={[5, 15]} size={['sm', 'sm']}>
                          {isLoading ? (
                            <Skeleton height="20px" />
                          ) : (
                            <Text color={'gold'}>
                              {[...Array(rating.attributes.value)].map((value) => (
                                <>
                                  <Text as={'span'}>&#9733;</Text>
                                </>
                              ))}
                            </Text>
                          )}
                        </Text>
                      </Box>
                    </Box>
                  </>
                ))}
              </Box>
            ) : (
              <Heading as="h5" mx={'auto'}>
                Belum ada Ulasan{' '}
              </Heading>
            )}
          </Box>
        </Box>

        {/*  */}
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
          <Text as="p" my={2} color="red.400" display={cookies.sfAddress ? 'none' : 'block'}>
            Lengkapi alamat pengiriman pada{' '}
            <Link href="/profile">
              <a style={{ textDecoration: 'underline' }}>profile</a>
            </Link>{' '}
            terlebih dahulu.
          </Text>

          {Number(stock) === 0 && (
            <Text as="p" my={2} color="red.400">
              Stok Habis!
            </Text>
          )}

          <Box display="flex" justifyContent="flex-end">
            {isLoading ? (
              <Skeleton height="24px" width="100%" />
            ) : (
              <Button
                onClick={handleBuyNow}
                w="100%"
                size="sm"
                colorScheme="blue"
                variant="outline"
                isLoading={isLoadingCart}
                disabled={Number(stock) === 0 ? true : !cookies.sfAddress ? true : false}
              >
                Beli Sekarang
              </Button>
            )}
            <Button
              onClick={handleCreateCart}
              size="sm"
              colorScheme="blue"
              ml={2}
              isLoading={isLoadingCart}
              disabled={Number(stock) === 0 ? true : !cookies.sfAddress ? true : false}
            >
              Keranjang
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default ProductDetail;
