import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Wrapper, Title, Intro, Paper } from "./style";

const RollingPaper = () => {
  return (
    <>
      <Wrapper>
        <Title>프로젝트를 마치며</Title>
        <Intro>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          <br />
          Tenetur molestias eveniet aliquam a atque incidunt iste explicabo vel, expedita fugiat?
        </Intro>
        <Swiper
          pagination={{ clickable: true }}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          slidesPerView={2}
          spaceBetween={16}
          loop={true}
          grabCursor={true}
          modules={[Autoplay, Pagination]}
        >
          <SwiperSlide>
            <Paper>
              <h3>송인선</h3>
            </Paper>
          </SwiperSlide>
          <SwiperSlide>
            <Paper>
              <h3>김정민</h3>
            </Paper>
          </SwiperSlide>
          <SwiperSlide>
            <Paper>
              <h3>김윤희</h3>
            </Paper>
          </SwiperSlide>
          <SwiperSlide>
            <Paper>
              <h3>남상욱</h3>
            </Paper>
          </SwiperSlide>
          <SwiperSlide>
            <Paper>
              <h3>조지선</h3>
            </Paper>
          </SwiperSlide>
          <SwiperSlide>
            <Paper>
              <h3>이수련</h3>
            </Paper>
          </SwiperSlide>
        </Swiper>
      </Wrapper>
    </>
  );
};

export default RollingPaper;
