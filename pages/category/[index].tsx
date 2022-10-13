import { useContext } from 'react';
import { HostContext } from '../../context/HostContext';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

type ProductDetailsProps = {
  isLoading: boolean;
  isError: any;
  data: any;
};

// react query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// chakra
import { Box, Heading, Text } from '@chakra-ui/react';

// components
import Layout from '../../components/Layout';
import { findProductByCategory } from '../../apis/api';

const Category: NextPage = () => {
  const host = useContext(HostContext);
  const router = useRouter();

  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 2,
      spacing: 15,
    },
    breakpoints: {
      '(min-width: 600px)': {
        slides: { perView: 2, spacing: 5 },
      },
      '(min-width: 900px)': {
        slides: { perView: 5, spacing: 10 },
      },
    },
  });

  const { isLoading, isError, data }: ProductDetailsProps = useQuery(
    [`product-category-${router.query.index}`],
    async () => findProductByCategory(host?.url, router.query.index)
  );

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  return (
    <Layout>
      <Box mb={8}>
        <Box mb={2}>
          <Heading as="h2" size="lg">
            {String(router.query.index).replace(/(\b[a-z](?!\s))/g, (s) => s.toUpperCase())}
          </Heading>
        </Box>

        <Box>
          {isLoading ? (
            <Heading>Tunggu...</Heading>
          ) : (
            <>
              {data.data.data.length > 0 ? (
                <Box display="grid" gridTemplateColumns={['1fr 1fr', 'repeat(5, 1fr)']} gap={[3, 2.5]}>
                  {data.data.data.map((arr: any, index: number) => (
                    <Link
                      href={{ pathname: '/product-detail/[index]', query: { index: arr.attributes.slug } }}
                      key={index}
                    >
                      <a>
                        <Box
                          backgroundColor="#fff"
                          border="1px solid #d6d6d6"
                          p={[2, 4]}
                          borderRadius={8}
                          cursor="pointer"
                        >
                          <Image
                            width={256}
                            height={256}
                            src={
                              arr.attributes.image.data
                                ? arr.attributes.image.data[0].attributes.url
                                : '/default-placeholder.png'
                            }
                            alt="Placeholder"
                          />

                          <Box mt={4}>
                            <Text as="p" fontWeight="bold" size={['sm', 'md']}>
                              {formatter.format(arr.attributes.price)}/{arr.attributes.unit}
                            </Text>
                            <Text as="p" size={['xs', 'md']}>
                              {arr.attributes.name}
                            </Text>
                          </Box>
                        </Box>
                      </a>
                    </Link>
                  ))}
                </Box>
              ) : (
                <Heading>Tidak terdapat produk.</Heading>
              )}
            </>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default Category;
