const getMovieFromPackages = (packageMovies, movieDetails) => {
    if (!movieDetails || !packageMovies) return { packageMovies }
    let movie

    for (let i = 0; i < packageMovies.length; i++) {
        const element = packageMovies[i];
        if (element.id === movieDetails.packages[0].id) movie = element
    }

    return movie
}

export default getMovieFromPackages