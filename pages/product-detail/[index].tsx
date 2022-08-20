import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// chakra ui
import { Input, Box, Heading, Text, Divider, Container, Button } from '@chakra-ui/react';

// components
import Layout from '../../components/Layout';

// icons
import { Plus, Minus } from 'iconoir-react';

const ProductDetail: NextPage = () => {
  const [qty, setQty] = useState(0);

  const handleSubtractQty = () => {
    if (qty === 1) {
      return false;
    } else {
      setQty((qty) => qty - 1);
    }
  };

  const handleAddQty = () => {
    if (qty === 8) {
      return false;
    } else {
      setQty((qty) => qty + 1);
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
            <Image src="/default-placeholder.png" alt="Products" width={384} height={384} />
          </Box>

          <Box my={[4, 0]} width={['100%', '32%']}>
            <Heading as="h2" fontSize={['lg', 'md']} mb={2}>
              Ikan Tuna
            </Heading>
            <Heading as="h3" mb={[0, 4]} fontSize={['xl', 'lg']}>
              Rp25.000/kg
            </Heading>

            <Divider my={[6]} display={['block', 'none']} />

            <Text as="p" fontWeight="bold" mb={2}>
              Detail
            </Text>
            <Text as="p">Lorem ipsum dolor sit.</Text>
          </Box>

          <Box display={['none', 'block']} width={['100%', '32%']} border="1px solid #ddd" borderRadius={4} p={6}>
            <Heading as="h6" fontSize={['lg', 'md']} mb={4}>
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
                  <Minus color={qty === 1 ? '#ddd' : '#333'} />
                </Box>
                <Input textAlign="center" variant="unstyled" placeholder="0" value={qty} />
                <Box cursor="pointer" onClick={handleAddQty}>
                  <Plus color={qty === 8 ? '#ddd' : '#333'} />
                </Box>
              </Box>

              <Text as="p" ml={2} fontSize={['lg', 'md']}>
                Stok Sisa: 8 kg
              </Text>
            </Box>

            <Box>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Heading as="h6" fontSize={['md', 'sm']} color="gray" mb={4}>
                  Subtotal
                </Heading>

                <Heading as="h6" fontSize={['lg', 'md']} mb={4}>
                  Rp200.000
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
