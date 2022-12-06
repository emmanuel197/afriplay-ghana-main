import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchChannelInfo } from "../../redux/channels"
import getEPGInfo from "../../../utils/getEPGInfo"
import "../../components/styles/landing/slides.scss"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { convertImage, waitForImage } from "../../../utils/compressImages"

const MovieCard = ({ movie, type }) => {
    const location = window.location.pathname
    const [channelInfo, setChannelInfo] = useState({})
    const [EPGInfo, setEPGInfo] = useState({ start: '00:00', end: '00:00', title: '' })
    const [imgSrc, setImgSrc] = useState("")

    // const compressImages = async () => {
    //     const allImages = window.document.getElementsByTagName('img')

    //     for (let i = 0; i < allImages.length; i++) {
    //         const element = allImages[i];
    //         // setImgSrc(await convertImage(element))
    //         // setImgSrc(element.src)
    //         // console.warn("image", await convertImage(element))
    //     }
    // }

    // compressImages()

    // allImages.forEach(element => {
    //     console.warn("image", element)
    // });

    useEffect(() => {
        const initFetchChannelInfo = async () => {
            setChannelInfo(await fetchChannelInfo(movie.id))
        }
        initFetchChannelInfo()
    }, [movie.id])

    useEffect(() => {
        if (location === '/livetv') {
            const initSetDates = async () => setEPGInfo(getEPGInfo(movie.shows))
            initSetDates()
        }
    }, [location, movie.shows])

    const MovieCardComponent = () => {
        return (
            <div className="movie-card">
                <Link to={movie.type === 'series' ? `/series/${movie.id}` : `/movie/${movie.id}`}>
                    <div className="movie-box">
                        <div className="poster-div">
                            <LazyLoadImage
                                src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movie.image_id}?accessKey=WkVjNWNscFhORDBLCg==`}
                                // src={imgSrc}
                                alt={movie.alt}
                                width="100%"
                                placeholder={<div className="poster-img-placeholder"></div>}
                            />
                        </div>
                        {/* <div className='card-text'> */}
                        {/* <p className='name lines-max-1'>{movie.title}</p> */}
                        {/* <p className='price'>{movie.price}</p> */}
                        {/* </div> */}
                    </div>
                </Link >
            </div >
        )
    }

    if (window.location.pathname === '/livetv' && type === 'livetv')
        if (EPGInfo) return (
            <div className="movie-card livetv-movie-card">
                <Link to={`/watch/live/${channelInfo.uid}`}>
                    <div className="movie-box">
                        <div className="poster-div">

                            {
                                channelInfo.image_stores
                                    ? <LazyLoadImage
                                        src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${channelInfo.image_stores[0].id}?accessKey=WkVjNWNscFhORDBLCg==`}
                                        alt={movie.alt}
                                        width="100%"
                                        placeholder={<div className="poster-img-placeholder livetv-poster-img-placeholder"></div>}
                                    /> : <></>
                            }

                        </div>
                        <div className='card-text' style={{ marginTop: '5px' }}>
                            <p className='name lines-max-1'>{EPGInfo.title.replace(/ *\([^)]*\) */g, "")}</p>
                            <p>{EPGInfo.start} - {EPGInfo.end}</p>
                        </div>
                    </div>
                    {/* <br /> */}
                </Link>
            </div>
        )

    if (type === 'search')
        return (
            <div className="movie-card">
                <Link to={movie.type === 'series' ? `/series/${movie.id}` : `/movie/${movie.id}`}>
                    <div className="movie-box">
                        <div className="poster-div">
                            <LazyLoadImage
                                src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movie.image_id}?accessKey=WkVjNWNscFhORDBLCg==`}
                                alt={movie.alt}
                                width="100%"
                                placeholder={<div className="poster-img-placeholder"></div>}
                            />
                        </div>
                        {/* <div className='card-text'> */}
                        {/* <p className='name lines-max-1'>{movie.title}</p> */}
                        {/* <p className='price'>{movie.price}</p> */}
                        {/* </div> */}
                    </div>
                </Link>
            </div>
        )

    if (type === 'genre-movies') return (
        <div className="movie-card">
            <Link to={location === '/series' ? `/series/${movie.id}` : `/movie/${movie.id}`}>
                <div className="movie-box">
                    <div className="poster-div">
                        <LazyLoadImage
                            src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${location === '/series' ? movie.images.POSTER : movie.image_store_id}?accessKey=WkVjNWNscFhORDBLCg==`}
                            alt={movie.alt}
                            width="100%"
                            placeholder={<div className="poster-img-placeholder"></div>}
                        />
                    </div>
                    {/* <div className='card-text'>
                        <p className='name lines-max-1'>{movie.title}</p>
                    </div> */}
                </div>
            </Link>
        </div>
    )

    return <MovieCardComponent />

}

