// import { useState, useEffect, useMemo } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchBannerContent, fetchTrailer, returnMovieDetails } from '../../redux/fetchMoviesApi'
// import { useLocation, useNavigate } from "react-router-dom";
// import Slider from 'react-slick'
// import SliderItem from './SliderItem'
// import getRandomIndexes from '../../../utils/getRandomIndexes'
// import sliderSettings from '../../../utils/sliderConfig/sliderSettings'
// import '../../components/styles/banners/dynamicBanner.scss'
// import getGenreName from "../../../utils/getGenreName";
// import Button from "../buttons/Button";
// import ReactPlayer from "react-player";
// import BannerBackground from "./BannerBackground";
// import OutlineButton from "../buttons/OutlineButton";

// // const fetchDataForBannerSlider = (_recentlyadded_) => {
// //     if (_recentlyadded_.length < 1) return []
// //     const slides = []
// //     let indexes = getRandomIndexes(_recentlyadded_)

// //     for (let i = 0; i < indexes.length; i++) {
// //         const element = indexes[i];
// //         const _ = _recentlyadded_[element]
// //         if (_) slides.push(_)
// //     }

// //     return slides
// // }

// const AfriPremiereBanner = () => {
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const [age, setAge] = useState(0)
//     const [bannerContent, setBannerContent] = useState({})
//     const [bannerContentInfo, setBannerContentInfo] = useState({})
//     const [playTrailer, setPlayTrailer] = useState(true)
//     const [isPlayingTrailer, setIsPlayingTrailer] = useState(true)
//     const [trailer, setTrailer] = useState('')
//     const [isMuted, setIsMuted] = useState(true)
//     const { afriPremiere, ageRatings, genres } = useSelector((state) => state.fetchMovies)
//     console.log(afriPremiere)
//     const [showTitle, setShowTitle] = useState(true)

//     setTimeout(() => {
//         setShowTitle(false)
//     }, 5000);

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
//             setBannerContentInfo(_)
//         }

//         initReturnMovieDetails()
//     }, [ageRatings, bannerContent.content_id])

//     useEffect(() => {
//         const initSetAge = () => {
//             if (bannerContentInfo)
//                 if (bannerContentInfo.age_rating_id > 0 && ageRatings.length > 0)
//                     setAge(ageRatings[bannerContentInfo.age_rating_id].min_age)
//         }

//         setTimeout(() => {
//             initSetAge()
//         }, 1500);
//     }, [ageRatings, bannerContentInfo])
//     console.log(bannerContent)
//     return (
//         <section>
//             <div className="hero">
//                 <div className="hero-container" onClick={() => setShowTitle(true)}>
//                     <div className="hero-content-wrapper">
//                         {
//                             bannerContentInfo ?
//                                 <div className="hero-content">
//                                     <div className='genre-year-age-container'>
//                                         <p>{getGenreName(bannerContentInfo.movie_genres, genres)}</p>
//                                         <p>{bannerContentInfo.year}</p>
//                                         <p className='age'>{age}+</p>
//                                     </div>
//                                     <h1>{bannerContentInfo.title}</h1>
//                                     <p className="lines-max-4 hero-content-description">{bannerContentInfo.description}</p>
//                                     <br />
//                                     <div className="cast">
//                                         <b>CAST: </b>{bannerContentInfo.cast}
//                                     </div>

//                                     {
//                                         bannerContentInfo.id
//                                             ? <div className='hero-buttons'>
//                                                 <Button page={window.location.pathname === '/series' ? `/series/${bannerContentInfo.id}` : `/watch/movie/${bannerContentInfo.uid}`} selectedMovie={bannerContentInfo.id} label='PLAY' />
//                                                 <OutlineButton page={window.location.pathname === '/series' ? `/series/${bannerContentInfo.id}` : `/movie/${bannerContentInfo.id}`} label="Info" />
//                                                 <div className="mute-icon">
//                                                     {
//                                                         isMuted
//                                                         ?<img onClick={() => { setIsMuted(!isMuted) }} src="/assets/svg/muted.svg" alt="mute icon" />
//                                                         :   <img onClick={() => { setIsMuted(!isMuted) }} src="/assets/svg/speaker.svg" alt="speacker icon" />
//                                                     }
//                                                 </div>
//                                             </div>
//                                             : <></>
//                                     }
//                                 </div>
//                                 : <></>
//                         }
//                     </div>

//                     <div className='hero-slider-container'>
//                         <Slider {...sliderSettings(3, 1)} className='hero-slider-main'>
//                             {afriPremiere.map((movie) => {
//                                 return <SliderItem
//                                     type='afripremiere'
//                                     onClicked={() => navigate(movie.type === 'series' ? `/series/${movie.id}` : `/movie/${movie.id}`)}
//                                     title={movie.title}
//                                     genre_id={movie.movie_genres}
//                                     allGenres={genres}
//                                     image_id={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movie.image_id}?accessKey=WkVjNWNscFhORDBLCg==`}
//                                     isSelected={false}
//                                     key={movie.id} />
//                             })}
//                         </Slider>
//                     </div>
//                 </div>

//                 <BannerBackground muted={isMuted} bannerImg={bannerContent.preview_image_id} _trailer={trailer} _onPlayTrailer={isPlayingTrailer} _bannerContent={bannerContent} />

