import React from 'react';

// chakra ui
import { Container } from '@chakra-ui/react';

// components
import Footer from './Footer';
import Header from './Header';

type ContainerProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: ContainerProps) => {
  return (
    <>
      <Header />
      <Container maxW="container.lg">{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
