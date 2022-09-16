import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies, destroyCookie } from 'nookies';

// chakra
import {
  Stack,
  Box,
  Container,
  Divider,
  Button,
  Text,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

// iconoir
import { SimpleCart, Menu as MenuBurger, Cancel, User } from 'iconoir-react';

const Header = () => {
  const cookies = parseCookies();
  const router = useRouter();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    destroyCookie(null, 'sfJwt');
    destroyCookie(null, 'sfUser');
    destroyCookie(null, 'sfUserId');
    destroyCookie(null, 'sfUsername');

    router.reload();
  };

  return (
    <Box position="relative">
      <Container maxW="container.xl">
        <Box display="flex" justifyContent="space-between" alignItems="center" py={6} position="relative">
          <Box>
            <Link href="/">
              <a>
                <Heading as="h1" size="lg">
                  UD. Putra
                </Heading>
              </a>
            </Link>
          </Box>

          <Stack direction={['row']} spacing={4} display={['none', 'flex']} alignItems="center" listStyleType="none">
            <Link href="/">
              <a>
                <Text as="p">Home</Text>
              </a>
            </Link>

            <Link href="/about-us">
              <a>
                <Text as="p">About Us</Text>
              </a>
            </Link>

            <Link href="/contact-us">
              <a>
                <Text as="p">Contact Us</Text>
              </a>
            </Link>

            <Divider orientation="vertical" height={6} />

            <Link href="/cart">
              <a>
                <SimpleCart />
              </a>
            </Link>

            <Divider orientation="vertical" height={6} />

            <Box marginRight={4} display={cookies.sfJwt ? 'none' : 'block'}>
              <Link href="/login">
                <a>
                  <Button variant="outline" colorScheme="blue" size="sm">
                    <Text as="p" fontWeight="normal">
                      Masuk
                    </Text>
                  </Button>
                </a>
              </Link>
            </Box>

            <Box display={cookies.sfJwt ? 'none' : 'block'}>
              <Link href="/signup">
                <a>
                  <Button colorScheme="blue" size="sm">
                    <Text as="p" fontWeight="normal">
                      Daftar
                    </Text>
                  </Button>
                </a>
              </Link>
            </Box>

            <Box display={cookies.sfJwt ? 'flex' : 'none'} alignItems="center">
              <Menu>
                <MenuButton
                  backgroundColor="transparent"
                  _hover={{ backgroundColor: 'transparent' }}
                  _active={{ backgroundColor: 'transparent', border: 'none' }}
                >
                  <User />
                </MenuButton>
                <MenuList zIndex={2}>
                  <MenuItem>
                    <Link href="/profile">
                      <a>Akun Saya</a>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Keluar</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Stack>

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
              <MenuBurger cursor="pointer" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} />
            </Box>
          </Box>
        </Box>
      </Container>

      <Box
        visibility={isMobileMenuOpen ? 'visible' : 'hidden'}
        bgColor="white"
        position="fixed"
        zIndex={2}
        width="100%"
        top={0}
        minHeight="100vh"
        p={6}
      >
        <Box textAlign="center">
          <Box
            visibility={`${isMobileMenuOpen === true ? 'visible' : 'hidden'}`}
            opacity={`${isMobileMenuOpen === true ? '1' : '0'}`}
            transition="all ease-in-out .200s"
            marginLeft="auto"
            position="absolute"
            right={4}
          >
            <Cancel cursor="pointer" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} />
          </Box>

          <Stack direction={['column']} spacing={4} color="black" fontWeight="bold">
            <Link href="/">
              <a>
                <Text as="p">Home</Text>
              </a>
            </Link>

            <Link href="/about-us">
              <a>
                <Text as="p">About Us</Text>
              </a>
            </Link>

            <Link href="/contact-us">
              <a>
                <Text as="p">Contact Us</Text>
              </a>
            </Link>

            <Link href="/cart">
              <a>
                <SimpleCart style={{ margin: 'auto' }} />
              </a>
            </Link>

            <Box marginRight={4} display={cookies.sfJwt ? 'none' : 'block'}>
              <Link href="/login">
                <a>
                  <Button variant="outline" colorScheme="blue" size="sm">
                    <Text as="p" fontWeight="normal">
                      Masuk
                    </Text>
                  </Button>
                </a>
              </Link>
            </Box>

            <Box display={cookies.sfJwt ? 'none' : 'block'}>
              <Link href="/signup">
                <a>
                  <Button colorScheme="blue" size="sm">
                    <Text as="p" fontWeight="normal">
                      Daftar
                    </Text>
                  </Button>
                </a>
              </Link>
            </Box>

            <Box display={cookies.sfJwt ? 'flex' : 'none'} alignItems="center" justifyContent="center">
              <Menu>
                <MenuButton
                  backgroundColor="transparent"
                  _hover={{ backgroundColor: 'transparent' }}
                  _active={{ backgroundColor: 'transparent', border: 'none' }}
                >
                  <User />
                </MenuButton>
                <MenuList zIndex={2}>
                  <MenuItem>
                    <Link href="/profile">
                      <a>Akun Saya</a>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Keluar</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
