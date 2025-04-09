const shareMovie = async (movieDetails) => {
    const shareData = {
        title: `Afriplay | ${movieDetails.title}`,
        text: movieDetails.description,
        url: window.location.href
    }

    await navigator.share(shareData);
}

export default shareMovie