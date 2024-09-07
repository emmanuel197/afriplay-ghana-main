import { useState, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllSeries,
  fetchLandingBanners,
  fetchTrailer,
  returnMovieOrSeriesDetails
} from "../../redux/fetchMoviesApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import Button from "../buttons/Button";
import OutlineButton from "../buttons/OutlineButton";
import dynamicBannerSliderSettings from "../../../utils/sliderConfig/dynamicBannerSliderSettings";
import SliderItem from "./SliderItem";
import getRandomIndexes from "../../../utils/getRandomIndexes";
import "../../components/styles/banners/dynamicBanner.scss";
import BannerBackground from "./BannerBackground";
import { androidImg, appleImg } from "../../../utils/assets";

/* **
 * display a recently added series in banner.picks a series from the recently added category
 */

const fetchDataForBannerSlider = (recentlyAdded) => {
  if (!recentlyAdded?.length) return [];

  const slides = [];
  const seriesSlides = [];
  const indexes = getRandomIndexes(recentlyAdded);

  indexes.forEach((index) => {
    const item = recentlyAdded[index];
    if (!slides.includes(item)) {
      if (item?.type === "series") seriesSlides.push(item);
      else slides.push(item);
    }
  });

  console.warn("seriesSlides", seriesSlides);

  return window.location.pathname === "/series" ? seriesSlides : slides;
};

