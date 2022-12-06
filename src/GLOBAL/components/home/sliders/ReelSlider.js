import Slider from "react-slick"
import MovieCard from "../../cards/MovieCard"
import SimilarMovieCard from "../../cards/SimilarMovieCard"
import sliderSettings from "../../../../utils/sliderConfig/sliderSettings"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { returnMovieDetails, returnOneSeries } from "../../../redux/fetchMoviesApi"

const ReelSlider = ({ type, filteredMovies = [] }) => {
    const location = useLocation()
    const [premiereMovies, setPremiereMovies] = useState([])
    const [liveMovies, setLiveMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const filterPremiereLive = async () => {

            setLoading(true)

            let _premiereMovies = []
            let _liveMovies = []

            for (let i = 0; i < filteredMovies.length; i++) {

                const _movie = filteredMovies[i];
                let movieInfo

                if (_movie.type === 'series') movieInfo = await returnOneSeries(_movie.id)
                else if (_movie.type === 'movie') movieInfo = await returnMovieDetails(_movie.id)

                const movieType = movieInfo.metadata.movie_type

                if (movieType === 'live') _liveMovies.push(_movie)
                else if (movieType === 'premiere') _premiereMovies.push(_movie)

            }

            setPremiereMovies(_premiereMovies)
            setLiveMovies(_liveMovies)
            setLoading(false)
        }

        filterPremiereLive()

    }, [filteredMovies])

    if (loading) return (<></>)

    if (filteredMovies.length < 1) return <></>

    if (type === 'similar-movies') return (
        <Slider {...sliderSettings()}>
            {filteredMovies.map((movie) => {
                return <SimilarMovieCard key={movie.id} movie={movie} />
            })}
        </Slider>
    )

    if (location.pathname === '/afripremiere' && premiereMovies.length > 0) {
        return (
            <Slider {...sliderSettings()}>
                {premiereMovies.map((movie) => {
                    return <MovieCard key={movie.id} movie={movie} />
                })}
            </Slider>
        )
    }

    if (location.pathname === '/afriplaylive' && liveMovies.length > 0) {
        return (
            <Slider {...sliderSettings()}>
                {liveMovies.map((movie) => {
                    return <MovieCard key={movie.id} movie={movie} />
                })}
            </Slider>
        )
    }

    return (
        <Slider {...sliderSettings()}>
            {filteredMovies.map((movie) => {
                return <MovieCard key={movie.id} movie={movie} />
            })}
        </Slider>
    )
}

export default ReelSlider