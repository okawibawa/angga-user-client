import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

// chakra
import { Box, Heading, Text } from '@chakra-ui/react';

// components
import Layout from '../../components/Layout';

const Category: NextPage = () => {
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

  return (
    <Layout>
      <Box mb={8}>
        <Box mb={2}>
          <Heading as="h3" size="md">
            {router.query.index}
          </Heading>
        </Box>

        <Box display="grid" gridTemplateColumns={['1fr 1fr', 'repeat(5, 1fr)']} gap={[3, 2.5]}>
          {new Array(10).fill(null).map((arr, index) => (
            <Link href={{ pathname: '/product-detail/[index]', query: { index: 'ikan-tuna' } }} key={index}>
              <a>
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
              </a>
            </Link>
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default Category;
