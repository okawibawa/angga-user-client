import React from 'react';

// chakra ui
import { Box, Container } from '@chakra-ui/react';

// components
import Header from './Header';

type ContainerProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: ContainerProps) => {
  return (
    <>
      <Header />
      <Container maxW="container.lg">{children}</Container>
    </>
  );
};

export default Layout;
