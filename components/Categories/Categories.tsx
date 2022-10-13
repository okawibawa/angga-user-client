import Image from 'next/image';
import Link from 'next/link';
import { Box, Heading, Text } from '@chakra-ui/react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

type CategoriesProps = {
  isLoading: boolean;
  isError: any;
  data: any;
};

// constants
import { CATEGORIES } from './constant';

const Categories = ({ data, isLoading, isError }: CategoriesProps) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    mode: 'snap',
    rtl: false,
    slides: { perView: 'auto', spacing: 12 },
  });

  return (
    <Box mt={8}>
      <Box>
        <Heading as="h2" size="md">
          Kategori
        </Heading>
      </Box>

      <Box mt={4}>
        {isLoading ? (
          <Heading>Mohon tunggu...</Heading>
        ) : (
          <Box>
            {data.data.data.length > 0 ? (
              <div ref={sliderRef} className="keen-slider">
                {data.data.data.map((category: any, i: any) => (
                  <Link
                    href={{ pathname: `/category/[index]`, query: { index: category.attributes.slug } }}
                    key={category.attributes.name}
                  >
                    <a>
                      <div
                        className="keen-slider__slide number-slide1"
                        style={{ minWidth: '120px', maxWidth: '128px' }}
                      >
                        <Box
                          _notLast={{ marginRight: '1rem' }}
                          cursor="pointer"
                          border="1px solid #d6d6d6"
                          borderRadius={8}
                          py={2}
                          px={4}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <img
                            src={category.attributes.logo.data.attributes.url}
                            height={24}
                            width={24}
                            alt={category.attributes.name}
                          />
                          <Text as="p" ml={2}>
                            {category.attributes.name}
                          </Text>
                        </Box>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            ) : (
              <Heading>Tidak terdapat data.</Heading>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Categories;
