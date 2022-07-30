import React from 'react';

// chakra
import { Box, Container, Text, Heading } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box mt="auto" backgroundColor="#eeeeeebb" py={16}>
      <Container maxW="container.lg">
        <Heading as="h4" fontSize={['md', 'lg']} mb={2}>
          Seafood Putra
        </Heading>
        <Text as="p">{new Date().getFullYear()} - © Seafood Putra</Text>
      </Container>
    </Box>
  );
};

export default Footer;
