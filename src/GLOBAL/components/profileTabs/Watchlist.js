import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchWatchlist, } from "../../redux/fetchMoviesApi"
import WatchlistMovieCard from "../cards/WatchlistMovieCard"

const Watchlist = ({ active }) => {
    const dispatch = useDispatch()
    const { watchlist } = useSelector(state => state.fetchMovies)

    useEffect(() => {
        fetchWatchlist(dispatch)
    }, [dispatch])

    if (active === 'watchlist') return (
        <div className="watchlist">
            {watchlist.map(_movie => {
                return <WatchlistMovieCard key={_movie.id} movie={_movie} />
            })}
        </div>
    )
    return <></>
}

export default Watchlist