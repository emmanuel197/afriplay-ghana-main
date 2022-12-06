import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBannerContent, fetchTrailer, returnMovieDetails } from '../../redux/fetchMoviesApi'
import { useLocation, useNavigate } from "react-router-dom";
import Slider from 'react-slick'
import SliderItem from './SliderItem'
import getRandomIndexes from '../../../utils/getRandomIndexes'
import sliderSettings from '../../../utils/sliderConfig/sliderSettings'
import '../../components/styles/banners/dynamicBanner.scss'
import getGenreName from "../../../utils/getGenreName";
import Button from "../buttons/Button";
import ReactPlayer from "react-player";
import BannerBackground from "./BannerBackground";

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

const AfriPremiereBanner = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [age, setAge] = useState(0)
    const [bannerContent, setBannerContent] = useState({})
    const [bannerContentInfo, setBannerContentInfo] = useState({})
    const [playTrailer, setPlayTrailer] = useState(true)
    const [isPlayingTrailer, setIsPlayingTrailer] = useState(true)
    const [trailer, setTrailer] = useState('')
    const { afriPremiere, ageRatings, genres } = useSelector((state) => state.fetchMovies)

    useEffect(() => {
        const initFetchBannerTrailer = async () => {
            setTrailer(await fetchTrailer(bannerContent.content_id))
        }
        initFetchBannerTrailer()
    }, [bannerContent, dispatch])

    useEffect(() => {
        const initFetchBannerContent = async () => {
            const bannerContent = await fetchBannerContent()
            setBannerContent(bannerContent)
        }
        initFetchBannerContent()
    }, [])

    useEffect(() => {
        const initReturnMovieDetails = async () => {
            const _ = await returnMovieDetails(bannerContent.content_id)
            setBannerContentInfo(_)
        }

        initReturnMovieDetails()
    }, [ageRatings, bannerContent.content_id])

    useEffect(() => {
        const initSetAge = () => {
            if (bannerContentInfo)
                if (bannerContentInfo.age_rating_id > 0 && ageRatings.length > 0)
                    setAge(ageRatings[bannerContentInfo.age_rating_id].min_age)
        }

        setTimeout(() => {
            initSetAge()
        }, 1500);
    }, [ageRatings, bannerContentInfo])

    return (
        <section>
            <div className="hero">
                <div className="hero-container">
                    <div className="hero-content-wrapper">
                        {
                            bannerContentInfo ?
                                <div className="hero-content">
                                    <div className='genre-year-age-container'>
                                        <p>{getGenreName(bannerContentInfo.movie_genres, genres)}</p>
                                        <p>{bannerContentInfo.year}</p>
                                        <p className='age'>{age}+</p>
                                    </div>
                                    <h1>{bannerContentInfo.title}</h1>
                                    <p className="lines-max-4 hero-content-description">{bannerContentInfo.description}</p>
                                    <br />
                                    {/* <div className="cast">
                                        <b>CAST: </b>{bannerContentInfo.cast}
                                    </div> */}
                                    <Button page={`/movie/${bannerContentInfo.id}`} label='PLAY' />
                                </div>
                                : <></>
                        }
                    </div>

                    <div className='hero-slider-container'>
                        <Slider {...sliderSettings(3, 1)} className='hero-slider-main'>
                            {afriPremiere.map((movie) => {
                                return <SliderItem
                                    type='afripremiere'
                                    onClicked={() => navigate(movie.type === 'series' ? `/series/${movie.id}` : `/movie/${movie.id}`)}
                                    title={movie.title}
                                    genre_id={movie.movie_genres}
                                    allGenres={genres}
                                    image_id={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movie.image_id}?accessKey=WkVjNWNscFhORDBLCg==`}
                                    isSelected={false}
                                    key={movie.id} />
                            })}
                        </Slider>
                    </div>
                </div>

                <BannerBackground bannerImg={bannerContent.preview_image_id} _trailer={trailer} _onPlayTrailer={isPlayingTrailer} _bannerContent={bannerContent} />

                <div className="hero-gradient afripremiere-hero-gradient" />
            </div>
        </section>
    )
}

export default AfriPremiereBanner