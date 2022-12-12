import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllSeries, fetchTrailer, returnMovieOrSeriesDetails } from '../../redux/fetchMoviesApi'
import { Link, useLocation } from "react-router-dom"
import ReactPlayer from 'react-player'
import Slider from 'react-slick'
import Button from '../buttons/Button'
import OutlineButton from '../buttons/OutlineButton'
import dynamicBannerSliderSettings from '../../../utils/sliderConfig/dynamicBannerSliderSettings'
import SliderItem from './SliderItem'
import getRandomIndexes from '../../../utils/getRandomIndexes'
import getGenreName from "../../../utils/getGenreName"
import isInViewport from "../../../utils/isInViewport"
import '../../components/styles/banners/dynamicBanner.scss'
import BannerBackground from "./BannerBackground"

/* **
 * display a recently added series in banner.picks a series from the recently added category
 */

const fetchDataForBannerSlider = (recentlyAdded) => {
    if (recentlyAdded.length < 1) return []

    const slides = []
    const seriesSlides = []
    const indexes = getRandomIndexes(recentlyAdded)

    for (let i = 0; i < indexes.length; i++) {
        const element = indexes[i];
        const _ = recentlyAdded[element]

        if (_ && !slides.includes(_))
            if (_.type === 'series')
                seriesSlides.push(_)
            else slides.push(_)
    }

    console.warn('seriesSlides', seriesSlides)

    if (window.location.pathname === '/series') return seriesSlides

    return slides
}

