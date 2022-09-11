import Image from 'next/image';
import Link from 'next/link';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

// types
type ProductsProps = {
  isLoading: boolean;
  isError: any;
  data: any;
};

// chakra
import { Box, Heading, Text, Skeleton } from '@chakra-ui/react';

const Products = ({ isLoading, isError, data }: ProductsProps) => {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  return (
    <Box mb={32}>
      {/* Newest */}
      <Box mb={8}>
        <Box mb={2}>
          <Heading as="h3" size="md">
            Terbaru
          </Heading>
        </Box>

        <Box>
          {isLoading ? (
            <Heading>Tunggu..</Heading>
          ) : data.data.data.length > 0 ? (
            <Swiper
              spaceBetween={10}
              slidesPerView={2}
              breakpoints={{
                600: {
                  slidesPerView: 4,
                  spaceBetween: 5,
                },
                900: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
                1200: {
                  slidesPerView: 6,
                  spaceBetween: 10,
                },
              }}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {data.data.data.map((arr: any, index: number) => (
                <SwiperSlide key={index}>
                  <Link href={{ pathname: '/product-detail/[index]', query: { index: arr.attributes.slug } }}>
                    <a>
                      <div className="keen-slider__slide number-slide1">
                        <Box
                          backgroundColor="#fff"
                          border="1px solid #d6d6d6"
                          p={[2, 4]}
                          borderRadius={8}
                          cursor="pointer"
                          minH="320px"
                          flex={1}
                        >
                          <Image
                            width={256}
                            height={256}
                            src={
                              arr.attributes.image.data
                                ? arr.attributes.image.data[0].attributes.url
                                : '/default-placeholder.png'
                            }
                            alt={arr.attributes.name}
                          />

                          <Box mt={4}>
                            <Text as="p" fontWeight="bold" size={['sm', 'md']}>
                              {formatter.format(arr.attributes.price)}/{arr.attributes.unit}
                            </Text>
                            <Text as="p" size={['xs', 'md']} noOfLines={2} wordBreak="break-all">
                              {arr.attributes.name}
                            </Text>
                          </Box>
                        </Box>
                      </div>
                    </a>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Heading>Tidak ada produk..</Heading>
          )}
        </Box>
      </Box>

      {/* Recommendation */}
      {/* <Box>
        <Box mb={2}>
          <Heading as="h3" size="md">
            Rekomendasi
          </Heading>
        </Box>

        <Box>
          {isLoading ? (
            <Heading>Tunggu...</Heading>
          ) : (
            <Box
              display="grid"
              gridTemplateColumns={['1fr 1fr', 'repeat(4, 1fr)', 'repeat(5, 1fr)', 'repeat(6, 1fr)']}
              gap={[3, 2.5]}
              alignItems="stretch"
            >
              {data.data.data.length > 0 ? (
                data.data.data.slice(0, 12).map((arr: any, index: number) => (
                  <Box key={index}>
                    <Link href={{ pathname: '/product-detail/[index]', query: { index: arr.attributes.slug } }}>
                      <a>
                        <Box
                          backgroundColor="#fff"
                          border="1px solid #d6d6d6"
                          p={[2, 4]}
                          borderRadius={8}
                          cursor="pointer"
                          height="100%"
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
                  </Box>
                ))
              ) : (
                <Heading>Tidak ada produk.</Heading>
              )}
            </Box>
          )}
        </Box>
      </Box> */}
    </Box>
  );
};

export default Products;
