// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import AfriPremiereBanner from "../components/banners/AfriPremiereBanner";
// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import Reel from "../components/reels/Reel";
// import { setActiveGenreTab } from "../redux/slice/genreTabSlice";
// import {
//   fetchAgeRatings,
//   fetchAllMovies,
//   fetchGenres,
//   fetchMovie
// } from "../redux/fetchMoviesApi";
// // import GenreMovies from "../components/GenreMovies";
// import {removeWatchlist, updateWatchlist} from "../../GLOBAL/redux/fetchMoviesApi";
// const AfriPremiereMovie = ({ filteredMovies }) => {
//     const [watchlisted, setWatchlisted] = useState(false);
//     const toggleAddToWatchlist = (_action, movieDetails) => {
//         setWatchlisted(!watchlisted);
//         if (_action === 'add') updateWatchlist(movieDetails.id, 'movie', 0);
//         if (_action === 'remove') removeWatchlist(movieDetails.id, 'movie');
//       };
      
//   return (
//     <div>
//       <ul>
//         {filteredMovies.length > 0 ? (
//           filteredMovies.map((movie) => (
//             <li key={movie.id}>
//               <img
//                 src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movie.image_store_id}?accessKey=WkVjNWNscFhORDBLCg==`}
//                 alt={movie?.title}
//                 className="dynamic-landing-banner"
//                 width="100%"
//                 height="100%"
//               />
//               <h2>{movie.title}</h2>
//               <p>{movie.description}</p>
//               <div>
//                 <p>Starring:</p>
//                 <p>{movie.cast}</p>
//               </div>
//             </li>
//           ))
//         ) : (
//           <p>No movies found</p>
//         )}
//       </ul>
//     </div>
//   );
// };
// const AfriPremiere = () => {
//   // const dispatch = useDispatch()
  
//   const [afriPremiereMovies, setAfriPremiereMovies] = useState({});
//   useEffect(() => {
//     // Define an async function inside useEffect
//     const fetchMovies = async () => {
//       try {
//         // Fetch movie data asynchronously
//         const fetchedMovies = await fetchAllMovies();

//         // Filter the movies after fetching
//         const filtered = fetchedMovies.filter(
//           (movie) => movie?.metadata?.movie_type === "premiere"
//         );
//         console.log(filtered);
//         setAfriPremiereMovies(filtered);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       }
//     };

//     // Call the async function
//     fetchMovies();
//   }, []); // Empty dependency array to run this effect only once
//   return (
//     <>
//       <Header links={5} />
//       <AfriPremiereMovie filteredMovies={afriPremiereMovies} />
//       {/* <AfriPremiereBanner /> */}
//       {/* <GenreMovies/> */}
//       <br />
//       <br />
//       {/* {/* <Reel title='MOST WATCHED' /> */}
//       {/* <Reel title='RECENTLY ADDED' /> */}
//       {/* <Reel title='COMING SOON' /> */}
//       <Footer />
//     </>
//   );
// };

// export default AfriPremiere;

// // useEffect(() => {
// //     const _setActiveGenreTab = (_genreTab = 'ALL') => dispatch(setActiveGenreTab(_genreTab))
// //     _setActiveGenreTab('ALL')
// //     fetchMovie(dispatch)
// //     fetchGenres(dispatch)
// //     fetchAgeRatings(dispatch)
// // }, [dispatch])
import { useEffect, useState } from "react";
import AfriPremiereBanner from "../components/banners/AfriPremiereBanner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Reel from "../components/reels/Reel";
import { fetchAllMovies } from "../redux/fetchMoviesApi";
import { removeWatchlist, updateWatchlist } from "../../GLOBAL/redux/fetchMoviesApi";

const AfriPremiereMovie = ({ filteredMovies, isLoading }) => {
  const [watchlisted, setWatchlisted] = useState(false);

  const toggleAddToWatchlist = (_action, movieDetails) => {
    setWatchlisted(!watchlisted);
    if (_action === 'add') updateWatchlist(movieDetails.id, 'movie', 0);
    if (_action === 'remove') removeWatchlist(movieDetails.id, 'movie');
  };

  // Show a loading message while movies are being fetched
  if (isLoading) {
    return <p>Loading movies...</p>;
  }

  // Show "No movies found" message only when loading is done and no movies exist
  if (filteredMovies.length === 0) {
    return <p>No movies found</p>;
  }

  return (
    <div>
      <ul>
        {filteredMovies.map((movie) => (
          <li key={movie.id}>
            <img
              src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movie.image_store_id}?accessKey=WkVjNWNscFhORDBLCg==`}
              alt={movie?.title}
              className="dynamic-landing-banner"
              width="100%"
              height="100%"
            />
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <div>
              <p>Starring:</p>
              <p>{movie.cast}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AfriPremiere = () => {
  const [afriPremiereMovies, setAfriPremiereMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch movie data asynchronously
        const fetchedMovies = await fetchAllMovies();

        // Filter the movies after fetching
        const filtered = fetchedMovies.filter(
          (movie) => movie?.metadata?.movie_type === "premiere"
        );

        setAfriPremiereMovies(filtered);
      } catch (err) {
        setError("Error fetching movies. Please try again later.");
      } finally {
        setIsLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchMovies();
  }, []);

  // If an error occurs, show an error message
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Header links={5} />
      <AfriPremiereMovie filteredMovies={afriPremiereMovies} isLoading={isLoading} />
      {/* <AfriPremiereBanner /> */}
      <br />
      <br />
      {/* <Reel title='MOST WATCHED' /> */}
      <Reel title='RECENTLY ADDED' />
      {/* <Reel title='COMING SOON' /> */}
      <Footer />
    </>
  );
};

export default AfriPremiere;
