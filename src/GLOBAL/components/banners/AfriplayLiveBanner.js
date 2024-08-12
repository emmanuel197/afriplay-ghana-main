import { useState, useEffect } from 'react'
import { fetchBannerContent } from '../../redux/fetchMoviesApi'
import { useSelector } from "react-redux"
import Slider from "react-slick"
import dynamicBannerSliderSettings from '../../../utils/sliderConfig/dynamicBannerSliderSettings'
import '../../components/styles/banners/dynamicBanner.scss'

const AfriplayLiveBanner = ({className}) => {
    const [bannerContent, setBannerContent] = useState({})
    const { afriPlaylive } = useSelector((state) => state.fetchMovies);

    useEffect(() => {
        const initFetchBannerContent = async () => {
            const bannerContent = await fetchBannerContent()
            setBannerContent(bannerContent)
        }

        initFetchBannerContent()
    }, [])

    return (
        <section>
            <div className={`hero ${className}`}>
                <div className="hero-container">
                    <div className="hero-content-wrapper">
                        <div className="hero-content">
                            <div className="live-date-wrapper">
                                <div className="live-label">LIVE</div>
                                <p>OCTOBER 31</p>
                            </div>
                            <br />
                            <h1>{bannerContent.title}</h1>
                            <p className="hero-content-description">{bannerContent.description}</p>
                            <div className="pay-per-view-btn">Live on Pay-Per-View</div>
                        </div>
                    </div>

                    <div className='hero-slider-container'>
                        <p className="slider-title">Live on Pay-Per-View</p>
                        <Slider {...dynamicBannerSliderSettings} className='hero-slider-main'>
                            {afriPlaylive.map((_movie) => {
                                // TODO: uncomment when channels are ready for reel
                                // return <MovieCard
                                //     type='livetv'
                                //     movie={_movie}
                                // />
                            })}
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
                <div className="hero-gradient afriplaylive-hero-gradient" />
            </div>
        </section>
    )
}

export default AfriplayLiveBanner


// import { useState, useEffect, useMemo } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchTrailer, returnMovieDetails } from '../../redux/fetchMoviesApi'
// import ReactPlayer from 'react-player'
// import Slider from 'react-slick'
// import dynamicBannerSliderSettings from '../../../lib/sliderConfig/dynamicBannerSliderSettings'
// import SliderItem from './SliderItem'
// import getRandomIndexes from '../../../lib/getRandomIndexes'
// import '../../components/styles/banners/dynamicBanner.scss'

// const fetchDataForBannerSlider = (_recentlyadded_) => {
//     if (_recentlyadded_.length < 1) return []
//     const slides = []
//     let indexes = getRandomIndexes(_recentlyadded_)
//     for (let i = 0; i < indexes.length; i++) {
//         const element = indexes[i];
//         const _ = _recentlyadded_[element]
//         if (_) slides.push(_)
//     }
//     return slides
// }

// const AfriplayLiveBanner = () => {
//     const [playTrailer, setPlayTrailer] = useState(false)
//     const [isPlayingTrailer, setIsPlayingTrailer] = useState(false)
//     const [selectedMovie, setSelectedMovie] = useState({})
//     const [movieDetails, setMovieDetails] = useState({})
//     const { recentlyadded, dynamicBannerTrailer } = useSelector((state) => state.fetchMovies);
//     const slides = useMemo(() => fetchDataForBannerSlider(recentlyadded), [recentlyadded])

//     // console.warn('selectedMovie', selectedMovie)

//     const _setSelectedMovie = (_movie) => {
//         setSelectedMovie(_movie)
//         setPlayTrailer(false)
//         setIsPlayingTrailer(false)
//     }

//     useEffect(() => {
//         const _returnMovieDetails = async () => {
//             setMovieDetails(await returnMovieDetails(selectedMovie.id))
//         }
//         _returnMovieDetails()
//     }, [selectedMovie.id])

//     useEffect(() => {
//         if (slides[0]) setSelectedMovie(slides[0])
//     }, [slides])

//     // if (loading) return <Loader />

