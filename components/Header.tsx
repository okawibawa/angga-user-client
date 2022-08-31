import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies, destroyCookie } from 'nookies';

// chakra
import {
  Box,
  Container,
  Divider,
  UnorderedList,
  ListItem,
  Button,
  Text,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react';

// iconoir
import { SimpleCart, Menu as MenuBurger, Cancel, User } from 'iconoir-react';
import { NextCookies } from 'next/dist/server/web/spec-extension/cookies';

const Header = () => {
  const cookies = parseCookies();
  const router = useRouter();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    destroyCookie(null, 'sfJwt');
    destroyCookie(null, 'sfUser');

    router.reload();
  };

  return (
    <Box>
      <Container maxW="container.xl">
        <Box display="flex" justifyContent="space-between" alignItems="center" py={6} position="relative">
          <Box>
            <Link href="/">
              <a>
                <Heading as="h1" fontSize="md">
                  Seafood
                </Heading>
              </a>
            </Link>
          </Box>

          <UnorderedList display={['none', 'flex']} alignItems="center" listStyleType="none">
            <ListItem>
              <Link href="#">
                <a>
                  <SimpleCart />
                </a>
              </Link>
            </ListItem>
            <ListItem marginX={8}>
              <Divider orientation="vertical" height={6} />
            </ListItem>
            <ListItem marginRight={4} display={cookies.sfJwt ? 'none' : 'block'}>
              <Link href="/login">
                <a>
                  <Button variant="outline" colorScheme="blue" size="sm">
                    <Text as="p" fontWeight="normal">
                      Masuk
                    </Text>
                  </Button>
                </a>
              </Link>
            </ListItem>
            <ListItem display={cookies.sfJwt ? 'none' : 'block'}>
              <Link href="/signup">
                <a>
                  <Button colorScheme="blue" size="sm">
                    <Text as="p" fontWeight="normal">
                      Daftar
                    </Text>
                  </Button>
                </a>
              </Link>
            </ListItem>

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
              <MenuBurger cursor="pointer" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} />
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
