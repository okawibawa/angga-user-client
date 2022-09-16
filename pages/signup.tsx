import { useState, useEffect, useRef, useContext } from 'react';
import { HostContext } from '../context/HostContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import * as EmailValidator from 'email-validator';
import { setCookie } from 'nookies';

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
import { authSignUp, getProfile } from '../apis/api';
import { Router } from 'next/router';

// component

const SignUp = () => {
  const router = useRouter();
  const host = useContext(HostContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [credentials, setCredentials] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [errorSignUp, setErrorSignUp] = useState<string>('');

  const handleClick = () => setShow(!show);

  const handleCredentials = (name: string) => (e: any) => {
    setCredentials({ ...credentials, [name]: e.target.value });
  };

  const handleSignUp = async () => {
    if (!EmailValidator.validate(credentials?.email)) {
      setErrorMsg('Tolong masukkan email dengan benar!');
      onOpen();
      return;
    }

    if (!credentials?.username || !credentials?.email || !credentials.password) {
      setErrorMsg('Tolong isi email dan password dengan benar!');
      onOpen();
      return;
    }

    setIsLoading(true);

    const result: any = await authSignUp(host?.url, credentials);

    if (result.status === 200) {
      setCookie(null, 'sfJwt', result.data.jwt, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });

      setCookie(null, 'sfUser', JSON.stringify(result.data.user), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });

      setCookie(null, 'sfUsername', result.data.user.username),
        {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        };

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const res: any = await getProfile(host?.url, result.data.jwt, result.data.user.username);

      setCookie(null, 'sfUserId', res.data.data[0].id),
        {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        };

      setIsLoading(false);
      router.push('/');
    } else {
      setErrorSignUp(result.response.data.error.message);
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
              UD. Putra
            </Heading>
          </a>
        </Link>

        <Box border="1px solid lightgrey" borderRadius={4} p={8} width="526px">
          <Heading as="h2" mb={4}>
            Daftar
          </Heading>

          <Box mb={6}>
            <Box mb={4}>
              <Text as="p">Username</Text>
              <Input
                type="text"
                variant="filled"
                placeholder="Putra"
                onChange={handleCredentials('username')}
                disabled={isLoading ? true : false}
              />
            </Box>

            <Box mb={4}>
              <Text as="p">Email</Text>
              <Input
                type="email"
                variant="filled"
                placeholder="e.g. putra@gmail.com"
                onChange={handleCredentials('email')}
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

          {errorSignUp && (
            <Text as="p" textAlign="center" color="red">
              Email atau username sudah terdaftar!
            </Text>
          )}

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text display="flex" alignItems="center">
              Sudah punya akun?
              <Link href="/login">
                <a>
                  <Text ml="1" textDecoration="underline" as="p">
                    Masuk.
                  </Text>
                </a>
              </Link>
            </Text>

            <Button colorScheme="blue" onClick={handleSignUp} isLoading={isLoading} loadingText="Mohon tunggu...">
              Daftar
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
