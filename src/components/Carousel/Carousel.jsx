import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Carousel = ({
    slides,
    autoplayDelay = 5000,
    navigationEnabled = true,
    paginationEnabled = true,
    swiperStyle = {},
    slideStyle = {},
}) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={navigationEnabled}
            pagination={paginationEnabled ? { clickable: true } : false}
            autoplay={
                autoplayDelay
                    ? {
                          delay: autoplayDelay,
                          disableOnInteraction: false,
                      }
                    : false
            }
            spaceBetween={50}
            slidesPerView={1}
            style={{
                width: "90%",
                height: "47%",
                ...swiperStyle,
            }}
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index} style={slideStyle}>
                    <img
                        src={slide.url}
                        alt={slide.alt || "Slide image"}
                        style={{ width: "100%", height: "100%"}}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Carousel;
