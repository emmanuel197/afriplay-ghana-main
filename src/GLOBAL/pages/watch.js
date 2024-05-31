import { createRef, useEffect, useState } from "react";
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
  };

  const initSendPlayLogs = async (x) => {
    //* check if playtime is 60seconds (value is a multiple of 60)
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
    // alert('movie ended')
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch purchase history
        await fetchPurchaseHistory(dispatch, 'Active');
  
        // Now premiumSub will have the correct value
        if (premiumSub) {
          // Fetch video
          fetchMovieVideo(dispatch, id, type);
          
        } else {
          // console.log(typeof(JSON.parse(id)))
          // Fetch trailer
          const validId = !isNaN(+id) && id
          const trailerData = await fetchTrailer(validId || selectedMovie || JSON.parse(localStorage.getItem('selectedMovie')));
          // const trailerData = await fetchTrailer(type === "series" || "live" ? id : selectedMovie.id || JSON.parse(localStorage.getItem('selectedMovie')).id);
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

  // useEffect(() => {
  //   const initGetLengthWatched = async () => {
  //     const _lengthWatched = await getLengthWatched(id, 'movie')
  //     const lengthWatchedInFraction = (_lengthWatched / 100).toFixed(100) / 10
  //     seek(lengthWatchedInFraction)
  //   }
  //   initGetLengthWatched()
  // }, [id])

  // const seek = (_fraction) => {
  //   _ref.current.seekTo(_fraction, 'fraction')
  // }

  // if(loading)return <Loader />
  return (
    <div className="watch-movie">
      <button onClick={() => navigate(-1)} className="sign-up">
        Back
      </button>
      <div className="watch-video">
        <ReactPlayer
          ref={_ref}
          url={premiumSub ? video : trailer}
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
          onStart={initUpdateWatchlist}
        />

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
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Watch;
