import Image from 'next/image';
import Link from 'next/link';
import { Box, Heading, Text } from '@chakra-ui/react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

// constants
import { CATEGORIES } from './constant';

const Categories = () => {
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
        <div ref={sliderRef} className="keen-slider">
          {CATEGORIES.map((category) => (
            <Link href={{ pathname: `/category/[index]`, query: { index: category.slug } }} key={category.title}>
              <a>
                <div className="keen-slider__slide number-slide1" style={{ minWidth: '120px', maxWidth: '128px' }}>
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
                    <img src={category.icon} width={24} height={24} alt={category.title} />
                    <Text as="p" marginLeft={3}>
                      {category.title}
                    </Text>
                  </Box>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </Box>
    </Box>
  );
};

export default Categories;
