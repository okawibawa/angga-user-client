import React, { useState, useContext, useEffect, useRef } from 'react';
import { HostContext } from '../context/HostContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import * as EmailValidator from 'email-validator';
import { setCookie } from 'nookies';

// // types
// type CredentialProps = {
//   identifier: string;
//   password: string;
// };

// chakra ui
import {
  Container,
  Box,
  Heading,
  Text,
  Input,
  Button,
  InputRightElement,
  InputGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

// apis
import { authLogin } from '../apis/api';

const Login = () => {
  const router = useRouter();
  const host = useContext(HostContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [credentials, setCredentials] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [errorLogin, setErrorLogin] = useState<string>('');

  const handleClick = () => setShow(!show);

  const handleCredentials = (name: string) => (e: any) => {
    setCredentials({ ...credentials, [name]: e.target.value });
  };

  const login = async () => {
    if (!EmailValidator.validate(credentials?.identifier)) {
      setErrorMsg('Tolong masukkan email dengan benar!');
      onOpen();
      return;
    }

    if (!credentials?.identifier || !credentials.password) {
      setErrorMsg('Tolong isi email dan password dengan benar!');
      onOpen();
      return;
    }

    setIsLoading(true);

    const result: any = await authLogin(host?.url, credentials);

    if (result.status === 200) {
      setCookie(null, 'sfJwt', result.data.jwt, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });

      setCookie(null, 'sfUser', JSON.stringify(result.data.user), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });

      setIsLoading(false);
      router.push('/');
    } else {
      setErrorLogin(result.response.data.error.message);
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.xl">
      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Peringatan!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text as="p">{errorMsg}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Okay
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Modal End */}

      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <Link href="/">
          <a>
            <Heading as="h2" mb={8}>
              Seafood
            </Heading>
          </a>
        </Link>

        <Box border="1px solid lightgrey" borderRadius={4} p={8} width="526px">
          <Heading as="h2" mb={4}>
            Masuk
          </Heading>

          <Box mb={6}>
            <Box mb={4}>
              <Text as="p">Email</Text>
              <Input
                type="email"
                variant="filled"
                placeholder="e.g. putra@gmail.com"
                onChange={handleCredentials('identifier')}
                disabled={isLoading ? true : false}
              />
            </Box>

            <Box>
              <Text as="p">Password</Text>
              <InputGroup>
                <Input
                  type={show ? 'Text' : 'password'}
                  variant="filled"
                  placeholder="at least 6 characters"
                  onChange={handleCredentials('password')}
                  disabled={isLoading ? true : false}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>
          </Box>

          {errorLogin && (
            <Text as="p" textAlign="center" color="red">
              Email atau password salah!
            </Text>
          )}

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text display="flex" alignItems="center">
              Tidak punya akun?
              <Link href="/signup">
                <a>
                  <Text ml="1" textDecoration="underline" as="p">
                    Daftar.
                  </Text>
                </a>
              </Link>
            </Text>

            <Button colorScheme="blue" onClick={login} isLoading={isLoading} loadingText="Mohon tunggu...">
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
