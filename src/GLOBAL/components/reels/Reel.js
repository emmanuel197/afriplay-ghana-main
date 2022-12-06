import { useSelector } from 'react-redux';
import ReelGenreWrapper from './ReelGenreWrapper';
import HomeBannerSlider from "../HomeBannerSlider";
import '../../components/styles/landing/slides.scss'

const Reel = ({ title }) => {
    const { recentlyadded, mostwatched, afriPlaylive, afriPremiere, comingSoon, trendingnow, afriplaytop10 } = useSelector((state) => state.fetchMovies);
    const { activeGenreTab } = useSelector(state => state.genreTab)

    const _allMovies = {
        mostwatched,
        recentlyadded,
        comingSoon,
        trendingnow,
        afriplaytop10,
        afriPlaylive,
        afriPremiere,
    }

    if (activeGenreTab === 'ALL') {
        if (title === 'AFRIPREMIERE') return <HomeBannerSlider title='AFRIPREMIERE' />
        if (title === 'AFRIPLAY LIVE') return <HomeBannerSlider title='AFRIPLAY LIVE' />
        if (title === 'RECENTLY ADDED') return <ReelGenreWrapper title='RECENTLY ADDED' allMovies={_allMovies} movies={recentlyadded} />
        if (title === 'COMING SOON') return <ReelGenreWrapper title='COMING SOON' allMovies={_allMovies} movies={comingSoon} />
        if (title === 'TRENDING') return <ReelGenreWrapper title='TRENDING' allMovies={_allMovies} movies={trendingnow} />
        if (title === 'MOST WATCHED') return <ReelGenreWrapper title='MOST WATCHED' allMovies={_allMovies} movies={mostwatched} />
    }

    return <></>
}

export default Reel