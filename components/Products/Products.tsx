import Image from 'next/image';
import Link from 'next/link';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

// chakra
import { Box, Heading, Text } from '@chakra-ui/react';

const Products = () => {
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
          <div ref={ref} className="keen-slider">
            {new Array(10).fill(null).map((arr, index) => (
              <Link href={{ pathname: '/product-detail/[index]', query: { index: 'ikan-tuna' } }} key={index}>
                <a>
                  <div className="keen-slider__slide number-slide1">
                    <Box backgroundColor="#fff" border="1px solid #d6d6d6" p={[2, 4]} borderRadius={8} cursor="pointer">
                      <Image width={256} height={256} src="/default-placeholder.png" alt="Placeholder" />

                      <Box mt={4}>
                        <Text as="p" fontWeight="bold" fontSize={['sm', 'md']}>
                          Rp80.000/kg
                        </Text>
                        <Text as="p" fontSize={['xs', 'md']}>
                          Ikan Tuna
                        </Text>
                      </Box>
                    </Box>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </Box>
      </Box>

      {/* Recommendation */}
      <Box>
        <Box mb={2}>
          <Heading as="h3" size="md">
            Rekomendasi
          </Heading>
        </Box>

        <Box display="grid" gridTemplateColumns={['1fr 1fr', 'repeat(5, 1fr)']} gap={[3, 2.5]}>
          {new Array(10).fill(null).map((arr, index) => (
            <Box
              key={index}
              backgroundColor="#fff"
              border="1px solid #d6d6d6"
              p={[2, 4]}
              borderRadius={8}
              cursor="pointer"
            >
              <Image width={256} height={256} src="/default-placeholder.png" alt="Placeholder" />

              <Box mt={4}>
                <Text as="p" fontWeight="bold" fontSize={['sm', 'md']}>
                  Rp80.000/kg
                </Text>
                <Text as="p" fontSize={['xs', 'md']}>
                  Ikan Tuna
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Products;
