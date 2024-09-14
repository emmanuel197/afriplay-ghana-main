import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMovies, fetchAllSeries, fetchMovieByGenre } from "../redux/fetchMoviesApi";
import MovieCard from "./cards/MovieCard";
import '../components/styles/grid.scss'

const GenreMovies = () => {
    const dispatch = useDispatch()
    const { genres, movies } = useSelector(state => state.fetchMovies)
    const { activeGenreTab } = useSelector(state => state.genreTab)
    const [activeGenreId, setActiveGenreId] = useState(0)
    const [moviesOnly, setMoviesOnly] = useState([])
    const [seriesOnly, setSeriesOnly] = useState([])
    const [genreMovies, setGenreMovies] = useState([])
    console.log(moviesOnly)
    console.log(activeGenreId)
    useEffect(() => {
        // console.log("activeGenreTab", activeGenreTab)
        fetchMovieByGenre(activeGenreTab, dispatch)
    }, [activeGenreTab, dispatch])

    useEffect(() => {
        const getCategoryId = () => {
            let _activeGenreId = genres?.filter(genre => genre.uid === activeGenreTab.toLowerCase())
            if (_activeGenreId?.length > 0)
                setActiveGenreId(_activeGenreId[0].id)
            else setActiveGenreId(0)
        }
        getCategoryId()
    }, [activeGenreTab, genres])

    useEffect(() => {
        const init = async () => {
            if (window.location.pathname === '/series') {
                setSeriesOnly(await fetchAllSeries())
            } else {
                setMoviesOnly(await fetchAllMovies())
            }
        }

        init()
    }, [movies])

    useEffect(() => {
        const initFetchMovies = async () => {
            let location = window.location.pathname
            let _genreMovies = []
            let VODArray

            if (location === '/series') VODArray = seriesOnly
            else VODArray = moviesOnly

            for (let i = 0; i < VODArray.length; i++) {
                const vod = VODArray[i]
                if (vod.genres.includes(activeGenreId)) _genreMovies.push(VODArray[i])
            }

            setGenreMovies(_genreMovies)
        }

        initFetchMovies()
    }, [activeGenreId, moviesOnly, seriesOnly])

    if (activeGenreTab !== 'ALL') return (
        <div className="movie-cards-grid">
            {
                genreMovies.map(_movie => {
                    return <MovieCard type='genre-movies' movie={_movie} key={_movie.id} />
                })
            }
        </div>)
}

export default GenreMovies