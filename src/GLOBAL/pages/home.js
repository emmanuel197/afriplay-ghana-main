import Header from "../components/Header"
import Footer from "../components/Footer";
import GenreTabs from '../components/home/GenreTabs'
import Reel from "../components/reels/Reel";
import DynamicBanner from "../components/banners/DynamicBanner";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGenres, fetchMovie } from "../redux/fetchMoviesApi";
import { setActiveGenreTab } from "../redux/slice/genreTabSlice";

const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const _setActiveGenreTab = (_genreTab = 'ALL') => dispatch(setActiveGenreTab(_genreTab))
        _setActiveGenreTab('ALL')
        
        fetchGenres(dispatch)
    }, [dispatch])

    useEffect(() => {
        fetchMovie(dispatch)
    }, [])

    return (
        <>
            <main style={{ background: ' #1a052b' }}>
                <Header links={5} signup={1} />
                <DynamicBanner showSlides={false} className="feature-dynamic-banner"/>
                <br /><br />
                {/* <Reel title='MOST WATCHED' /> */}
                <Reel title='TRENDING' />
                <Reel title='RECENTLY ADDED' />
                <Reel title='BINGE WORTHY' />
                <Reel title='NOSTALGIA' />
                <Reel title='ROMCOM' />
                <Reel title='OMG' />
                <Reel title='SUGGESTED MOVIES FOR YOU' />
                <Reel title='READY SET POPCORN' />
                {/* <Reel title='AFRIPREMIERE' /> */}
                {/* <Reel title='COMING SOON' /> */}
                {/* <Reel title='AFRIPLAY LIVE' /> */}
                {/* <Reel title=''/> */}
                {/* <Reel title='MOST WATCHED' />
                <Reel title='RECENTLY ADDED' />
                <Reel title='AFRIPREMIERE' />
                <Reel title='COMING SOON' />
                <Reel title='AFRIPLAY LIVE' /> */}
                <Footer />

                {/* <Reel title='PAY PER VIEW' /> */}
            </main>

        </>
    )
}

export default Home

// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { setActiveGenreTab } from "../redux/features/genreTabSlice";
// import Header from "../components/Header"
// import Footer from "../components/Footer";
// import Reel from "../components/reels/Reel";
// import DynamicBanner from "../components/banners/DynamicBanner";
// import { fetchMovie } from "../redux/fetchMoviesApi";

// const Home = () => {
//     const dispatch = useDispatch()

//     useEffect(() => {
//         const _setActiveGenreTab = (_genreTab = 'ALL') => dispatch(setActiveGenreTab(_genreTab))
//         _setActiveGenreTab('ALL')
//         fetchMovie(dispatch)
//     }, [dispatch])

//     return (
//         <>
//             <main style={{ background: ' #1a052b' }}>
//                 <Header links={5} signup={1} />
//                 <DynamicBanner showSlides={false} />
//                 <br />
//                 <br />
                // <Reel title='MOST WATCHED' />
                // <Reel title='RECENTLY ADDED' />
                // <Reel title='AFRIPREMIERE' />
                // <Reel title='COMING SOON' />
                // <Reel title='AFRIPLAY LIVE' />
//                 <Footer />
//             </main>

//         </>
//     )
// }

// export default Home