export default MovieCard


// import { useEffect, useState } from "react"
// import { Link } from "react-router-dom"
// import { fetchChannelInfo } from "../../redux/channels"
// import getEPGInfo from "../../../lib/getEPGInfo"
// import "../../components/styles/landing/slides.scss"

// const MovieCard = ({ movie, type }) => {
//     const location = window.location.pathname
//     const [channelInfo, setChannelInfo] = useState({})
//     const [EPGInfo, setEPGInfo] = useState({ start: '00:00', end: '00:00', title: '' })

//     useEffect(() => {
//         const initFetchChannelInfo = async () => {
//             if (location === '/livetv') setChannelInfo(await fetchChannelInfo(movie.id))
//         }
//         initFetchChannelInfo()
//     }, [location, movie.id])

//     useEffect(() => {
//         if (location === '/livetv') {
//             const initSetDates = async () => setEPGInfo(getEPGInfo(movie.shows))
//             initSetDates()
//         }
//     }, [location, movie.shows])

//     const MovieCardComponent = () => {
//         return (
//             <div className="movie-card">
//                 <Link to={movie.type === 'series' ? `/series/${movie.id}` : `/movie/${movie.id}`}>
//                     <div className="movie-box">
//                         <div className="poster-div">
//                             <img width="100%" src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movie.image_id}?accessKey=WkVjNWNscFhORDBLCg==`} alt={movie.alt} />
//                         </div>
//                         {/* <div className='card-text'> */}
//                         {/* <p className='name lines-max-1'>{movie.title}</p> */}
//                         {/* <p className='price'>{movie.price}</p> */}
//                         {/* </div> */}
//                     </div>
//                 </Link >
//             </div >
//         )
//     }

//     // if (channelInfo.image_stores) 
//     // console.log(channelInfo.image_stores[0] || "")

//     if (type === 'livetv')
//         if (EPGInfo && channelInfo && channelInfo.image_stores) return (
//             <div className="movie-card livetv-movie-card">
//                 <Link to={`/watch/live/${channelInfo.uid}`}>
//                     <div className="movie-box">
//                         <div className="poster-div">
//                             <img width="100%" src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${channelInfo.image_stores[0].id}?accessKey=WkVjNWNscFhORDBLCg==`} alt={movie.alt} />
//                         </div>
//                         <div className='card-text'>
//                             <p className='name lines-max-1'>{EPGInfo.title.replace(/ *\([^)]*\) */g, "")}</p>
//                             <p>{EPGInfo.start} - {EPGInfo.end}</p>
//                         </div>
//                     </div>
//                     {/* <br /> */}
//                 </Link>
//             </div>
//         )

//     if (type === 'search')
//         return (
//             <div className="movie-card">
//                 <Link to={movie.type === 'series' ? `/series/${movie.id}` : `/movie/${movie.id}`}>
//                     <div className="movie-box">
//                         <div className="poster-div">
//                             <img width="100%" src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${movie.image_id}?accessKey=WkVjNWNscFhORDBLCg==`} alt={movie.alt} />
//                         </div>
//                         {/* <div className='card-text'> */}
//                         {/* <p className='name lines-max-1'>{movie.title}</p> */}
//                         {/* <p className='price'>{movie.price}</p> */}
//                         {/* </div> */}
//                     </div>
//                 </Link>
//             </div>
//         )

//     if (type === 'genre-movies') return (
//         <div className="movie-card">
//             <Link to={location === '/series' ? `/series/${movie.id}` : `/movie/${movie.id}`}>
//                 <div className="movie-box">
//                     <div className="poster-div">
//                         <img width="100%" src={`https://ott.tvanywhereafrica.com:28182/api/client/v1/global/images/${location === '/series' ? movie.images.POSTER : movie.image_store_id}?accessKey=WkVjNWNscFhORDBLCg==`} alt={movie.alt} />
//                     </div>
//                     {/* <div className='card-text'>
//                         <p className='name lines-max-1'>{movie.title}</p>
//                     </div> */}
//                 </div>
//             </Link>
//         </div>
//     )

//     return <MovieCardComponent />

// }

// export default MovieCard