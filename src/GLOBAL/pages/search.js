import { useDispatch, useSelector } from "react-redux"
import Slider from "react-slick"
import sliderSettings from "../../utils/sliderConfig/sliderSettings"
import MovieCard from "../components/cards/MovieCard"
import Header from "../components/Header"
import TopTvAndMovies from "../components/vodReels/TopTvAndMovies"
import SliderWrapper from "../components/SliderWrapper"
import '../components/styles/search.scss'

const Search = () => {
    const { searchQuery, searchResponse } = useSelector(state => state.input)
    // const { afriplaytop10 } = useSelector(state => state.fetchMovie)

    // console.warn('afriplaytop10', afriplaytop10)

    return (
        <div>
            <Header links={5} />
            <div className="search-main">
                <div className="movie-cards-grid">
                    {
                        searchResponse.map(_movie => {
                            return <MovieCard type='search' movie={_movie} key={_movie.id} />
                        })
                    }

                </div>
                {
                    searchResponse.length < 1 && searchQuery !== '' ? <div>
                        <p className="primary-text no-results-text">We didn't find any matches for "{searchQuery}".  Browse our most popular TV shows and movies.</p>
                        <TopTvAndMovies />
                    </div> : <></>
                }
                {
                    searchQuery === '' ? <div>
                        <TopTvAndMovies />
                    </div> : <></>
                }
            </div>
        </div>
    )
}

export default Search