import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { AiTwotoneStar } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { AiFillCalendar } from "react-icons/ai";
import { BsFillClockFill } from "react-icons/bs";
import { fetchMovieDetails, fetchWatchlist, removeWatchlist, updateWatchlist, fetchTrailer } from "../../redux/fetchMoviesApi";
import numToTime from "../../../utils/convertDate";
import shareMovie from "../../../utils/share";
import Loader from "../Loader";
import "../styles/MovieDetails.scss";

const MovieDetailsBanner = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [watchlisted, setWatchlisted] = useState(false); // Initially false
  const [showFullDescription, setShowFullDescription] = useState(false); // Track description expansion
  const [hasOverflow, setHasOverflow] = useState(false); // Track if content has overflow
  const descriptionRef = useRef(null); // Reference to description text container
  const { movieDetails, loading, watchlist } = useSelector((state) => state.fetchMovies);
  const { premiumSub } = useSelector((state) => state.fetchPackages);

  const toggleAddToWatchlist = (_action) => {
    setWatchlisted(!watchlisted);
    if (_action === 'add') updateWatchlist(movieDetails.id, 'movie', 0);
    if (_action === 'remove') removeWatchlist(movieDetails.id, 'movie');
  };

  const navigateToMovie = async (includeTrailer = false) => {
    const state = { variant: "movie" } 
    navigate(`/watch/movie/${movieDetails.uid}`, { state: state });
  };

  const handleWatchTrailer = async () => {
    // Always fetch the trailer, regardless of whether the user is premium or not
    const trailerData = await fetchTrailer(movieDetails.id);
    navigate(`/watch/movie/${movieDetails.uid}`, { state: { trailer: trailerData, variant: "trailer"} });
  };

  const handleWatchMovie = () => {
    // Premium users can watch the movie, non-premium users see the trailer
   navigateToMovie();
  };

  useEffect(() => {
    const checkIsWatchlisted = () => {
      const _ids = watchlist.map(item => item.movie_id);
      setWatchlisted(_ids.includes(movieDetails.id));
    };
    checkIsWatchlisted();
  }, [movieDetails.id, watchlist]);

  useEffect(() => {
    fetchMovieDetails(dispatch, id);
    fetchWatchlist(dispatch);
  }, [dispatch, id]);

  useEffect(() => {
    // Check if the description content has overflow
    if (descriptionRef.current) {
      const hasOverflowContent =
        descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
      setHasOverflow(hasOverflowContent);
    }
  }, [movieDetails.description, showFullDescription]); // Trigger on description change or toggle
  if (loading) return <Loader />;

  return (
    <div className="details-movie">
      <div className="details-page-banner">
        <img alt='' src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movieDetails.image_store_id}?accessKey=WkVjNWNscFhORDBLCg==`} />
        <div className='overlay' />
      </div>
      <div className="container">
        <div className="image-movie-details">
          <div className="image">
            <img
              src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movieDetails.image_store_id}?accessKey=WkVjNWNscFhORDBLCg==`}
              alt="banner"
            />
          </div>
          <div className="movie-details">
            <h1 className="title"> {movieDetails.title} </h1>
            <div className="age-year-rating">
              <p className="age rating">
                <AiTwotoneStar /> {movieDetails.user_rating}
              </p>
              <p className="age restrictions">
                <BiUserCircle /> 16+
              </p>
              <p className="age restrictions">
                <AiFillCalendar /> {movieDetails.year}
              </p>
              <p className="age restrictions">
                <BsFillClockFill /> {numToTime(movieDetails)}
              </p>
            </div>
            <div className="watch-trailer-share">
              <div onClick={handleWatchMovie} className="watch">WATCH MOVIE</div>
              {!watchlisted ? (
                <div onClick={() => toggleAddToWatchlist('add')} className="others">
                  ADD TO WATCHLIST
                </div>
              ) : (
                <div onClick={() => toggleAddToWatchlist('remove')} className="others">
                  REMOVE FROM WATCHLIST
                </div>
              )}
              <div onClick={handleWatchTrailer} className="others">
                TRAILER
              </div>
              <div onClick={() => shareMovie(movieDetails)} className="others">
                SHARE
              </div>
            </div>
            <div className="description">
            <p
                ref={descriptionRef}
                className={`description-text ${showFullDescription ? "show-full" : "show-less"}`}
              >
                {movieDetails.description}
              </p>
              {/* Conditionally render the toggle link only if there is overflow */}
              {hasOverflow && (
                <div
                  className="toggle-description"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? "Show Less" : "Show More"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsBanner;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import { AiTwotoneStar } from "react-icons/ai";
// import { BiUserCircle } from "react-icons/bi";
// import { AiFillCalendar } from "react-icons/ai";
// import { BsFillClockFill } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import { fetchMovieDetails, fetchWatchlist, removeWatchlist, updateWatchlist, fetchTrailer } from "../../redux/fetchMoviesApi";
// import numToTime from "../../../utils/convertDate";
// import shareMovie from "../../../utils/share";
// import Loader from "../Loader";
// import "../styles/MovieDetails.scss";


// const MovieDetailsBanner = () => {
//   const dispatch = useDispatch();
//   let { id } = useParams();
//   const navigate = useNavigate(); // Add this line
//   const [watchlisted, setWatchlisted] = useState(true);
//   const { movieDetails, loading, watchlist } = useSelector((state) => state.fetchMovies);
//   const {premiumSub} = useSelector((state) => state.fetchPackages)
//   // Add this function

// //   const navigateToMovie = async (includeTrailer = false) => {
// //     const state = includeTrailer ? { trailer: await fetchTrailer(movieDetails.id) } : {};
// //     navigate(`/watch/movie/${movieDetails.uid}`, { state });
// // };

// // const handleWatchTrailer = () => navigateToMovie();

// // const handleWatchMovie = () => {
// //     premiumSub ? navigateToMovie() : navigateToMovie(true);
// // };
//   const handleWatchTrailer = async () => {
//     const trailerData = await fetchTrailer(movieDetails.id);
//     navigate(`/watch/movie/${movieDetails.uid}`, { state: { trailer: trailerData } });
//   };

//   const handleWatchMovie = async () => {
//       if (premiumSub ) {
//         navigate(`/watch/movie/${movieDetails.uid}`)
//       } else {
//         const trailerData = await fetchTrailer(movieDetails.id);
//         navigate(`/watch/movie/${movieDetails.uid}`, { state: { trailer: trailerData } });
//       }
//   }
//   const toggleAddToWatchlist = (_action) => {
//     setWatchlisted(!watchlisted);
//     if (_action === 'add') updateWatchlist(movieDetails.id, 'movie', 0);
//     if (_action === 'remove') removeWatchlist(movieDetails.id, 'movie');
//   };

//   useEffect(() => {
//     const checkIsWatchlisted = () => {
//       let _ids = [];
//       for (let i = 0; i < watchlist.length; i++) {
//         const element = watchlist[i];
//         _ids.push(element.movie_id);
//       }
//       if (_ids.includes(movieDetails.id)) setWatchlisted(true);
//       else setWatchlisted(false);
//     };
//     checkIsWatchlisted();
//   }, [movieDetails.id, watchlist]);

//   useEffect(() => {
//     fetchMovieDetails(dispatch, id);
//     fetchWatchlist(dispatch);
//   }, [dispatch, id]);

//   if (loading) return <Loader />;

//   return (
//     <div className="details-movie">
//       <div className="details-page-banner">
//         <img alt='' src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movieDetails.image_store_id}?accessKey=WkVjNWNscFhORDBLCg==`} />
//         <div className='overlay' />
//       </div>
//       <div className="container">
//         <div className="image-movie-details">
//           <div className="image">
//             <img
//               src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movieDetails.image_store_id}?accessKey=WkVjNWNscFhORDBLCg==`}
//               alt="banner"
//             />
//           </div>
//           <div className="movie-details">
//             <h1 className="title"> {movieDetails.title} </h1>
//             <div className="age-year-rating">
//               <p className="age rating">
//                 <AiTwotoneStar /> {movieDetails.user_rating}
//               </p>
//               <p className="age restrictions">
//                 <BiUserCircle /> 16+
//               </p>
//               <p className="age restrictions">
//                 <AiFillCalendar /> {movieDetails.year}
//               </p>
//               <p className="age restrictions">
//                 <BsFillClockFill /> {numToTime(movieDetails)}
//               </p>
//             </div>
//             <div className="watch-trailer-share">
//               <div onClick={handleWatchMovie} className="watch">WATCH MOVIE </div>
//               {!watchlisted ? <div onClick={() => toggleAddToWatchlist('add')} className="others">
//                 ADD TO WATCHLIST
//               </div> :
//                 <div onClick={() => toggleAddToWatchlist('remove')} className="others">
//                   REMOVE FROM WATCHLIST
//                 </div>}
//               <div onClick={handleWatchTrailer} className="others">
//                 TRAILER
//               </div>
//               <div onClick={() => shareMovie(movieDetails)} className="others">
//                 SHARE
//               </div>
//             </div>
//             <div className="description">
//               <p>{movieDetails.description}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetailsBanner;
// 4445 6910 0505 6735