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
        
        fetchGenres(dispatch)
    }, [dispatch])

    useEffect(() => {
        fetchMovie(dispatch)
    }, [dispatch])

    return (
        <>
            <main style={{ background: ' #1a052b' }}>
                <Header links={5} signup={1} />
                <DynamicBanner />
                <GenreTabs />
                <GenreMovies />
                <Reel title='MTN RECOMMENDS'/>
                <Reel title='DOUBLE DRAMA'/>
                <Reel title='TOP EPIC MOVIES'/>
                <Reel title='EXCITING'/>
                <Reel title='HIDDEN GEMS'/>
                <Reel title='VIEWERS FAVOURITES'/>
                <Reel title='RANDOM PICKS'/>
                <Reel title='TRENDING ON AFRIPLAY' />
                <Reel title='CURRENT/LATEST ON AFRIPLAY' />
                <Reel title='BINGE WORTHY' />
                <Reel title='NOSTALGIA' />
                <Reel title='ROMCOM' />
                <Reel title='OMG' />
                <Reel title='SUGGESTED MOVIES FOR YOU' />
                <Reel title='READY SET POPCORN' />
                {/* <Reel title='COMING SOON' /> */}
                <Reel title='WATCH AGAIN'/>

                <Footer />

                {/* <Reel title='PAY PER VIEW' /> */}
            </main>

        </>
    )
}

export default Movies