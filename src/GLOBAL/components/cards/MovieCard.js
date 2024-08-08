// import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { fetchChannelInfo } from "../../redux/channels";
// import getEPGInfo from "../../../utils/getEPGInfo";
// import "../../components/styles/landing/slides.scss";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import { selectedMovieReducer } from "../../redux/slice/moviesSlice";
// import { useDispatch } from "react-redux";
// import ReactPlayer from 'react-player';
// import { fetchTrailer } from "../../redux/fetchMoviesApi";

// const MovieCard = ({ movie, type }) => {
//     const location = useLocation();
//     const dispatch = useDispatch();
//     const [channelInfo, setChannelInfo] = useState({});
//     const [EPGInfo, setEPGInfo] = useState({ start: '00:00', end: '00:00', title: '' });
//     const [isHovering, setIsHovering] = useState(false);
//     const [trailer, setTrailer] = useState('');

//     useEffect(() => {
//         const initFetchChannelInfo = async () => {
//             setChannelInfo(await fetchChannelInfo(movie.id));
//         };
//         initFetchChannelInfo();
//     }, [movie.id]);

//     useEffect(() => {
//         if (location === '/livetv') {
//             const initSetDates = async () => setEPGInfo(getEPGInfo(movie.shows));
//             initSetDates();
//         }
//     }, [location, movie.shows]);

//     useEffect(() => {
//         const fetchMovieTrailer = async () => {
//             const trailerUrl = await fetchTrailer(movie.id);
//             setTrailer(trailerUrl);
//         };
//         fetchMovieTrailer();
//     }, [movie.id]);

//     const MovieCardComponent = () => (
//         <div 
//             className="movie-card" 
//             onMouseEnter={() => location.pathname !== "/" && setIsHovering(true)} 
//             onMouseLeave={() => location.pathname !== "/" && setIsHovering(false)}
//         >
//             <Link to={movie.type === 'series' ? `/series/${movie.id}` : `/movie/${movie.id}`}>
//                 <div className="movie-box">
//                     <div className="poster-div">
//                         {isHovering && trailer ? (
//                             <ReactPlayer
//                                 url={trailer}
//                                 playing
//                                 muted
//                                 width="100%"
//                                 height="100%"
//                                 className="trailer-player"
//                             />
//                         ) : (
//                             <LazyLoadImage
//                                 src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movie.image_id}?accessKey=WkVjNWNscFhORDBLCg==`}
//                                 alt={movie.alt}
//                                 width="100%"
//                                 placeholder={<div className="poster-img-placeholder"></div>}
//                             />
//                         )}
//                     </div>
//                 </div>
//             </Link>
//         </div>
//     );

//     if (location === '/livetv' && type === 'livetv' && EPGInfo) {
//         // console.log(channelInfo.image_stores[0].id && channelInfo.image_stores[0].id)
//         return (
//             <div className="movie-card livetv-movie-card">
//                 <Link to={`/watch/live/${channelInfo.uid}`}>
//                     <div className="movie-box">
//                         <div className="poster-div">
//                             {channelInfo.image_stores ? (
//                                 <LazyLoadImage
//                                     src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${channelInfo.image_stores[0]?.id}?accessKey=WkVjNWNscFhORDBLCg==`}
//                                     alt={movie.alt}
//                                     width="100%"
//                                     placeholder={<div className="poster-img-placeholder livetv-poster-img-placeholder"></div>}
//                                 />
//                             ) : null}
//                         </div>
//                         <div className='card-text' style={{ marginTop: '5px' }}>
//                             <p className='name lines-max-1'>{EPGInfo.title.replace(/ *\([^)]*\) */g, "")}</p>
//                             <p>{EPGInfo.start} - {EPGInfo.end}</p>
//                         </div>
//                     </div>
//                 </Link>
//             </div>
//         );
//     }

//     if (type === 'search') {
//         return <MovieCardComponent />;
//     }

//     if (type === 'genre-movies') {
//         return (
//             <div className="movie-card">
//                 <Link to={location === '/series' ? `/series/${movie.id}` : `/movie/${movie.id}`}>
//                     <div className="movie-box">
//                         <div className="poster-div">
//                             <LazyLoadImage
//                                 src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${location === '/series' ? movie.images.POSTER : movie.image_store_id}?accessKey=WkVjNWNscFhORDBLCg==`}
//                                 alt={movie.alt}
//                                 width="100%"
//                                 placeholder={<div className="poster-img-placeholder"></div>}
//                             />
//                         </div>
//                     </div>
//                 </Link>
//             </div>
//         );
//     }