const DynamicBanner = ({ showSlides = true, className }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [selectedMovie, setSelectedMovie] = useState({});
  const [movieDetails, setMovieDetails] = useState({});
  const [trailer, setTrailer] = useState("");
  const { recentlyadded } = useSelector((state) => state.fetchMovies);
  const movieDetailsFetched = useRef(false);
  const slides = useMemo(() => fetchDataForBannerSlider(recentlyadded), [recentlyadded]);
  const [allSlides, setAllSlides] = useState([]);
  const [isMuted, setIsMuted] = useState(true);
  const [showTitle, setShowTitle] = useState(false);
  const [bannerContent, setBannerContent] = useState([]);
  const [playTrailer, setPlayTrailer] = useState(true);
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(true);
  useEffect(() => {
    if (!movieDetailsFetched.current) {
      const initGetAllSlides = async () => {
        if (location.pathname === "/series") {
          const _allSeries = await fetchAllSeries();
          const randomSeriesIndexes = getRandomIndexes(_allSeries);
          const _allSlides = randomSeriesIndexes.map(index => _allSeries[index]);

          setAllSlides(_allSlides);
          setSelectedMovie(_allSlides[0]);
        } else if (slides.length) {
          setAllSlides(slides);
          setSelectedMovie(slides[0]);
        }
      };

      initGetAllSlides();
    }
  }, [location.pathname, slides]);

  const _setSelectedMovie = (vod) => {
    setSelectedMovie(vod);
    movieDetailsFetched.current = false;
  };

  useEffect(() => {
    const initSetMovieDetails = async () => {
      if (selectedMovie && selectedMovie.id) {
        const _movie = await returnMovieOrSeriesDetails(selectedMovie.id, "movie");
        setMovieDetails(location.pathname === "/" ? selectedMovie : _movie);

        const _trailer = await fetchTrailer(selectedMovie.id);
        setTrailer(_trailer);

        movieDetailsFetched.current = true;
      }
    };

    if (!movieDetailsFetched.current) {
      initSetMovieDetails();
    }
  }, [location.pathname, selectedMovie]);

  useEffect(() => {
    const handleScroll = () => {
      setPlayTrailer(window.scrollY < 350);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      const initFetchBannerContent = async () => {
        const bannerContent = await fetchLandingBanners();
        console.warn(bannerContent);
        setBannerContent(bannerContent);
      };

      initFetchBannerContent();
    }
  }, [location.pathname]);

  return (
    <section>
      <div className={`hero ${className}`} onClick={() => setShowTitle(true)}>
        <div className="hero-container">
          <div className="hero-content-wrapper">
            {showTitle && (
              <div className={`hero-content ${location.pathname === "/" && "landing-content-padding"}`}>
                <h1>{location.pathname === "/" ? bannerContent?.title : movieDetails.title}</h1>
                <p className="lines-max-4">
                  {location.pathname === "/" ? bannerContent?.description : movieDetails.description}
                </p>

                {selectedMovie && (
                  <div className={`hero-buttons ${className}`}>
                    {location.pathname === "/" && (
                      <>
                        <Button
                          page={location.pathname === "/series" ? `/series/${selectedMovie.id}` : `/movie/${selectedMovie.id}`}
                          selectedMovie={selectedMovie.id}
                          label="WATCH MOVIE"
                          className="landing-page-dynamic-btns"
                        />
                        <Button
                          page={location.pathname === "/series" ? `/series/${selectedMovie.id}` : `/watch/movie/${selectedMovie.uid}`}
                          selectedMovie={selectedMovie.id}
                          label="TRAILER"
                          className="landing-page-dynamic-btns"
                        />
                        <Button
                          page={location.pathname === "/series" ? `/series/${selectedMovie.id}` : `/watch/movie/${selectedMovie.uid}`}
                          selectedMovie={selectedMovie.id}
                          label="SHARE"
                          className="landing-page-dynamic-btns"
                        />
                      </>
                    )}

                    {["/series", "/movies", "/home"].includes(location.pathname) && (
                      <>
                        <Button
                          page={location.pathname === "/series" ? `/series/${selectedMovie.id}` : `/watch/movie/${selectedMovie.uid}`}
                          selectedMovie={selectedMovie.id}
                          label="Play"
                        />
                        <OutlineButton
                          page={location.pathname === "/series" ? `/series/${selectedMovie.id}` : `/movie/${selectedMovie.id}`}
                          label="Info"
                        />
                      </>
                    )}

                    <div className="mute-icon">
                      <img
                        onClick={() => setIsMuted(!isMuted)}
                        src={isMuted ? "/assets/svg/muted.svg": "/assets/svg/speaker.svg"  }
                        alt={isMuted ? "speaker icon" : "mute icon"}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {location.pathname === "/" && (
            <div className="hero-app-links-wrapper">
              <div className="hero-app-link">
                <img className="hero-app-link-img" src={androidImg} />
                {/* <Link to="">Google Play</Link> */}
                <a href="https://play.google.com/store/apps/details?id=com.tvanywhereafrica.afriplay" target="_blank" rel="noopener noreferrer">
  Google Play
</a>
              </div>
              <div className="hero-app-link">
                <img className="hero-app-link-img" src={appleImg} />
                
                <a href="https://apps.apple.com/app/afriplay/id1659472397" target="_blank" rel="noopener noreferrer">
                App Store
</a>
              </div>
            </div>
          )}

          {showSlides && (
            <div className="hero-slider-container">
              <Slider {...dynamicBannerSliderSettings} className="hero-slider-main">
                {allSlides.map((movie) => (
                  <SliderItem
                    onClicked={() => _setSelectedMovie(movie)}
                    title={movie?.title}
                    image_id={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${
                      location.pathname === "/series" ? movie.images.POSTER : movie?.image_id
                    }?accessKey=WkVjNWNscFhORDBLCg==`}
                    isSelected={selectedMovie?.id === movie?.id}
                    key={movie?.id}
                  />
                ))}
              </Slider>
            </div>
          )}
        </div>

        <BannerBackground
          muted={isMuted}
          bannerImg={location.pathname === "/" ? bannerContent.banner_image_id : selectedMovie.images?.POSTER || selectedMovie.image_id}
          _trailer={location.pathname === "/" ? bannerContent?.video_url : trailer}
          _onPlayTrailer={isPlayingTrailer}
          _bannerContent={location.pathname === "/" ? bannerContent : selectedMovie}
        />

        {showTitle && <div className="hero-gradient" />}
      </div>
    </section>
  );
};

export default DynamicBanner;
