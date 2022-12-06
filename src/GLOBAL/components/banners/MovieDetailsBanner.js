import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiTwotoneStar } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { AiFillCalendar } from "react-icons/ai";
import { BsFillClockFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { fetchMovieDetails, fetchWatchlist, removeWatchlist, updateWatchlist } from "../../redux/fetchMoviesApi";
import numToTime from "../../../utils/convertDate";
import shareMovie from "../../../utils/share";
import Loader from "../Loader";
import "../styles/MovieDetails.scss";

const MovieDetailsBanner = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [watchlisted, setWatchlisted] = useState(true)
  const { movieDetails, loading, watchlist } = useSelector((state) => state.fetchMovies);

  // console.warn('movieDetails', movieDetails)

  const toggleAddToWatchlist = (_action) => {
    setWatchlisted(!watchlisted)
    if (_action === 'add') updateWatchlist(movieDetails.id, 'movie', 0)
    if (_action === 'remove') removeWatchlist(movieDetails.id, 'movie')
  }

  useEffect(() => {
    const checkIsWatchlisted = () => {
      let _ids = []
      for (let i = 0; i < watchlist.length; i++) {
        const element = watchlist[i];
        _ids.push(element.movie_id)
      }
      if (_ids.includes(movieDetails.id)) setWatchlisted(true)
      else setWatchlisted(false)
    }
    checkIsWatchlisted()
  }, [movieDetails.id, watchlist])

  useEffect(() => {
    fetchMovieDetails(dispatch, id)
    fetchWatchlist(dispatch)
  }, [dispatch, id])

  if (loading) return <Loader />

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
                {/* <BsFillClockFill /> 1hr : 20mins */}
              </p>
            </div>
            <div className="watch-trailer-share">
              {/* <BuyMovie _currency='USD' /> */}
              {/* <BuyMovie _currency='NGN' /> */}
              {/* <Link to={`/pay-per-view/${movieDetails.id}`} className="watch">BUY MOVIE</Link> */}
              <Link to={`/watch/movie/${movieDetails.uid}`} className="watch">WATCH MOVIE </Link>
              {!watchlisted ? <div onClick={() => toggleAddToWatchlist('add')} className="others">
                ADD TO WATCHLIST
              </div> :
                <div onClick={() => toggleAddToWatchlist('remove')} className="others">
                  REMOVE FROM WATCHLIST
                </div>}
              <Link to="" className="others">
                TRAILER
              </Link>
              <div onClick={() => shareMovie(movieDetails)} className="others">
                SHARE
              </div>
            </div>
            <div className="description">
              <p>{movieDetails.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsBanner;

// 4445 6910 0505 6735