import { RootState } from "..";

export const getAllMovies = (state: RootState) => state.movies.allMovies;
export const getSearchMovies = (state: RootState) => state.movies.searchMovies;
export const getSimilarMovies = (state: RootState) =>
  state.movies.similarMovies;
export const getSelectedMovieGenres = (state: RootState) =>
  state.movies.selectedMovieGenres;
export const getSortedMovies = (state: RootState) => state.movies.sortedMovies;
export const getTopRatedMovies = (state: RootState) =>
  state.movies.topRatedMovies;
export const getTrendingMovies = (state: RootState) =>
  state.movies.trendingMovies;
export const getAllTvs = (state: RootState) => state.tvs.allTvs;
export const getSearchTvs = (state: RootState) => state.tvs.searchTvs;
export const getSimilarTvs = (state: RootState) => state.tvs.similarTvs;
export const getSelectedTvGenres = (state: RootState) =>
  state.tvs.selectedTvGenres;
export const getSortedTvs = (state: RootState) => state.tvs.sortedTvs;
export const getTopRatedTvs = (state: RootState) => state.tvs.topRatedTvs;
export const getTrendingTvs = (state: RootState) => state.tvs.trendingTvs;
export const getAllPersons = (state: RootState) => state.persons.allPersons;
export const getSearchPersons = (state: RootState) =>
  state.persons.searchPersons;
export const getSearchMulti = (state: RootState) => state.searchMulti;
