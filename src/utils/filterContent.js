const returnSeries = (allMovies, type) => {
    if (!allMovies) return []

    let movies;

    if (type === 'series') {
        movies = allMovies.filter(_movie => {
            return _movie.type === 'series'
        })
    }

    if (type === 'movies') {
        movies = allMovies.filter(_movie => {
            return _movie.type === 'movie'
        })
    }

    return movies
}

export default returnSeries