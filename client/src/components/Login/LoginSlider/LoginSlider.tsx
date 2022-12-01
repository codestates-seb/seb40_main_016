import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ReactComponent as UploadDesc } from "../../../assets/img/upload-desc.svg";
import { ReactComponent as ExchangeDesc } from "../../../assets/img/exchange-desc.svg";
import { ReactComponent as GiveSnackDesc } from "../../../assets/img/give-snack-desc.svg";

import { Wrapper } from "./style";

const LoginSlider = () => {
  return (
    <Wrapper>
      <Swiper
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        grabCursor={true}
        modules={[Autoplay, Pagination]}
      >
        <SwiperSlide>
          <UploadDesc />
          <img src="./assets/cat-selfie-clipart.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <ExchangeDesc />
          <img src="./assets/dog-with-snack-clipart.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <GiveSnackDesc />
          <img src="./assets/user-clipart.png" alt="" />
        </SwiperSlide>
      </Swiper>
    </Wrapper>
  );
};

export default LoginSlider;
