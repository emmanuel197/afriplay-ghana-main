import { useEffect, useState } from "react"
import getGenreName from "../../../utils/getGenreName"

const SliderItem = (props) => {
    const { image_id, title, type, onClicked, isSelected, genre_id, allGenres } = props

    if (type === 'afripremiere') return (
        <div
            // style={{width: "100%"}}
            className={isSelected ? 'afripremiere-hero-slider-item active-afripremiere-hero-slider-item' : 'afripremiere-hero-slider-item'}
            onClick={onClicked}>
            <img src={image_id} alt={title} className="afripremiere-hero-slider-item-img" />
            <div className="text-content">
                <div>
                    <p>{genre_id ? getGenreName(genre_id[0], allGenres) : null}</p>
                    <h3>{title}</h3>
                    {/* <small>$7.99</small> */}
                </div>
                <img src='/assets/svg/play.svg' alt='play' />
            </div>
        </div>
    )

    if (type === 'livetv') return (
        <div className='hero-slider-item livetv-hero-slider-item'>
            <img src={image_id} alt={title} />
            <div>
                <p className="primary-text">News</p>
                <h3>FRANCE 24</h3>
                <p className="primary-text">8:00 am  C.A.T</p>
            </div>
        </div>
    )

    return <div
        className={isSelected ? 'hero-slider-item active-hero-slider-item' : 'hero-slider-item'}
        onClick={onClicked}>
        <img src={image_id} alt={title} />
    </div>
}

export default SliderItem