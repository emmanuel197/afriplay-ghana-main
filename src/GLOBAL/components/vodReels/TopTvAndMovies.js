import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Slider from "react-slick"
import sliderSettings from "../../../utils/sliderConfig/sliderSettings"
import { fetchMovie } from "../../redux/fetchMoviesApi"
import MovieCard from "../cards/MovieCard"
import SliderWrapper from "../SliderWrapper"


const TopTvAndMovies = () => {
    const dispatch = useDispatch()
    const { afriplaytop10 } = useSelector(state => state.fetchMovies)
    // console.warn('afriplaytop10', afriplaytop10)

    useEffect(() => {
        fetchMovie(dispatch)
    }, [dispatch])


    return (
        <SliderWrapper title='Top TV and Movies'>
            <Slider {...sliderSettings()}>
                {
                    afriplaytop10.map((_movie, index) => {
                        return <MovieCard key={_movie.id + index} movie={_movie} />
                    })
                }
            </Slider>
        </SliderWrapper>
    )
}

export default TopTvAndMovies