import { useState, useEffect, createRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEpisodeInfo,
  fetchMovieVideo,
  fetchTrailer,
  sendPlayLogs,
  updateWatchlist
} from "../redux/fetchMoviesApi";
import { fetchPurchaseHistory } from "../redux/subscriptionApis";
import ReactPlayer from "react-player";
import "../components/styles/WatchMovie.scss";
import ConnectionError from "../components/connectionError";
import UnsubscribedUser from "../components/unsubscribedUser";
import Spinner from "../components/Spinner";

const Watch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const _ref = createRef();
  const { id, type } = useParams();
  const { video, selectedMovie } = useSelector((state) => state.fetchMovies);
  const { premiumSub } = useSelector((state) => state.fetchPackages);
  const [secondsPlayed, setSecondsPlayed] = useState(0);
  const [lengthWatchedInMs, setLengthWatchedInMs] = useState(0);
  const [showNextPopup, setShowNextPopup] = useState(false);
  const [nextEpisodeId, setNextEpisodeId] = useState("");
  const [nextEpisodeInfo, setNextEpisodeInfo] = useState({});
  const [isLiveTv, setIsLiveTv] = useState(true);
  const [trailer, setTrailer] = useState("");
  const [error, setError] = useState(null); // State to track errors
  const [loading, setLoading] = useState(true); // State to track loading
  const [retryTime, setRetryTime] = useState(0); // State to track retry time

  useEffect(() => {
    const route = location.pathname;
    if (route.substring(0, 12) === "/watch/live/") setIsLiveTv(true);
    else setIsLiveTv(false);
  }, [location.pathname]);

  const onNextPopupClick = () => {
    setShowNextPopup(false);
    navigate(`/watch/series/${nextEpisodeInfo.id}`);
  };

  const setProgressInMs = (e) => {
    const _lengthWatchedInMs = (e.played * 100).toFixed(0) * 10;
    setLengthWatchedInMs(_lengthWatchedInMs);
    initSendPlayLogs(e.playedSeconds.toFixed(0));
    setSecondsPlayed(e.playedSeconds.toFixed(0));
    setLoading(false)
  };

  const initSendPlayLogs = async (x) => {
    let remainder = x % 60;
    if (remainder === 0) sendPlayLogs(id, type, x);
  };

  const initUpdateWatchlist = () => {
    if (type === "series") updateWatchlist(id, "series", lengthWatchedInMs);
    if (type === "movie") updateWatchlist(id, "movie", lengthWatchedInMs);
  };

  const onMovieEnd = () => {
    const _secondsInt = secondsPlayed;
    _secondsInt.replace(",", "");
    sendPlayLogs(id, type, _secondsInt);
    if (nextEpisodeId) setShowNextPopup(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchPurchaseHistory(dispatch, 'Active');

        if (premiumSub) {
          fetchMovieVideo(dispatch, id, type);
        } else {
          const validId = !isNaN(+id) && id;
          const trailerData = await fetchTrailer(validId || selectedMovie || JSON.parse(localStorage.getItem('selectedMovie')));
          setTrailer(trailerData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch, id, type, premiumSub, selectedMovie]);

  useEffect(() => {
    let search = location.search;
    let nextEpisodeId = search.substring(6, search.length);
    setNextEpisodeId(nextEpisodeId);

    const initFetchNextEpisodeInfo = async () => {
      let _nextEpisodeInfo = await fetchEpisodeInfo(nextEpisodeId);
      if (_nextEpisodeInfo) setNextEpisodeInfo(_nextEpisodeInfo);
    };

    initFetchNextEpisodeInfo();
  }, [location.search]);

  useEffect(() => {
    if (location.state && location.state.trailer) {
      setTrailer(location.state.trailer);
    }
  }, [location.state]);

  const handleStart = () => {
    setLoading(false); // Video started, so stop showing the loading spinner
    setRetryTime(0); // Reset retry time
  };

  const handleError = (error) => {
    console.error('Error playing video:', error);
    if (retryTime < 5000) { // Retry up to 10 seconds
      setRetryTime(prevTime => prevTime + 1000); // Increment retry time
      setLoading(true);
      setError(null); // Clear any existing error
      
    } else {
      setError('An error occurred while trying to play the video. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="watch-movie">
      <button onClick={() => navigate(-1)} className="sign-up">
        Back
      </button>

      <div className="watch-video">
        {loading && !error && premiumSub && (
          <div className="loading-spinner">
       
            {/* You can use any loading spinner component or image */}
            <Spinner/>
          </div>
        ) }
        {error ? (
          <ConnectionError />
        ) : (
          // (!premiumSub && (location?.state?.trailer === undefined)
          (!premiumSub && (location?.state?.trailer === undefined)) ? (
            <UnsubscribedUser variant={location?.state?.variant} trailer={location?.state?.trailer === undefined}/>):(
            <ReactPlayer
              ref={_ref}
              url={location?.state?.trailer || (location?.state?.variant === "trailer" ?  trailer : video)}
              width="100vw"
              height="90vh"
              muted={false}
              autoPlay={true}
              playing={true}
              volume={1}
              controls={isLiveTv ? false : true}
              onProgress={setProgressInMs}
              onPlay={initUpdateWatchlist}
              onBufferEnd={initUpdateWatchlist}
              onEnded={onMovieEnd}
              onPause={initUpdateWatchlist}
              onSeek={initUpdateWatchlist}
              onStart={handleStart}
              onError={handleError} // Error handling callback
            />
          )
        )}

        {showNextPopup && nextEpisodeInfo.title ? (
          <div className="next-popup-wrapper">
            <div className="next-popup">
              <img
                src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${nextEpisodeInfo.images.POSTER}?accessKey=WkVjNWNscFhORDBLCg==`}
                alt=""
              />
              <div>
                <h3>{nextEpisodeInfo.title}</h3>
                <p>{nextEpisodeInfo.duration} mins</p>
                <br />
                <button onClick={onNextPopupClick}>Play next</button>
              </div>
              <span onClick={() => setShowNextPopup(false)}>
                <h1>&times;</h1>
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Watch;

