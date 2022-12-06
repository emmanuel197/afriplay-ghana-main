import { useEffect } from "react"
import { useDispatch } from "react-redux"
import AfriPremiereBanner from "../components/banners/AfriPremiereBanner"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Reel from "../components/reels/Reel"
import { setActiveGenreTab } from "../redux/slice/genreTabSlice"
import { fetchAgeRatings, fetchGenres, fetchMovie } from "../redux/fetchMoviesApi"

const AfriPremiere = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const _setActiveGenreTab = (_genreTab = 'ALL') => dispatch(setActiveGenreTab(_genreTab))
        _setActiveGenreTab('ALL')
        fetchMovie(dispatch)
        fetchGenres(dispatch)
        fetchAgeRatings(dispatch)
    }, [dispatch])
    return (
        <>
            <Header links={5} />
            <AfriPremiereBanner />
            <br />
            <br />
            <Reel title='MOST WATCHED' />
            <Reel title='RECENTLY ADDED' />
            <Reel title='COMING SOON' />
            <Footer />
        </>
    )
}

export default AfriPremiere