import React from 'react';
import Link from 'next/link';

// chakra
import { Stack, Box, Container, Text, Heading } from '@chakra-ui/react';

// iconoir
import { Phone, Mail, Map } from 'iconoir-react';

const Footer = () => {
  return (
    <Box mt="auto" backgroundColor="lightblue" py={16}>
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
  );
};

export default Footer;
