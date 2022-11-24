import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import { Wrapper, NavigationBtn, SingleViewer } from "./style";

import { ReactComponent as ArrowIcon } from "../../../assets/img/arrow-circle-icon.svg";

interface Prop {
  photos: string[];
}

const DetailSlider = ({ photos }: Prop) => {
  const [isSingle, setIsSingle] = useState<boolean>();
  const [swiperSetting, setSwiperSetting] = useState<any>(null);

  const navigationPrevRef = useRef<HTMLDivElement>(null);
  const navigationNextRef = useRef<HTMLDivElement>(null);

  const settings = {
    modules: [Navigation, Pagination],
    navigation: {
      prevEl: navigationPrevRef.current,
      nextEl: navigationNextRef.current,
    },
    onBeforeInit: (swiper: any) => {
      swiper.params.navigation.prevEl = navigationPrevRef.current;
      swiper.params.navigation.nextEl = navigationNextRef.current;
      swiper.navigation.update();
    },
    pagination: { clickable: true },
    loop: true,
    grabCursor: true,
  };

  useEffect(() => {
    if (!isSingle && !swiperSetting) {
      setSwiperSetting(settings);
    }
  }, [swiperSetting]);

  useEffect(() => {
    if (photos.length === 1) setIsSingle(true);
    else if (photos.length > 1) setIsSingle(false);
  }, [photos]);

  return (
    <>
      <Wrapper>
        {isSingle ? (
          <SingleViewer>
            <img src={photos[0]} alt="" />
          </SingleViewer>
        ) : (
          <>
            <Swiper {...settings}>
              {photos.map((url, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <img src={url} alt="" />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <NavigationBtn direction="prev" ref={navigationPrevRef}>
              <ArrowIcon />
            </NavigationBtn>
            <NavigationBtn direction="next" ref={navigationNextRef}>
              <ArrowIcon />
            </NavigationBtn>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default DetailSlider;