const DynamicBanner = ({ showSlides = true }) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const [playTrailer, setPlayTrailer] = useState(true)
    const [isPlayingTrailer, setIsPlayingTrailer] = useState(true)
    const [selectedMovie, setSelectedMovie] = useState({})
    const [movieDetails, setMovieDetails] = useState({})
    const [genreName, setGenreName] = useState('')
    const [trailer, setTrailer] = useState('')
    const { recentlyadded, genres } = useSelector((state) => state.fetchMovies);
    const slides = useMemo(() => fetchDataForBannerSlider(recentlyadded), [recentlyadded])
    const [allSlides, setAllSlides] = useState([])
    const [isMuted, setIsMuted] = useState(true)

    useEffect(() => {
        const initGetAllSlides = async () => {
            if (location.pathname === "/series") {
                let _allSeries = await fetchAllSeries()
                let _allSlides = []
                let randomSeriesIndexes = getRandomIndexes(_allSeries)

                for (let i = 0; i < randomSeriesIndexes.length; i++) {
                    const element = randomSeriesIndexes[i];
                    let seriesInfo = _allSeries[element]
                    if (seriesInfo) _allSlides.push(seriesInfo)
                }

                setAllSlides(_allSlides)
                setSelectedMovie(_allSlides[0])

            } else {
                if (slides[0]) {
                    setAllSlides(slides)
                    setSelectedMovie(slides[0])
                }
            }
        }

        initGetAllSlides()
    }, [location.pathname, slides])

    // useEffect(() => {
    //     if (slides[0]) setSelectedMovie(slides[0])
    // }, [slides])

    const _setSelectedMovie = (vod) => {
        setSelectedMovie(vod)
        // _playTrailer()
        setPlayTrailer(true)
        setIsPlayingTrailer(true)
    }

    // const _playTrailer = async () => {
    //     setPlayTrailer(true)
    //     setIsPlayingTrailer(true)
    //     // setTrailer(await fetchTrailer(selectedMovie.id))
    // }

    //! don't delete
    // useEffect(() => {
    //     let _

    //     if (location.pathname === '/series') {
    //         _ = getGenreName(movieDetails.genres, genres)
    //     } else _ = getGenreName(movieDetails.movie_genres, genres)

    //     setGenreName(_)
    // }, [genres, location.pathname, movieDetails, selectedMovie.genres, selectedMovie.movie_genres])

    useEffect(() => {
        const initSetMovieDetails = async () => {
            const _movie = await returnMovieOrSeriesDetails(selectedMovie.id, location.pathname === '/series' ? 'series' : 'movie')
            setMovieDetails(_movie)
            // console.warn("&&&&&&&&&&", selectedMovie.id, await fetchTrailer(selectedMovie.id))
            setTrailer(await fetchTrailer(selectedMovie.id))
        }
        initSetMovieDetails()
    }, [location.pathname, selectedMovie.id])

    useEffect(() => {
        const handleScroll = (event) => {
            if (window.scrollY < 350) setPlayTrailer(true)
            else setPlayTrailer(false)
        }

        window.addEventListener("scroll", handleScroll)
        return () => { window.removeEventListener("scroll", handleScroll) }
    }, [])

    return (
        <section>
            <div className="hero">
                <div className="hero-container">
                    <div className="hero-content-wrapper">
                        <div className="hero-content">
                            <h1>{movieDetails.title}</h1>
                            <p className="lines-max-4">{movieDetails.description}</p>
                            {/* <div className="cast">
                                {window.location.pathname !== '/series' ?
                                    <div>
                                        <b>CAST: </b>{movieDetails.cast}
                                    </div>
                                    : <></>}
                            </div> */}
                            {/* <div className="genre-subtitles"> */}
                            {/* <b>Genre: </b>{genreName} */}
                            {/* <div style={{ margin: '10px' }} />
                                <b>Subtitles: </b> English[CC] */}
                            {/* </div > */}


                            {
                                selectedMovie.id
                                    ? <div className='hero-buttons'>
                                        <Button page={window.location.pathname === '/series' ? `/series/${selectedMovie.id}` : `/watch/movie/${selectedMovie.uid}`} label='PLAY' />
                                        <OutlineButton page={window.location.pathname === '/series' ? `/series/${selectedMovie.id}` : `/movie/${selectedMovie.id}`} label="Info" />
                                        <div className="mute-icon">
                                            {
                                                isMuted
                                                    ? <img onClick={() => { setIsMuted(!isMuted) }} src="/assets/svg/speaker.svg" alt="speacker icon" />
                                                    : <img onClick={() => { setIsMuted(!isMuted) }} src="/assets/svg/muted.svg" alt="mute icon" />
                                            }
                                        </div>
                                    </div>
                                    : <></>
                            }
                        </div >
                    </div >

                    {showSlides ? <div className='hero-slider-container'>
                        <Slider Slider {...dynamicBannerSliderSettings} className='hero-slider-main' >
                            {
                                allSlides.map((movie) => {
                                    return <SliderItem
                                        onClicked={() => _setSelectedMovie(movie)}
                                        title={movie.title}
                                        image_id={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${location.pathname === "/series" ? movie.images.POSTER : movie.image_id}?accessKey=WkVjNWNscFhORDBLCg==`}
                                        isSelected={selectedMovie.id === movie.id}
                                        key={movie.id} />
                                })
                            }
                        </Slider>
                    </div > : <div></div>}
                </div >

                <BannerBackground
                    muted={isMuted}
                    bannerImg={window.location.pathname === "/series" && selectedMovie.images ? selectedMovie.images.POSTER : selectedMovie.image_id}
                    _trailer={trailer}
                    _onPlayTrailer={isPlayingTrailer}
                    _bannerContent={selectedMovie}
                />

                <div className="hero-gradient" />
            </div >
        </section >
    )
}

export default DynamicBanner

// import { useState, useEffect, useMemo } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchAllSeries, fetchTrailer, returnMovieOrSeriesDetails } from '../../redux/fetchMoviesApi'
// import { useLocation } from "react-router-dom"
// import ReactPlayer from 'react-player'
// import Slider from 'react-slick'
// import Button from '../buttons/Button'
// import OutlineButton from '../buttons/OutlineButton'
// import dynamicBannerSliderSettings from '../../../lib/sliderConfig/dynamicBannerSliderSettings'
// import SliderItem from './SliderItem'
// import getRandomIndexes from '../../../lib/getRandomIndexes'
// import getGenreName from "../../../lib/getGenreName"
// import isInViewport from "../../../lib/isInViewport"
// import '../../components/styles/banners/dynamicBanner.scss'
// import BannerBackground from "./BannerBackground"
// import { errorLog, processLog, warnLog } from "../../logger"

// /* **
//  * display a recently added series in banner.picks a series from the recently added category
//  */

// const getBannerSlides = (vods, _location) => {
//     if (vods.length < 1) return []

//     // let vodSource

//     // if (_location !== "/series") vodSource = _recentlyadded
//     // else vodSource = async () => {
//     //     console.warn("::::", await fetchAllSeries())
//     //     return await fetchAllSeries()
//     // }

//     // const setVodSource = async () => {
//     //     if (_location === "/series") {
//     //         let _ = []
//     //         _ = async () => { return await fetchAllSeries() }
//     //         vodSource = await _()
//     //     } else vodSource = _recentlyadded
//     // }

//     // const init = async () => {
//     // }

//     // setVodSource()

//     // if (vodSource) console.log("****", vodSource)
//     // else {
//     //     console.warn("no vodSource")
//     //     return []
//     // }


//     // const getAllSeries = async () => {
//     //     // console.warn("::::", await fetchAllSeries())
//     //     return await fetchAllSeries()
//     // }

//     // console.warn("** VODS **", vods)

//     const slides = []
//     let seriesSlides = []
//     const indexes = getRandomIndexes(vods)

//     // console.warn("INDEXES **", indexes)

//     // if (_location === "/series") {
//     //     const getAllSeries = async () => {
//     //         // console.warn("::::", await fetchAllSeries())
//     //         seriesSlides = await fetchAllSeries()
//     //     }

//     //     getAllSeries()
//     //     // console.warn('getAllSeries', getAllSeries())
//     // }

//     // for (let i = 0; i < indexes.length; i++) {
//     //     const element = indexes[i];
//     //     const _ = vods[element]

//     //     // console.warn("----", _.type,recentlyadded)

//     //     // if (_ && !slides.includes(_)) {
//     //     if (_.type === 'series') {
//     //         // seriesSlides.push(_)
//     //         console.warn("FOUND SERIES", _)
//     //     } else {
//     //         slides.push(_)
//     //     }
//     //     // }
//     // }

//     // console.warn('seriesSlides', seriesSlides)

//     warnLog('slides for banner', seriesSlides)

//     if (_location === '/series') return seriesSlides

//     return slides
// }

// const DynamicBanner = ({ showSlides = true }) => {
//     const dispatch = useDispatch()
//     const location = useLocation()
//     const [playTrailer, setPlayTrailer] = useState(true)
//     const [isPlayingTrailer, setIsPlayingTrailer] = useState(true)
//     const [selectedMovie, setSelectedMovie] = useState({})
//     const [movieDetails, setMovieDetails] = useState({})
//     // const [genreName, setGenreName] = useState('')
//     const [trailer, setTrailer] = useState('')
//     const { recentlyadded, genres, allSeries } = useSelector((state) => state.fetchMovies)
//     // const slides = useMemo(() => getBannerSlides(location.pathname === "/series" ? allSeries : recentlyadded, location.pathname), [allSeries, location.pathname, recentlyadded])

//     const slides = location.pathname === "/series" ? getRandomIndexes(allSeries) : getRandomIndexes(recentlyadded)

//     const [slidesContent, setSlidesContent] = useState([])

//     console.warn("slides", slides)

//     // getRandomIndexes(vods)


//     useEffect(() => {
//         // processLog('set selected movie [effect]', slides.length)
//         fetchAllSeries(dispatch)
//         if (slides[0]) setSelectedMovie(slides[0])
//     }, [slides, dispatch])

//     const _setSelectedMovie = (vod) => {
//         // processLog('set selected movie', vod)

//         setSelectedMovie(vod)
//         _playTrailer()
//     }

//     const _playTrailer = async () => {
//         // processLog('play trailer')

//         setPlayTrailer(true)
//         setIsPlayingTrailer(true)
//         // setTrailer(await fetchTrailer(selectedMovie.id))
//     }

//     // useEffect(() => {
//     //     let _

//     //     if (location.pathname === '/series') {
//     //         _ = getGenreName(movieDetails.genres, genres)
//     //     } else _ = getGenreName(movieDetails.movie_genres, genres)

//     //     setGenreName(_)
//     // }, [genres, location.pathname, movieDetails, selectedMovie.genres, selectedMovie.movie_genres])

//     useEffect(() => {

//         const initSetMovieDetails = async () => {

//             // console.warn('selectedMovie', selectedMovie)
//             // console.warn('slides', slides)
//             // console.warn("::::", await fetchAllSeries())

//             if (selectedMovie.id) {
//                 processLog(`setting movie details`, selectedMovie.id)
//                 const _movie = await returnMovieOrSeriesDetails(selectedMovie.id, location.pathname === '/series' ? 'series' : 'movie')
//                 setMovieDetails(_movie)
//                 setTrailer(await fetchTrailer(selectedMovie.id))
//             }

//             else errorLog('selected movie ID null', selectedMovie.id)

//             // console.log('setMovieDetails', _movie)
//         }

//         // setTimeout(() => {
//         initSetMovieDetails()
//         // }, 4000)

//     }, [location.pathname, selectedMovie, slides])
//     // }, [location.pathname, selectedMovie.id])

//     useEffect(() => {
//         // processLog('handle scroll')

//         const handleScroll = (event) => {
//             if (window.scrollY < 350) setPlayTrailer(true)
//             else setPlayTrailer(false)
//         }

//         window.addEventListener("scroll", handleScroll)
//         return () => { window.removeEventListener("scroll", handleScroll) }
//     }, [])

//     return (
//         <section>
//             <div className="hero">
//                 <div className="hero-container">
//                     <div className="hero-content-wrapper">
//                         <div className="hero-content">
//                             <h1>{movieDetails.title}</h1>
//                             <p className="lines-max-4 hero-content-description">{movieDetails.description}</p>
//                             {/* <div className="cast">
//                                 {window.location.pathname !== '/series' ?
//                                     <div>
//                                         <b>CAST: </b>{movieDetails.cast}
//                                     </div>
//                                     : <></>}
//                             </div> */}
//                             {/* <div className="genre-subtitles"> */}
//                             {/* <b>Genre: </b>{genreName} */}
//                             {/* <div style={{ margin: '10px' }} />
//                                 <b>Subtitles: </b> English[CC] */}
//                             {/* </div > */}
//                             <div className='hero-buttons'>
//                                 <Button page={selectedMovie.type === 'series' ? `/series/${selectedMovie.id}` : `/movie/${selectedMovie.id}`} label='PLAY' />
//                                 {/* <div style={{ margin: '10px' }} />
//                                 {window.location.pathname === '/series' ? <></> : <OutlineButton action={_playTrailer} label={isPlayingTrailer ? 'STOP TRAILER' : 'PLAY TRAILER'} />} */}
//                             </div>
//                         </div >
//                     </div >

//                     {showSlides ? <div className='hero-slider-container'>
//                         <Slider Slider {...dynamicBannerSliderSettings} className='hero-slider-main' >
//                             {
//                                 slides.map((movie) => {
//                                     return <SliderItem
//                                         onClicked={() => _setSelectedMovie(movie)}
//                                         title={movie.title}
//                                         image_id={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movie.image_id}?accessKey=WkVjNWNscFhORDBLCg==`}
//                                         isSelected={selectedMovie.id === movie.id}
//                                         key={movie.id} />
//                                 })
//                             }
//                         </Slider>
//                     </div > : <div></div>}
//                 </div >

//                 <BannerBackground bannerImg={selectedMovie.image_id} _trailer={trailer} _onPlayTrailer={isPlayingTrailer} _bannerContent={selectedMovie} />

//                 <div className="hero-gradient" />
//             </div >
//         </section >
//     )
// }

// export default DynamicBanner