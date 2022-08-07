import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// chakra ui
import { Container, Box, Heading, Text, Input, Button, InputRightElement, InputGroup } from '@chakra-ui/react';

// component

const SignUp = () => {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  return (
    <Container maxW="container.lg">
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
            Daftar
          </Heading>

          <Box mb={6}>
            <Box mb={4}>
              <Text as="p">Username</Text>
              <Input type="text" variant="filled" placeholder="Putra" />
            </Box>

            <Box mb={4}>
              <Text as="p">Email</Text>
              <Input type="email" variant="filled" placeholder="e.g. putra@gmail.com " />
            </Box>

            <Box>
              <Text as="p">Password</Text>
              <InputGroup>
                <Input type={show ? 'Text' : 'password'} variant="filled" placeholder="at least 6 characters" />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>
          </Box>

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
            <Button colorScheme="blue">Daftar</Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