//                 {/* {showTitle ? <div className="hero-gradient afripremiere-hero-gradient" /> : <></>} */}

//                 <div className="hero-gradient afripremiere-hero-gradient" />
//             </div>
//         </section>
//     )
// }

// export default AfriPremiereBanner
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAgeRatings, fetchAllMovies, fetchGenres } from '../../redux/fetchMoviesApi';
import { useNavigate } from "react-router-dom";
import Slider from 'react-slick';
import SliderItem from './SliderItem';
import sliderSettings from '../../../utils/sliderConfig/sliderSettings';
import '../../components/styles/banners/dynamicBanner.scss';
import getGenreName from "../../../utils/getGenreName";
import Button from "../buttons/Button";
import OutlineButton from "../buttons/OutlineButton";
import BannerBackground from "./BannerBackground";
import formatReleaseDate from '../../../utils/releaseDateFormatter';

const AfriPremiereBanner = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [age, setAge] = useState(0);
    const [bannerContent, setBannerContent] = useState({});
    const [bannerContentInfo, setBannerContentInfo] = useState({});
    const [playTrailer, setPlayTrailer] = useState(true);
    const [isPlayingTrailer, setIsPlayingTrailer] = useState(true);
    const [trailer, setTrailer] = useState('');
    const [isMuted, setIsMuted] = useState(true);
    const [afriPremiereMovies, setAfriPremiereMovies] = useState([]); // Store fetched movies
    const [showTitle, setShowTitle] = useState(true);
    const { genres, ageRatings } = useSelector((state) => state.fetchMovies); // Get genres and ageRatings from the store

    setTimeout(() => {
        setShowTitle(false);
    }, 5000);

    // Fetch movies from `fetchAllMovies` and filter `premiere` type movies
    useEffect(() => {
        const initFetchMovies = async () => {
            try {
                const fetchedMovies = await fetchAllMovies(); // Fetch all movies
                fetchGenres(dispatch)
                fetchAgeRatings(dispatch)
                const filtered = fetchedMovies.filter(
                    (movie) => movie?.metadata?.movie_type === "premiere"
                );
                setAfriPremiereMovies(filtered); // Store filtered movies
                setBannerContent(filtered[1]); // Set the first movie as banner content
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        initFetchMovies();
    }, [dispatch]);
    
    useEffect(() => {
        const initSetAge = () => {
            if (bannerContent)
                // if (bannerContent.age_rating_id > 0 && ageRatings.length > 0)
                if (bannerContent.age_rating_id > 0)
                    setAge(ageRatings[bannerContent.age_rating_id].min_age);
        };

        setTimeout(() => {
            initSetAge();
        }, 1500);
    }, [ageRatings, bannerContent]);
   console.log(ageRatings)
    return (
        <section>
            <div className="hero">
                <div className="hero-container" onClick={() => setShowTitle(true)}>
                    <div className="hero-content-wrapper">
                        {
                            bannerContent ? (
                                <div className="hero-content">
                                    <div className='genre-year-age-container'>
                                        <p>{getGenreName(bannerContent.genres, genres)}</p>
                                        {/* <p>{formatReleaseDate(bannerContent?.metadata?.release_date)}</p> */}
                                        <p>{bannerContent?.year}</p>
                                        <p className='age'>{age}+</p>
                                    </div> 
                                    <h1>{bannerContent.title}</h1>
                                    <p className="lines-max-4 hero-content-description">{bannerContent.description}</p>
                                    <br />
                                    <div className="cast">
                                        <b>CAST: </b>{bannerContent.cast}
                                    </div>

                                    {
                                        bannerContent.id ? (
                                            <div className='hero-buttons'>
                                                <Button page={`/watch/movie/${bannerContent.uid}`} selectedMovie={bannerContent.id} label='PLAY' />
                                                <OutlineButton page={`/movie/${bannerContent.id}`} label="Info" />
                                                <div className="mute-icon">
                                                    {isMuted
                                                        ? <img onClick={() => { setIsMuted(!isMuted) }} src="/assets/svg/muted.svg" alt="mute icon" />
                                                        : <img onClick={() => { setIsMuted(!isMuted) }} src="/assets/svg/speaker.svg" alt="speaker icon" />
                                                    }
                                                </div>
                                            </div>
                                        ) : <></>
                                    }
                                </div>
                            ) : <></>
                        }
                    </div>

                    <div className='hero-slider-container'>
                        <Slider {...sliderSettings(3, 1, 2)} className='hero-slider-main'>
                            {afriPremiereMovies.map((movie) => {
                                return (
                                    <SliderItem
                                        type='afripremiere'
                                        onClicked={() => navigate(movie.type === 'series' ? `/series/${movie.id}` : `/movie/${movie.id}`)}
                                        title={movie?.title}
                                        genre_id={movie?.genres}
                                        allGenres={genres}
                                        image_id={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movie?.image_store_id}?accessKey=WkVjNWNscFhORDBLCg==`}
                                        isSelected={false}
                                        key={movie.id}
                                    />
                                );
                            })}
                        </Slider>
                    </div>
                </div>

                <BannerBackground muted={isMuted} bannerImg={bannerContent?.image_store_id} _trailer={trailer} _onPlayTrailer={isPlayingTrailer} _bannerContent={bannerContent} />

                <div className="hero-gradient afripremiere-hero-gradient" />
            </div>
        </section>
    );
};

export default AfriPremiereBanner;
