import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper";
import {Box} from "@mui/material";

const HorizontalItems = () => {
    return (
        <Box className="horizontal-items">
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                navigation={true}
                modules={[Navigation]}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                className="mySwiper"
            >
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper>
        </Box>
    );
}
export default React.memo(HorizontalItems);
