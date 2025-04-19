const dynamicBannerSliderSettings = {
    speed: 500,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 4,
    responsive: [
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2, // Optional: adjust as needed
            },
        },
    ],
};

export default dynamicBannerSliderSettings;
