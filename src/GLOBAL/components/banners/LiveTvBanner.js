import { useState, useEffect } from 'react'
import { fetchBannerContent } from '../../redux/fetchMoviesApi'
import Button from '../../components/buttons/Button'
import '../../components/styles/banners/dynamicBanner.scss'
import dynamicBannerSliderSettings from "../../../utils/sliderConfig/dynamicBannerSliderSettings"
import Slider from "react-slick"
import SliderItem from "./SliderItem"

const LiveTVBanner = () => {
    const [bannerContent, setBannerContent] = useState({})

    useEffect(() => {
        const initFetchBannerContent = async () => {
            const bannerContent = await fetchBannerContent()
            console.warn(bannerContent)
            setBannerContent(bannerContent)
        }

        initFetchBannerContent()
    }, [])
    console.log(bannerContent)
    return (
        <section>
            <div className="hero">
                <div className="hero-container">
                    <div className="hero-content-wrapper">
                        <div className="hero-content">
                            <p className="primary-text">{bannerContent.type}</p>
                            <h1>{bannerContent.title}</h1>
                            <p className="hero-content-description">{bannerContent.description}</p>
                            <br />
                            <Button page={`/watch/live/${bannerContent.uid}`} selectedMovie={bannerContent.content_id} label='WATCH LIVE' />
                        </div>
                    </div>

                    <div className='hero-slider-container'>
                        <Slider {...dynamicBannerSliderSettings} className='hero-slider-main'>
                            {/* {afriPlaylive.map((movie) => {
                                return <SliderItem
                                    onClicked={() => null}
                                    title={movie.title}
                                    image_id={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movie.image_id}?accessKey=WkVjNWNscFhORDBLCg==`}
                                    isSelected={false}
                                    key={movie.id} />
                            })} */}
                        </Slider>
                    </div>
                </div>
                {
                    bannerContent.preview_image_id ?
                        <div className='hero-player-container'>
                            <img src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${bannerContent.preview_image_id}?accessKey=WkVjNWNscFhORDBLCg==`} alt={bannerContent.title} className='dynamic-landing-banner' />
                        </div>
                        : <></>
                }
                <div className="hero-gradient livetv-gradient" />
            </div>
        </section>
    )
}

export default LiveTVBanner






// import { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchBannerContent, fetchTrailer, returnMovieDetails } from '../../redux/fetchMoviesApi'
// import { useNavigate } from "react-router-dom";
// import Slider from 'react-slick'
// import SliderItem from './SliderItem'
// import sliderSettings from '../../../lib/sliderConfig/sliderSettings'
// import Button from "../buttons/Button";
// import ReactPlayer from "react-player";
// import '../../components/styles/banners/dynamicBanner.scss'

// const LiveTVBanner = () => {
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const [bannerContent, setBannerContent] = useState({})
//     const [bannerContentInfo, setBannerContentInfo] = useState({})
//     const [playTrailer, setPlayTrailer] = useState(true)
//     const [isPlayingTrailer, setIsPlayingTrailer] = useState(true)
//     const [trailer, setTrailer] = useState('')
//     const { afriPremiere, ageRatings, genres } = useSelector((state) => state.fetchMovies)

//     useEffect(() => {
//         const initFetchBannerTrailer = async () => {
//             setTrailer(await fetchTrailer(bannerContent.content_id))
//         }
//         initFetchBannerTrailer()
//     }, [bannerContent, dispatch])

//     useEffect(() => {
//         const initFetchBannerContent = async () => {
//             const bannerContent = await fetchBannerContent()
//             setBannerContent(bannerContent)
//         }
//         initFetchBannerContent()
//     }, [])

//     useEffect(() => {
//         const initReturnMovieDetails = async () => {
//             const _ = await returnMovieDetails(bannerContent.content_id)
//             console.warn('banner content info', _)
//             setBannerContentInfo(_)
//         }

//         initReturnMovieDetails()
//     }, [ageRatings, bannerContent.content_id])

//     return (
//         <section>
//             <div className="hero">
//                 <div className="hero-container">
//                     <div className="hero-content-wrapper">
//                         {
//                             bannerContentInfo ?
//                                 <div className="hero-content">
//                                     <p className="primary-text">{bannerContentInfo.type}</p>
//                                     <h1>{bannerContentInfo.title}</h1>
//                                     <p>{bannerContentInfo.description}</p>
//                                     <br />
//                                     <Button page={`/watch/live/${bannerContentInfo.content_id}`} label='WATCH LIVE' />
//                                 </div>
//                                 : <></>
//                         }
//                     </div>
//                 </div>

//                 <BackgroundImageVideo isPlaying={playTrailer} _trailer={trailer} _onPlayTrailer={isPlayingTrailer} _bannerContent={bannerContent} />

//                 <div className="hero-gradient livetv-gradient" />
//             </div>
//         </section>
//     )
// }

// const BackgroundImageVideo = ({ _bannerContent, _trailer, isPlaying, _onPlayTrailer }) => {
//     const [onPlayTrailer, setOnPlayTrailer] = useState(_onPlayTrailer)

//     if (onPlayTrailer) return <div className='hero-player-container'>
//         <ReactPlayer
//             height='100%'
//             width='100%'
//             className='react-player'
//             url={_trailer}
//             playing={isPlaying}
//             muted={true}
//             autoPlay={true}
//             onEnded={() => {
//                 setOnPlayTrailer(false)
//             }}
//             controls={true} />
//     </div>


//     else if (_bannerContent.preview_image_id) return <div className='hero-player-container'>
//         <img src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${_bannerContent.preview_image_id}?accessKey=WkVjNWNscFhORDBLCg==`} alt={_bannerContent.title} className='dynamic-landing-banner' />
//     </div>
// }

// export default LiveTVBanner