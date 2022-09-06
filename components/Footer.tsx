import React from 'react';
import Link from 'next/link';

// chakra
import { Stack, Box, Container, Text, Heading } from '@chakra-ui/react';

// iconoir
import { Phone, Mail, Map } from 'iconoir-react';

const Footer = () => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#0099ff"
          fillOpacity="1"
          d="M0,128L34.3,149.3C68.6,171,137,213,206,197.3C274.3,181,343,107,411,112C480,117,549,203,617,234.7C685.7,267,754,245,823,234.7C891.4,224,960,224,1029,229.3C1097.1,235,1166,245,1234,245.3C1302.9,245,1371,235,1406,229.3L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
        ></path>
      </svg>
      <Box mt="auto" backgroundColor="#0099ff" py={16} color="white">
        <Container maxW="container.xl">
          <Stack direction={['column', 'row']} display="flex" justifyContent="space-between">
            <Box>
              <Heading as="h4" size={['md', 'lg']} mb={2}>
                Seafood Putra
              </Heading>
              <Text as="p">{new Date().getFullYear()} - © Seafood Putra</Text>
            </Box>

            <Stack spacing={4} width="38%">
              <Stack direction="row">
                <Phone width={18} />
                <Link target="_blank" href="https://wa.me/089522786753">
                  <a>
                    <Text as="p" fontSize="sm" textDecoration="underline">
                      +6289-522-786-753
                    </Text>
                  </a>
                </Link>
              </Stack>
              <Stack direction="row">
                <Phone width={18} />
                <Link target="_blank" href="https://wa.me/081337394344">
                  <a>
                    <Text as="p" fontSize="sm" textDecoration="underline">
                      +6281-337-394-344
                    </Text>
                  </a>
                </Link>
              </Stack>
              <Stack direction="row">
                <Mail width={18} />
                <Link href="mailto:udputra28@gmail.com">
                  <a>
                    <Text as="p" fontSize="sm" textDecoration="underline">
                      udputra28@gmail.com
                    </Text>
                  </a>
                </Link>
              </Stack>
              <Stack direction="row">
                <Map width={18} />
                <Text as="p" fontSize="sm" textDecoration="underline">
                  Jl. Dharmawangsa Gang Parkit No.3, Kampial Lingkungan Menesa
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
