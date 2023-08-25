import { similarTV, sortedTv, topRatedTv, trendingTv } from "../../types/index";
import {
  ADD_SINGLE_TV_GENRE,
  CHANGE_SELECTED_TV_GENRES,
  DELETE_ALL_TV_GENRES,
  GET_MORE_SIMILAR_TVS,
  GET_MORE_SORTED_TVS,
  GET_MORE_TOP_RATED_TVS,
  GET_MORE_TRENDING_TVS,
  GET_MORE_TVS,
  GET_SEARCHABLE_TVS,
  GET_SORTED_TVS,
  GET_TOP_RATED_TVS,
  GET_TRENDING_TVS,
  MORE_SEARCHABLE_TVS,
} from "../../utils/constants";

interface tvsAction {
  type: string;
  payload?: any;
}

interface state {
  allTvs: {
    page: number;
    results: topRatedTv[];
    total_pages: number;
    total_results: number;
  };
  searchTvs: {
    page: number;
    results: topRatedTv[];
    total_pages: number;
    total_results: number;
  };
  similarTvs: {
    page: number;
    results: similarTV[];
    total_pages: number;
    total_results: number;
  };
  selectedTvGenres: number[];
  sortedTvs: {
    page: number;
    results: sortedTv[];
    total_pages: number;
    total_results: number;
  };
  topRatedTvs: {
    page: number;
    results: topRatedTv[];
    total_pages: number;
    total_results: number;
  };
  trendingTvs: {
    page: number;
    results: trendingTv[];
    total_pages: number;
    total_results: number;
  };
}

const initialState: state = {
  allTvs: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  searchTvs: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  similarTvs: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  selectedTvGenres: [],
  sortedTvs: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  topRatedTvs: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  trendingTvs: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
};

export const tvsReducer = (state = initialState, action: tvsAction) => {
  switch (action.type) {
    case GET_MORE_TVS:
      const { data: moreTvsData } = action.payload;
      return {
        ...state,
        allTvs: {
          page: moreTvsData.page,
          results: [
            ...state.allTvs.results,
            ...(moreTvsData.results as topRatedTv[]),
          ],
          total_pages: moreTvsData.total_pages,
          total_results: moreTvsData.total_results,
        },
      };

    case GET_SEARCHABLE_TVS:
      const { data: searchTvsData } = action.payload;
      return {
        ...state,
        searchTvs: {
          page: searchTvsData.page,
          results: searchTvsData.results as topRatedTv[],
          total_pages: searchTvsData.total_pages,
          total_results: searchTvsData.total_results,
        },
      };

    case MORE_SEARCHABLE_TVS:
      const { data: moreSearchTvsData } = action.payload;
      return {
        ...state,
        searchTvs: {
          page: moreSearchTvsData.page,
          results: [
            ...state.searchTvs.results,
            ...(moreSearchTvsData.results as topRatedTv[]),
          ],
          total_pages: moreSearchTvsData.total_pages,
          total_results: moreSearchTvsData.total_results,
        },
      };

    case GET_MORE_SIMILAR_TVS:
      const { data: moreSimilarTvsData } = action.payload;
      return {
        ...state,
        similarTvs: {
          page: moreSimilarTvsData.page,
          results: [
            ...state.similarTvs.results,
            ...(moreSimilarTvsData.results as similarTV[]),
          ],
          total_pages: moreSimilarTvsData.total_pages,
          total_results: moreSimilarTvsData.total_results,
        },
      };

    case CHANGE_SELECTED_TV_GENRES:
      let newArr: number[] = [];
      if (state.selectedTvGenres.includes(action.payload)) {
        for (let i = 0; i < state.selectedTvGenres.length; i++) {
          if (state.selectedTvGenres[i] !== action.payload) {
            newArr.push(state.selectedTvGenres[i]);
          }
        }
      } else {
        newArr = [...state.selectedTvGenres, action.payload];
      }
      return { ...state, selectedTvGenres: newArr };

    case ADD_SINGLE_TV_GENRE:
      return { ...state, selectedTvGenres: [action.payload] };

    case DELETE_ALL_TV_GENRES:
      return { ...state, selectedTvGenres: [] };

    case GET_SORTED_TVS:
      const { data: sortedTvsData } = action.payload;
      return {
        ...state,
        sortedTvs: {
          page: sortedTvsData.page,
          results: sortedTvsData.results as sortedTv[],
          total_pages: sortedTvsData.total_pages,
          total_results: sortedTvsData.total_results,
        },
      };

    case GET_MORE_SORTED_TVS:
      const { data: moreSortedTvsData } = action.payload;
      return {
        ...state,
        sortedTvs: {
          page: moreSortedTvsData.page,
          results: [
            ...state.sortedTvs.results,
            ...(moreSortedTvsData.results as sortedTv[]),
          ],
          total_pages: moreSortedTvsData.total_pages,
          total_results: moreSortedTvsData.total_results,
        },
      };

    case GET_TOP_RATED_TVS:
      const { data: topRatedTvsData } = action.payload;
      return {
        ...state,
        topRatedTvs: {
          page: topRatedTvsData.page,
          results: topRatedTvsData.results as topRatedTv[],
          total_pages: topRatedTvsData.total_pages,
          total_results: topRatedTvsData.total_results,
        },
      };

    case GET_MORE_TOP_RATED_TVS:
      const { data: moreTopRatedTvsData } = action.payload;
      return {
        ...state,
        topRatedTvs: {
          page: moreTopRatedTvsData.page,
          results: [
            ...state.topRatedTvs.results,
            ...(moreTopRatedTvsData.results as topRatedTv[]),
          ],
          total_pages: moreTopRatedTvsData.total_pages,
          total_results: moreTopRatedTvsData.total_results,
        },
      };

    case GET_TRENDING_TVS:
      const { data: trendingTvsData } = action.payload;
      return {
        ...state,
        trendingTvs: {
          page: trendingTvsData.page,
          results: trendingTvsData.results as trendingTv[],
          total_pages: trendingTvsData.total_pages,
          total_results: trendingTvsData.total_results,
        },
      };

    case GET_MORE_TRENDING_TVS:
      const { data: moreTrendingTvsData } = action.payload;
      return {
        ...state,
        trendingTvs: {
          page: moreTrendingTvsData.page,
          results: [
            ...state.trendingTvs.results,
            ...(moreTrendingTvsData.results as trendingTv[]),
          ],
          total_pages: moreTrendingTvsData.total_pages,
          total_results: moreTrendingTvsData.total_results,
        },
      };

    default:
      return state;
  }
};
