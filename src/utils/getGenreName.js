const getGenreName = (genreInfo, genres) => {

    if (!genreInfo) return ''

    let genreName = ''

    genres?.filter(genre => {
        if (genreInfo[0]) {
            if (genreInfo[0] === genre.id) genreName = genre.name
        }
        if (genreInfo === genre.id) genreName = genre.name
    })

    return genreName
}

export default getGenreName