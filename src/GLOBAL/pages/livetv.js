
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchChannelCategories } from "../redux/channels"
import Footer from "../components/Footer"
import Header from "../components/Header"
import LiveTvReelSlider from "../components/home/sliders/LiveTvReelSlider"
import LiveTVBanner from "../components/banners/LiveTvBanner"

const LiveTV = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        fetchChannelCategories(dispatch)
    }, [dispatch])
    return (
        <>
            <Header links={5} />
            {/* <LiveTVBanner className="feature-dynamic-banner"/> */}
            <br />
            <br />
            <LiveTvReelSlider />
            <Footer />
        </>
    )
}

export default LiveTV