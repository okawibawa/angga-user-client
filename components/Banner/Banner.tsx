import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';

// Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

// chakra ui
import { Box } from '@chakra-ui/react';

const Banner = () => {
  return (
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
            <img src="/banner-1.png" alt="banner one" style={{ width: '100%' }} />
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box height={48} width="100%" backgroundColor="lightblue">
            <img src="/banner-2.png" alt="banner 2" style={{ width: '100%' }} />
          </Box>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default Banner;
