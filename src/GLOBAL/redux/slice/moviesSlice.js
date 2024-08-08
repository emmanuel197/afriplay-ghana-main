import { createSlice } from "@reduxjs/toolkit";

const fetchMovieSlice = createSlice({
  name: "fetchMovie",
  initialState: {
    movies: [],
    drama: [],
    action: [],
    family: [],
    // romance: [],
    recentlyadded: [],
    similarMovies: [],
    allSeries: [],
    // adventure: [],
    nameToId: {},
    category: [],
    movieDetails: [],
    packageNameToId: {},
    packageMovies: {},
    seriesInfo: {},
    moviesByCategories: [],
    selectedMovie: [],
    error: false,
    loading: false,
    // loadingCategories: false,
    // loadingOneSeries: true,
    genreCategories: {},
    dramaCategory: [],
    actionCategory: [],
    comedyCategory: [],
    afriPremiereexclusive: [],
    familyCategory: [],
    dynamicBannerTrailer: '',
    watchlist: [],
    channelCategories: [],

    loaders: {
      category: true,
      series: true,
      movies: true,
      movieVideo: true,
      seriesVideo: true,
      moreLikeThis: true,
      genreMovies: true,
      movieDetails: true,
      dynamicBanner: true,
    },

    comingSoon: [],
    trending: [],
    bingeworthy: [],
    afriplaytop10: [],
    afriPlaylive: [],
    afriPremiere: [],
    ageRatings: [],


    genres: [],
  },

  reducers: {
    fetchAllSeriesReducer: (state, action) => {
      state.allSeries = action.payload
    },
    fetchChannelCategoriesReducer: (state, action) => {
      state.channelCategories = action.payload
    },
    fetchAgeRatingsReducer: (state, action) => {
      state.ageRatings = action.payload
    },
    fetchSimilarMoviesReducer: (state, action) => {
      state.similarMovies = action.payload
    },
    fetchWatchlistReducer: (state, action) => {
      state.watchlist = action.payload
    },
    fetchGenresReducer: (state, action) => {
      state.genres = action.payload
    },
    fetchOneSeriesReducer: (state, action) => {
      state.seriesInfo = action.payload
      state.loaders.series = false
      // state.loadingOneSeries = true
      // state.loadingOneSeries = false
    },
    fetchBannerTrailer: (state, action) => {
      state.dynamicBannerTrailer = action.payload

    },
    fetchPackageMoviesReducer: (state, action) => {
      state.packageMovies = action.payload

    },
    fetchMoviesByCategory: (state, action) => {
      switch (action.payload.category) {
        case 'DRAMA':
          state.dramaCategory = action.payload.movies
          return;
        case 'ACTION':
          state.actionCategory = action.payload.movies
          return;
        case 'COMEDY':
          state.comedyCategory = action.payload.movies
          return;
        case 'FAMILY':
          state.familyCategory = action.payload.movies
          return;
        case 'ALL':
          // Do something
          return;
        default:
          break;
      }
      state.loaders.category = false
    },
    setGenreCategories: (state, action) => {
      state.genreCategories = action.payload
    },
    fetchMovies_begin: (state) => {
      // state.loading = true;
      // state.error = false;
    },
    fetchMovies_success: (state, action) => {
      // state.loading = true
      // console.log(action.payload.bingeworthy)
      const trending = action.payload.trending[0]["content"] || action.payload.trending
      const recentlyadded =action.payload.recentlyadded[0]["content"] || action.payload.recentlyadded
      const bingeworthy = action.payload.bingeworthy && action.payload.bingeworthy[0]["content"] || action.payload.bingeworthy
      state.movies = action.payload.movies?.length > 0 ? action.payload.movies : []
      // state.afriPremiereexclusive = action.payload.afriPremiereexclusive.length > 0 ? action.payload.afriPremiereexclusive : []
      state.mostwatched = action.payload.mostwatched?.length > 0 ? action.payload.mostwatched[0]["content"] : []
      state.comingSoon = action.payload.comingSoon?.length > 0 ? action.payload.comingSoon[0]["content"] : []
      state.bingeworthy = action.payload.bingeworthy?.length > 0 ? bingeworthy : []
      state.trending = action.payload.trending.length > 0 ? trending : []
      state.afriplaytop10 = action.payload.afriplaytop10?.length > 0 ? action.payload.afriplaytop10[0]["content"] : []
      state.recentlyadded = action.payload.recentlyadded.length > 0 ? recentlyadded : []
      state.afriPlaylive = action.payload.afriPlaylive?.length > 0 ? action.payload.afriPlaylive[0]["content"] : []
      state.afriPremiere = action.payload.afriPremiere?.length > 0 ? action.payload.afriPremiere[0]["content"] : []

      state.nameToId = action.payload.packageNameToId
      state.moviesByCategories = action.payload.moviesByCategories
      state.packageNameToId = action.payload.packageNameToId

      state.loaders.movies = false
      // state.loading = false;
    },
    fetchMovies_error: (state) => {
      // state.loading = false;
      // state.error = true;
    },
    fetchCategory_begin: (state) => {
      // state.loading = true;
      // state.error = false;
    },
    fetchCategory_success: (state, action) => {
      state.nameToId = action.payload.packageNameToId;
      state.packageNameToId = action.payload.packageNameToId
      state.category = action.payload.category[0]["content"];
      state.loaders.category = false
      // state.loading = false;
    },
    fetchCategory_error: (state) => {
      // state.loading = false;
      // state.error = true;
    },
    fetchMovieDetails_begin: (state) => {
      // state.loading = true;
      // state.error = false;
    },
    fetchMovieDetails_success: (state, action) => {
      state.movieDetails = action.payload;
      state.loaders.movieDetails = false
      // state.loading = false;
    },
    fetchMovieDetails_error: (state) => {
      // state.loading = false;
      // state.error = true;
    },
    fetchMovieVideo_success: (state, action) => {
      // state.loading = true;
      // state.error = false;
      state.video = action.payload.url
      state.loaders.movieVideo = true
    },
    fetchMovieVideo_error: (state, action) => {
      // state.loading = false;
      // state.error = true;
    },
    selectedMovieReducer: (state, action) => {
      state.selectedMovie = action.payload;
      localStorage.setItem('selectedMovie', JSON.stringify(action.payload));
      // state.error = true;
    },
  }
});

export default fetchMovieSlice.reducer;
export const {
  fetchMovies_begin,
  fetchMovies_success,
  fetchMovies_error,
  fetchCategory_begin,
  fetchCategory_success,
  fetchCategory_error,
  fetchMovieDetails_begin,
  fetchMovieDetails_success,
  fetchMovieDetails_error,
  fetchMovieVideo_success,
  fetchMovieVideo_error,
  fetchMoviesByCategory,
  setGenreCategories,
  fetchBannerTrailer,
  fetchPackageMoviesReducer,
  fetchSimilarMoviesReducer,
  fetchOneSeriesReducer,
  fetchWatchlistReducer,
  fetchGenresReducer,
  fetchChannelsReducer,
  fetchAgeRatingsReducer,
  fetchChannelCategoriesReducer,
  fetchAllSeriesReducer,
  selectedMovieReducer,
} = fetchMovieSlice.actions;
