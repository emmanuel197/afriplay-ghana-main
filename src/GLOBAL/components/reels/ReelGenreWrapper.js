import { useState, useEffect } from "react"
import ReelSlider from "../home/sliders/ReelSlider"
import SliderWrapper from "../SliderWrapper"

const ReelGenreWrapper = ({ allMovies, movies, title }) => {
    const [loading, setLoading] = useState(true)
    const [moviesOnly, setMoviesOnly] = useState([])
    const [seriesOnly, setSeriesOnly] = useState([])

    useEffect(() => {
        const filterVOD = () => {
            setLoading(true)

            let _series = []
            let _movies = []

            movies.forEach(vod => {
                if (vod.type === 'series') {
                    _series = [..._series, vod]
                    return
                } if (vod.type === 'movie') {
                    _movies = [..._movies, vod]
                    return
                }
            })

            setSeriesOnly(_series)
            setMoviesOnly(_movies)
            setLoading(false)
        }

        if (movies && movies.length > 0) filterVOD()

    }, [movies])

    return (
        <SliderWrapper title={title}>
            <ReelSlider filteredMovies={window.location.pathname === '/series' ? seriesOnly : moviesOnly} />
        </SliderWrapper>
    )

}

export default ReelGenreWrapper