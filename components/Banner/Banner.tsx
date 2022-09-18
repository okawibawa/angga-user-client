import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Autoplay } from 'swiper';

// Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';

// chakra ui
import { Box } from '@chakra-ui/react';

const Banner = () => {
  return (
    <Box mt={8} width="100%">
      <Swiper
        scrollbar={{
          hide: true,
        }}
      autoplay={{ delay: 5000 }}
        modules={[Scrollbar, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Box width="100%" backgroundColor="lightyellow" maxWidth="1248px">
            <img style={{ width: 'auto', height: 'auto' }} src="/banner-1.png" alt="banner one" />
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box width="100%" backgroundColor="lightblue">
            <img src="/banner-2.png" alt="banner 2" style={{ width: 'auto', height: 'auto' }} />
          </Box>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default Banner;
