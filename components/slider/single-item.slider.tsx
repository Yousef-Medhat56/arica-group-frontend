import React, { Component, ReactNode } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";
import {
    SliderNextArrowBtn,
    SliderPrevArrowBtn,
} from "../buttons/slider.button";

export default function SingleItemSlider({
    children,
    autoplaySpeed,
    hasArrows,
    hasDots,
}: {
    children: ReactNode;
    autoplaySpeed: number;

    hasArrows?: boolean;
    hasDots?: boolean;
}) {
    const router = useRouter();
    const settings = {
        infinite: true,
        speed: 500,
        arrows: hasArrows,
        dots: hasDots,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed,
        cssEase: "linear",
        rtl: router.locale === "en" ? false : true,
        responsive: [
            {
                breakpoint: 961,
                settings: {
                    arrows: false,
                },
            },
        ],
    };
    return (
        <Slider
            {...settings}
            // @ts-ignore
            prevArrow={<SliderPrevArrowBtn />}
            // @ts-ignore
            nextArrow={<SliderNextArrowBtn />}
        >
            {children}
        </Slider>
    );
}