//     return <MovieCardComponent />;
// };

// export default MovieCard;
// src/components/MovieCard.js

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchChannelInfo } from "../../redux/channels";
import getEPGInfo from "../../../utils/getEPGInfo";
import "../../components/styles/landing/slides.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
import ReactPlayer from 'react-player';
import { fetchTrailer } from "../../redux/fetchMoviesApi";
import { useHandleNavigation } from "../../components/navigationHelpers";

const MovieCard = ({ movie, type }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [channelInfo, setChannelInfo] = useState({});
    const [EPGInfo, setEPGInfo] = useState({ start: '00:00', end: '00:00', title: '' });
    const [isHovering, setIsHovering] = useState(false);
    const [trailer, setTrailer] = useState('');

    const handleClick = useHandleNavigation(movie); // Use the extracted handleClick logic

    useEffect(() => {
        const initFetchChannelInfo = async () => {
            setChannelInfo(await fetchChannelInfo(movie.id));
        };
        initFetchChannelInfo();
    }, [movie.id]);

    useEffect(() => {
        if (location === '/livetv') {
            const initSetDates = async () => setEPGInfo(getEPGInfo(movie.shows));
            initSetDates();
        }
    }, [location, movie.shows]);

    useEffect(() => {
        const fetchMovieTrailer = async () => {
            const trailerUrl = await fetchTrailer(movie.id);
            setTrailer(trailerUrl);
        };
        fetchMovieTrailer();
    }, [movie.id]);

    const MovieCardComponent = () => (
        <div 
            className="movie-card" 
            onMouseEnter={() => location.pathname !== "/" && setIsHovering(true)} 
            onMouseLeave={() => location.pathname !== "/" && setIsHovering(false)}
        >
            <div className="movie-box" onClick={() => handleClick(movie.type === 'series' ? `/series/${movie.id}` : `/movie/${movie.id}`)}>
                <div className="poster-div">
                    {isHovering && trailer ? (
                        <ReactPlayer
                            url={trailer}
                            playing
                            muted
                            width="100%"
                            height="100%"
                            className="trailer-player"
                        />
                    ) : (
                        <LazyLoadImage
                            src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movie.image_id}?accessKey=WkVjNWNscFhORDBLCg==`}
                            alt={movie.alt}
                            width="100%"
                            placeholder={<div className="poster-img-placeholder"></div>}
                        />
                    )}
                </div>
            </div>
        </div>
    );

    if (location === '/livetv' && type === 'livetv' && EPGInfo) {
        return (
            <div className="movie-card livetv-movie-card" onClick={() => handleClick(`/watch/live/${channelInfo.uid}`)}>
                <div className="movie-box">
                    <div className="poster-div">
                        {channelInfo.image_stores ? (
                            <LazyLoadImage
                                src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${channelInfo.image_stores[0]?.id}?accessKey=WkVjNWNscFhORDBLCg==`}
                                alt={movie.alt}
                                width="100%"
                                placeholder={<div className="poster-img-placeholder livetv-poster-img-placeholder"></div>}
                            />
                        ) : null}
                    </div>
                    <div className='card-text' style={{ marginTop: '5px' }}>
                        <p className='name lines-max-1'>{EPGInfo.title.replace(/ *\([^)]*\) */g, "")}</p>
                        <p>{EPGInfo.start} - {EPGInfo.end}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (type === 'search') {
        return <MovieCardComponent />;
    }

    if (type === 'genre-movies') {
        return (
            <div className="movie-card" onClick={() => handleClick(location === '/series' ? `/series/${movie.id}` : `/movie/${movie.id}`)}>
                <div className="movie-box">
                    <div className="poster-div">
                        <LazyLoadImage
                            src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${location === '/series' ? movie.images.POSTER : movie.image_store_id}?accessKey=WkVjNWNscFhORDBLCg==`}
                            alt={movie.alt}
                            width="100%"
                            placeholder={<div className="poster-img-placeholder"></div>}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return <MovieCardComponent />;
};

export default MovieCard;
