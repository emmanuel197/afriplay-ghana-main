import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import filterContent from "../../../lib/filterContent";
import { returnMovieOrSeriesDetails } from "../../redux/fetchMoviesApi";
import ReelSlider from "../home/sliders/ReelSlider";
import SliderWrapper from "../SliderWrapper";

// this component filters categories from genres received by parent components
// get category like afripremier, afriplay live... from genre [drama, action, ...] by matching category array item based on category ID


/**
 * filter out 'recentlyAdded' movies [7018] from all movies in a active selected genre
 * this component takes recently added movies, and renders it. No matter the genre.
 */

// const _filterSeries = (_movies_) => {
//     if (!_movies_) return
//     filterContent(_movies_)
// }
//! filter out paid movies that are not free, push to an array and check if the reel is pay-per-view, then render

const ReelWrapper = (props) => {
    const location = useLocation()
    const { movies, type, title } = props
    const { packageNameToId } = useSelector(state => state.fetchMovies)
    const { activeGenreTab } = useSelector(state => state.genreTab)
    // const [categoryId, setCategoryId] = useState(0)
    const [series, setSeries] = useState([])
    const [filteredMoviesOnly, setFilteredMoviesOnly] = useState([])
    // const filteredSeries = useMemo(() => _filterSeries(movies), [movies])
    const [genreSeries, setGenreSeries] = useState([])

    // console.warn('activeGenreTab', activeGenreTab)




    const [moviesOnly, setMoviesOnly] = useState([])
    const [seriesOnly, setSeriesOnly] = useState([])
    const [activeGenreId, setActiveGenreId] = useState(0)


    //* set the active genre ID

    useEffect(() => {
        const getCategoryId = () => {
            const categoryName = activeGenreTab.toLowerCase().replace(/\s/g, '')
            setActiveGenreId(packageNameToId[categoryName])
            // setCategoryId(packageNameToId[categoryName])
            // console.warn('active genre: ', categoryName, activeGenreTab, packageNameToId, packageNameToId[categoryName])
        }
        getCategoryId()
    }, [activeGenreTab, packageNameToId])

    /* **
     * if active  genre tab is all, display all movies
     * on genre tab select, filter movies by the active genre id, and display
     */

    //* filter out all movies and all series :activeGenreTab [ALL]

    useEffect(() => {
        const filterVOD = () => {
            console.warn('filterVOD')

            let _series = []
            let _movies = []

            movies.forEach(vod => {
                if (vod.type === 'series') {
                    _series = [..._series, vod]
                    return
                }

                if (vod.type === 'movie') {
                    _movies = [..._movies, vod]
                    return
                }
            })

            setSeriesOnly(_series)
            setMoviesOnly(_movies)

            _filterSeries()
        }

        filterVOD()

    }, [movies])


    const _filterSeries = async () => {

        console.warn('movies', movies)

        // for (let i = 0; i < seriesOnly.length; i++) {
        //     let vodInfo = {}
        //     let vod = seriesOnly[i];
        //     vodInfo = await returnMovieOrSeriesDetails(vod.id, 'series')
        //     console.warn('filtering series', vodInfo.categories)
        // }
    }

    // useEffect(() => {





    //     const filterVODGenre = async () => {
    //         // let _series = []
    //         // let _movies = []



    //         if (window.location.pathname === '/series') {


    //             // _filterSeries()


    //             // seriesOnly.forEach((vod) => {
    //             //     // let vodInfo = {}
    //             //     console.warn('filtering series', vod)
    //             //     // console.warn('vodInfo', returnMovieOrSeriesDetails(vod.id, 'series'))
    //             // })
    //         }

    //     }

    //     filterVODGenre()

    // }, [activeGenreId, seriesOnly])

    // console.warn('seriesOnly', seriesOnly.length)

    // const filteredMovies = movies.filter(_movie => {
    //     return _movie.id === activeGenreId
    // })

    // const _filteredSeries = movies.filter(_movie => {
    //     return _movie.id === activeGenreId
    // })

    // useEffect(() => {
    //     if (_filteredSeries.length > 0) {
    //         const _genreSeries = _filteredSeries[0].content.filter(_movie => {
    //             return _movie.type === 'series'
    //         })

    //         setGenreSeries(_genreSeries)
    //     }
    // }, [_filteredSeries])

    // useEffect(() => {
    //     // console.warn('series ->', _filteredSeries)
    //     console.warn('categoryId ->', categoryId)
    // }, [categoryId])

    // useEffect(() => {
    //     console.warn('series ->', _filteredSeries)
    //     console.warn('categoryId ->', categoryId)
    // }, [])

    // useEffect(() => {
    //     setSeries(filterContent(movies, 'series'))
    //     setMoviesOnly(filterContent(movies, 'movies'))
    // }, [movies])

    // if (type === 'ALL') return (
    //     <SliderWrapper title={title}>
    //         <ReelSlider filteredMovies={seriesOnly} />
    //     </SliderWrapper>
    // )

    // if (filteredMovies.length < 1) return <></>



    if (type === 'ALL')
        return (
            <SliderWrapper title={title}>
                <ReelSlider filteredMovies={window.location.pathname === '/series' ? seriesOnly : moviesOnly} />
            </SliderWrapper>
        )

    // return <></>
}

export default ReelWrapper