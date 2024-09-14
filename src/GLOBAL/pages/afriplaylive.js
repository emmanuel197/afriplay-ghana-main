
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setActiveGenreTab } from "../redux/slice/genreTabSlice"
import { fetchAgeRatings, fetchGenres, fetchMovie } from "../redux/fetchMoviesApi"
import AfriplayLiveBanner from "../components/banners/AfriplayLiveBanner"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Reel from "../components/reels/Reel"
import GenreMovies from "../components/GenreMovies";
const AfriplayLive = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const _setActiveGenreTab = (_genreTab = 'UPCOMING') => dispatch(setActiveGenreTab(_genreTab))
        _setActiveGenreTab('UPCOMING')
        fetchMovie(dispatch)
        fetchGenres(dispatch)
        fetchAgeRatings(dispatch)
    }, [dispatch])
    return (
        <>
            <Header links={5} />
            <AfriplayLiveBanner className="feature-dynamic-banner"/>
            <GenreMovies/>
            <br />
            <br />
            {/* {/* <Reel title='TRENDING' /> */}
            <Reel title='RECENTLY ADDED' />
            <Reel title='COMING SOON' /> 
            <Footer />
        </>
    )
}

export default AfriplayLive