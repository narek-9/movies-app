import { topRatedMovie } from "../../types/index";
import {
  ADD_SINGLE_MOVIE_GENRE,
  CHANGE_SELECTED_MOVIE_GENRES,
  DELETE_ALL_MOVIE_GENRES,
  GET_MORE_MOVIES,
  GET_MORE_SIMILAR_MOVIES,
  GET_MORE_SORTED_MOVIES,
  GET_MORE_TOP_RATED_MOVIES,
  GET_MORE_TRENDING_MOVIES,
  GET_SEARCHABLE_MOVIES,
  GET_SIMILAR_MOVIES,
  GET_SORTED_MOVIES,
  GET_TOP_RATED_MOVIES,
  GET_TRENDING_MOVIES,
  MORE_SEARCHABLE_MOVIES,
} from "../../utils/constants";

interface moviesAction {
  type: string;
  payload?: any;
}

interface state {
  allMovies: {
    page: number;
    results: topRatedMovie[];
    total_pages: number;
    total_results: number;
  };
  searchMovies: {
    page: number;
    results: topRatedMovie[];
    total_pages: number;
    total_results: number;
  };
  similarMovies: {
    page: number;
    results: topRatedMovie[];
    total_pages: number;
    total_results: number;
  };
  selectedMovieGenres: number[];
  sortedMovies: {
    page: number;
    results: topRatedMovie[];
    total_pages: number;
    total_results: number;
  };
  topRatedMovies: {
    page: number;
    results: topRatedMovie[];
    total_pages: number;
    total_results: number;
  };
  trendingMovies: {
    page: number;
    results: topRatedMovie[];
    total_pages: number;
    total_results: number;
  };
}

const initialState: state = {
  allMovies: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  searchMovies: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  similarMovies: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  selectedMovieGenres: [],
  sortedMovies: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  topRatedMovies: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  trendingMovies: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
};

export const moviesReducer = (state = initialState, action: moviesAction) => {
  switch (action.type) {
    case GET_MORE_MOVIES:
      const { data: moreMoviesData } = action.payload;
      return {
        ...state,
        allMovies: {
          page: moreMoviesData.page,
          results: [
            ...state.allMovies.results,
            ...(moreMoviesData.results as topRatedMovie[]),
          ],
          total_pages: moreMoviesData.total_pages,
          total_results: moreMoviesData.total_results,
        },
      };

    case GET_SEARCHABLE_MOVIES:
      const { data: searchMoviesData } = action.payload;
      return {
        ...state,
        searchMovies: {
          page: searchMoviesData.page,
          results: searchMoviesData.results as topRatedMovie[],
          total_pages: searchMoviesData.total_pages,
          total_results: searchMoviesData.total_results,
        },
      };

    case MORE_SEARCHABLE_MOVIES:
      const { data: moreSearchMoviesData } = action.payload;
      return {
        ...state,
        searchMovies: {
          page: moreSearchMoviesData.page,
          results: [
            ...state.searchMovies.results,
            ...(moreSearchMoviesData.results as topRatedMovie[]),
          ],
          total_pages: moreSearchMoviesData.total_pages,
          total_results: moreSearchMoviesData.total_results,
        },
      };

    case GET_SIMILAR_MOVIES:
      const { data: similarMoviesData } = action.payload;
      return {
        ...state,
        similarMovies: {
          page: similarMoviesData.page,
          results: similarMoviesData.results as topRatedMovie[],
          total_pages: similarMoviesData.total_pages,
          total_results: similarMoviesData.total_results,
        },
      };

    case GET_MORE_SIMILAR_MOVIES:
      const { data: moreSimilarMoviesData } = action.payload;
      return {
        ...state,
        similarMovies: {
          page: moreSimilarMoviesData.page,
          results: [
            ...state.similarMovies.results,
            ...(moreSimilarMoviesData.results as topRatedMovie[]),
          ],
          total_pages: moreSimilarMoviesData.total_pages,
          total_results: moreSimilarMoviesData.total_results,
        },
      };

    case CHANGE_SELECTED_MOVIE_GENRES:
      let newArr: number[] = [];
      if (state.selectedMovieGenres.includes(action.payload)) {
        for (let i = 0; i < state.selectedMovieGenres.length; i++) {
          if (state.selectedMovieGenres[i] !== action.payload) {
            newArr.push(state.selectedMovieGenres[i]);
          }
        }
      } else {
        newArr = [...state.selectedMovieGenres, action.payload];
      }
      return { ...state, selectedMovieGenres: newArr };

    case ADD_SINGLE_MOVIE_GENRE:
      return { ...state, selectedMovieGenres: [action.payload] };

    case DELETE_ALL_MOVIE_GENRES:
      return { ...state, selectedMovieGenres: [] };

    case GET_SORTED_MOVIES:
      const { data: sortedMoviesData } = action.payload;
      return {
        ...state,
        sortedMovies: {
          page: sortedMoviesData.page,
          results: sortedMoviesData.results as topRatedMovie[],
          total_pages: sortedMoviesData.total_pages,
          total_results: sortedMoviesData.total_results,
        },
      };

    case GET_MORE_SORTED_MOVIES:
      const { data: moreSortedMoviesData } = action.payload;
      return {
        ...state,
        sortedMovies: {
          page: moreSortedMoviesData.page,
          results: [
            ...state.sortedMovies.results,
            ...(moreSortedMoviesData.results as topRatedMovie[]),
          ],
          total_pages: moreSortedMoviesData.total_pages,
          total_results: moreSortedMoviesData.total_results,
        },
      };

    case GET_TOP_RATED_MOVIES:
      const { data: topRatedMoviesData } = action.payload;
      return {
        ...state,
        topRatedMovies: {
          page: topRatedMoviesData.page,
          results: topRatedMoviesData.results as topRatedMovie[],
          total_pages: topRatedMoviesData.total_pages,
          total_results: topRatedMoviesData.total_results,
        },
      };

    case GET_MORE_TOP_RATED_MOVIES:
      const { data: moreTopRatedMoviesData } = action.payload;
      return {
        ...state,
        topRatedMovies: {
          page: moreTopRatedMoviesData.page,
          results: [
            ...state.topRatedMovies.results,
            ...(moreTopRatedMoviesData.results as topRatedMovie[]),
          ],
          total_pages: moreTopRatedMoviesData.total_pages,
          total_results: moreTopRatedMoviesData.total_results,
        },
      };

    case GET_TRENDING_MOVIES:
      const { data: trendingMoviesData } = action.payload;
      return {
        ...state,
        trendingMovies: {
          page: trendingMoviesData.page,
          results: trendingMoviesData.results as topRatedMovie[],
          total_pages: trendingMoviesData.total_pages,
          total_results: trendingMoviesData.total_results,
        },
      };

    case GET_MORE_TRENDING_MOVIES:
      const { data: moreTrendingMoviesData } = action.payload;
      return {
        ...state,
        trendingMovies: {
          page: moreTrendingMoviesData.page,
          results: [
            ...state.trendingMovies.results,
            ...(moreTrendingMoviesData.results as topRatedMovie[]),
          ],
          total_pages: moreTrendingMoviesData.total_pages,
          total_results: moreTrendingMoviesData.total_results,
        },
      };

    default:
      return state;
  }
};
