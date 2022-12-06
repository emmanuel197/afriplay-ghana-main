import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { returnMovieDetails } from "../../redux/fetchMoviesApi"
// import "../../components/styles/landing/slides.scss"

const WatchlistMovieCard = ({ movie }) => {
    const [movieDetails, setMovieDetails] = useState({})

    useEffect(() => {
        const _getMovieDetails = async () => {
            const _movieDetails = await returnMovieDetails(movie.movie_id)
            setMovieDetails(_movieDetails)
        }
        _getMovieDetails()
    }, [movie.movie_id])

    // TODO: restyle component and remove style={{}}
    return <div className="watchlist-movie-card">
        <Link to={movieDetails.type === 'series' ? `/series/${movieDetails.id}` : `/movie/${movieDetails.id}`} key={movieDetails.id}>
            <div className="watchlist-movie-content-wrapper">
                <img src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movieDetails.image_store_id}?accessKey=WkVjNWNscFhORDBLCg==`} alt={movieDetails.alt} />
                {/* <div className="poster-div">
                </div> */}
                <div className='card-text'>
                    <p className='name'>{movieDetails.title}</p>
                    <p className='description'>{movieDetails.description}</p>
                </div>
            </div>
        </Link>
    </div>
}

export default WatchlistMovieCard