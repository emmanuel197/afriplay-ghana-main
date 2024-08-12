import { useSelector } from 'react-redux';
import ReelGenreWrapper from './ReelGenreWrapper';
import HomeBannerSlider from "../HomeBannerSlider";
import '../../components/styles/landing/slides.scss'

const Reel = ({ title }) => {
    const { recentlyadded, mostwatched, afriPlaylive, afriPremiere, comingSoon, bingeworthy, trending, afriplaytop10 } = useSelector((state) => state.fetchMovies);
    const { activeGenreTab } = useSelector(state => state.genreTab)
    // console.log(bingeworthy)
    const _allMovies = {
        mostwatched,
        recentlyadded,
        comingSoon,
        trending,
        afriplaytop10,
        afriPlaylive,
        afriPremiere,
    }

    if (activeGenreTab === 'ALL') {
        if (title === 'AFRIPREMIERE') return <HomeBannerSlider title='AFRIPREMIERE' />
        if (title === 'AFRIPLAY LIVE') return <HomeBannerSlider title='AFRIPLAY LIVE' />
        if (title === 'RECENTLY ADDED' && recentlyadded?.length > 0) return <ReelGenreWrapper title='RECENTLY ADDED' allMovies={_allMovies} movies={recentlyadded} />
        if (title === 'COMING SOON' && comingSoon?.length > 0) return <ReelGenreWrapper title='COMING SOON' allMovies={_allMovies} movies={comingSoon} />
        if (title === 'BINGE WORTHY' && bingeworthy?.length > 0) return <ReelGenreWrapper title='BINGE WORTHY' allMovies={_allMovies} movies={bingeworthy} />
        if (title === 'TRENDING' && trending?.length > 0) return <ReelGenreWrapper title='TRENDING' allMovies={_allMovies} movies={trending} />
        // if (title === 'MOST WATCHED' && mostwatched.length > 0) return <ReelGenreWrapper title='MOST WATCHED' allMovies={_allMovies} movies={mostwatched} />
    }

    return <></>
}

export default Reel