//     return (
//         <section>
//             <div className="hero">
//                 <div className="hero-container">
//                     <div className="hero-content-wrapper">
                        // <div className="hero-content">
                        //     <div className="live-date-wrapper">
                        //         <div className="live-label">LIVE</div>
                        //         <p>OCTOBER 31</p>
                        //     </div>
                        //     <br />
                        //     <h1>ASA</h1>
                        //     <h3>LIVE IN CONCERT</h3>
                        //     <div className="pay-per-view-btn">Live on Pay-Per-View</div>
                        //     {/* <p className="slider-title">Live on Pay-Per-View</p> */}
                        //     {/* <h1>{selectedMovie.title}</h1>
                        //     <p>{movieDetails.description}</p>
                        //     <div className="cast">
                        //         <b>CAST: </b>{movieDetails.cast}
                        //     </div> */}
                        // </div>
//                     </div>

                    // <div className='hero-slider-container'>
                    //     <p className="slider-title">Live on Pay-Per-View</p>
                    //     <Slider {...dynamicBannerSliderSettings} className='hero-slider-main'>
                    //         {slides.map((movie) => {
                    //             return <SliderItem
                    //                 onClicked={() => _setSelectedMovie(movie)}
                    //                 title={movie.title}
                    //                 image_id={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movie.image_id}?accessKey=WkVjNWNscFhORDBLCg==`}
                    //                 isSelected={selectedMovie.id === movie.id}
                    //                 key={movie.id} />
                    //         })}
                    //     </Slider>
                    // </div>
//                 </div>
//                 <BackgroundImageVideo trailerSrc={dynamicBannerTrailer} onPlayTrailer={playTrailer} _selectedMovie={selectedMovie} />
//                 <div className="hero-gradient afriplaylive-hero-gradient" />
//             </div>
//         </section>


//         // <>
//         //     <section className='dynamic-landing'>
//         //         <div className='dynamic-landing-content'>
//         //             <div className='dynamic-landing-content-wrapper'>
//         //                 <div className='text-content-wrapper'>
//         //                     <div>
//         //                         <div className='text-content'>
//         // <div className="live-date-wrapper">
//         //     <div className="live-label">LIVE</div>
//         //     <p>OCTOBER 31</p>
//         // </div>
//         // <h1 className="title">{selectedMovie.title}</h1>
//         // <p>ASA LIVE IN CONCERT</p>
//         // <div className="button">Live on Pay-Per-View</div>
//         // <br />
//         // <p className="slider-title">Live on Pay-Per-View</p>
//         //                         </div>
//         //                     </div>
//         //                 </div>
//         //                 <BackgroundImageVideo trailerSrc={dynamicBannerTrailer} onPlayTrailer={playTrailer} _selectedMovie={selectedMovie} />
//         //             </div>
//         //         </div>
//         //     </section>

//         //     <div>
//         //         <div className='banner-slider-container'>
//         //             <Slider {...dynamicBannerSliderSettings} className='banner-slider'>
//         // {slides.map((movie) => {
//         //         return <SliderItem
//         //             onClicked={() => _setSelectedMovie(movie)}
//         //             title={movie.title}
//         //             image_id={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movie.image_id}?accessKey=WkVjNWNscFhORDBLCg==`}
//         //             isSelected={selectedMovie.id === movie.id}
//         //             key={movie.id} />
//         //     })}
//         //             </Slider>
//         //         </div>
//         //     </div>
//         // </>
//     )
// }

// const BackgroundImageVideo = ({ _selectedMovie, trailerSrc, onPlayTrailer }) => {
//     if (onPlayTrailer) return <div className='hero-player-container'>
//         <ReactPlayer
//             height='100%'
//             width='100%'
//             className='react-player'
//             url={trailerSrc}
//             muted={true}
//             autoPlay={true}
//             playing={true}
//             controls={false} />
//     </div>

//     else return <div className='hero-player-container'>
//         <img src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${_selectedMovie.image_id}?accessKey=WkVjNWNscFhORDBLCg==`} alt={_selectedMovie.title} className='dynamic-landing-banner' />
//     </div>
// }

// export default AfriplayLiveBanner