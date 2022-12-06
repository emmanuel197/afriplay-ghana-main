import { useEffect, useState } from "react"
import ReactPlayer from "react-player"

const BannerBackground = ({ bannerImg, _trailer, _onPlayTrailer, _bannerContent }) => {
    const [onPlayTrailer, setOnPlayTrailer] = useState(_onPlayTrailer)
    const [isPlaying, setIsPlaying] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY < 350) setIsPlaying(true)
            else setIsPlaying(false)
        }

        window.addEventListener("scroll", handleScroll)
        return () => { window.removeEventListener("scroll", handleScroll) }
    }, [])

    if (onPlayTrailer)
        // ! uncomment
        return <div className='hero-player-container'>
            <ReactPlayer
                height='100%'
                width='100%'
                className='react-player'
                url={_trailer}
                playing={isPlaying}
                muted={true}
                autoPlay={true}
                controls={false}
                onEnded={() => {
                    setOnPlayTrailer(false)
                }}
            />
            {/* <div className="hero-gradient" /> */}
        </div>
    // return <></>

    else if (bannerImg) return <div className='hero-player-container'>
        <img src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${bannerImg}?accessKey=WkVjNWNscFhORDBLCg==`} alt={_bannerContent.title} className='dynamic-landing-banner' />
    </div>
}

export default BannerBackground