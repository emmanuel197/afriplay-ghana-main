import Header from "../components/Header"
import Footer from "../components/Footer";
import GenreTabs from '../components/home/GenreTabs'
import Reel from "../components/reels/Reel";
import DynamicBanner from "../components/banners/DynamicBanner";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGenres, fetchMovie } from "../redux/fetchMoviesApi";
import { setActiveGenreTab } from "../redux/slice/genreTabSlice";
import GenreMovies from "../components/GenreMovies";

const Movies = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const _setActiveGenreTab = (_genreTab = 'ALL') => dispatch(setActiveGenreTab(_genreTab))
        _setActiveGenreTab('ALL')
        fetchMovie(dispatch)
        fetchGenres(dispatch)
    }, [dispatch])

    return (
        <>
            <main style={{ background: ' #1a052b' }}>
                <Header links={5} signup={1} />
                <DynamicBanner />
                <GenreTabs />
                <GenreMovies />
                <Reel title='TRENDING' />
                <Reel title='RECENTLY ADDED' />
                <Reel title='COMING SOON' />
                <Footer />

                {/* <Reel title='PAY PER VIEW' /> */}
            </main>

        </>
    )
}

export default Movies