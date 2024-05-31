import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllSeries, fetchTrailer, returnMovieOrSeriesDetails } from '../../redux/fetchMoviesApi'
import { Link, useLocation, useNavigate } from "react-router-dom"
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
    const navigate = useNavigate()
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
    const [showTitle, setShowTitle] = useState(true)

    setTimeout(() => {
        setShowTitle(false)
    }, 5000);

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
            const _movie = await returnMovieOrSeriesDetails(selectedMovie.id, 'movie')
            
        
            setMovieDetails(location.pathname === "/movies" ? _movie : selectedMovie)
            
            
            setTrailer(await fetchTrailer(location.pathname === '/series' ? selectedMovie.seasons[0].episodes[0].id: selectedMovie.id))
        }
        initSetMovieDetails()
    }, [location.pathname, selectedMovie.id])

    useEffect(() => {
        const handleScroll = (event) => {
            if (window.scrollY <
                 350) setPlayTrailer(true)
            else setPlayTrailer(false)
        }

        window.addEventListener("scroll", handleScroll)
        return () => { window.removeEventListener("scroll", handleScroll) }
    }, [])
    // console.log(movieDetails.description)
    
    return (
        <section>
            <div className="hero" onClick={() => setShowTitle(true)}>
                <div className="hero-container">
                    <div className="hero-content-wrapper">
                        {
                            showTitle
                                ? <div className="hero-content">
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
                                                <Button page={window.location.pathname === '/series' ? `/series/${selectedMovie.id}` : `/watch/movie/${selectedMovie.uid}`}  selectedMovie={selectedMovie.id} label='PLAY'  />
                                                {/* <Button page={handleClick} label='PLAY' /> */}
                                                <OutlineButton page={window.location.pathname === '/series' ? `/series/${selectedMovie.id}` : `/movie/${selectedMovie.id}`}  label="Info" />
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
                                </div>
                                : <></>
                        }
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

                {showTitle ? <div className="hero-gradient" /> : <></>}
            </div >
        </section >
    )
}

export default DynamicBanner



