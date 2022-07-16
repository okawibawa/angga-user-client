import React, { useState } from 'react';
import Link from 'next/link';

// chakra
import { Box, Container, Divider, UnorderedList, ListItem, Button, Text, Heading } from '@chakra-ui/react';

// iconoir
import { SimpleCart, Menu, Cancel } from 'iconoir-react';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Box>
      <Container maxW="container.xl">
        <Box display="flex" justifyContent="space-between" alignItems="center" py={6} position="relative">
          <Box>
            <Heading as="h1" fontSize="md">
              Seafood
            </Heading>
          </Box>

          <UnorderedList display={['none', 'flex']} alignItems="center" listStyleType="none">
            <ListItem>
              <Link href="">
                <a>
                  <SimpleCart />
                </a>
              </Link>
            </ListItem>
            <ListItem marginX={8}>
              <Divider orientation="vertical" height={6} />
            </ListItem>
            <ListItem marginRight={4}>
              <Button variant="outline" colorScheme="blue" size="sm">
                <Link href="#">
                  <a>
                    <Text as="p" fontWeight="normal">
                      Masuk
                    </Text>
                  </a>
                </Link>
              </Button>
            </ListItem>
            <ListItem>
              <Button colorScheme="blue" size="sm">
                <Link href="#">
                  <a>
                    <Text as="p" fontWeight="normal">
                      Daftar
                    </Text>
                  </a>
                </Link>
              </Button>
            </ListItem>
          </UnorderedList>

          <Box display={['block', 'none']}>
            <Box
              visibility={`${isMobileMenuOpen === false ? 'visible' : 'hidden'}`}
              opacity={`${isMobileMenuOpen === false ? '1' : '0'}`}
              position="absolute"
              right="0"
              top="50%"
              transform="translateY(-50%)"
              transition="all ease-in-out .200s"
            >
              <Menu cursor="pointer" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} />
            </Box>

            <Box
              visibility={`${isMobileMenuOpen === true ? 'visible' : 'hidden'}`}
              opacity={`${isMobileMenuOpen === true ? '1' : '0'}`}
              position="absolute"
              right="0"
              top="50%"
              transform="translateY(-50%)"
              transition="all ease-in-out .200s"
            >
              <Cancel cursor="pointer" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
