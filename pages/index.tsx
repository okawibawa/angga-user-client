import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';

// Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

// chakra ui
import { Box, Heading, Text } from '@chakra-ui/react';

// components
import Layout from '../components/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <Box mt={8}>
        <Swiper
          scrollbar={{
            hide: true,
          }}
          modules={[Scrollbar]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Box height={48} width="100%" backgroundColor="lightyellow">
              Banner 1
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box height={48} width="100%" backgroundColor="lightblue">
              Banner 2
            </Box>
          </SwiperSlide>
        </Swiper>
      </Box>
    </Layout>
  );
};

export default Home;
