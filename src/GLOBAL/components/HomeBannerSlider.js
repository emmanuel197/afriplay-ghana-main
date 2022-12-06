import Slider from "react-slick"
import sliderSettings from "../../utils/sliderConfig/sliderSettings"
import SliderWrapper from "./SliderWrapper"
import { useEffect, useState } from "react"
import { fetchBannerContent } from "../redux/fetchMoviesApi"
import { Link } from "react-router-dom"
import "../components/styles/afriPremiereSliderBanner.scss"

const HomeBannerSlider = ({ title }) => {
    const [banners, setBanners] = useState([])

    useEffect(() => {
        const initFetchBannerContent = async () => {
            const { afriPremiereBanners, afriplayLiveBanners } = await fetchBannerContent()
            if (title === 'AFRIPREMIERE') setBanners(afriPremiereBanners)
            if (title === 'AFRIPLAY LIVE') setBanners(afriplayLiveBanners)
        }

        initFetchBannerContent()
    }, [title])

    if (banners.length < 1) return <></>

    return (
        <>
            <SliderWrapper title={title}>
                <Slider {...sliderSettings(1, 1, false, 1)}>
                    {banners.map((banner) => {
                        return <Link key={banner.id} to={(banner.vod_type).toLowerCase() === 'series' ? `/series/${banner.content_id}` : `/movie/${banner.content_id}`} >
                            <div className="lg-banner-slider">
                                <img src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${banner.preview_image_id}?accessKey=WkVjNWNscFhORDBLCg==`} alt={banner.title} />
                            </div>
                        </Link>
                    })}
                </Slider>
            </SliderWrapper>
        </>
    )
}

export default HomeBannerSlider