import { movieFromMulti, tvFromMulti } from "../../types/index";
import {
  GET_SEARCHABLE_MULTI,
  MORE_SEARCHABLE_MULTI,
} from "../../utils/constants";

interface multiAction {
  type: string;
  payload?: any;
}

interface state {
  page: number;
  results: movieFromMulti[] | tvFromMulti[];
  total_pages: number;
  total_results: number;
}

const initialState: state = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const searchMultiReducer = (
  state = initialState,
  action: multiAction
) => {
  switch (action.type) {
    case GET_SEARCHABLE_MULTI:
      const { data: searchMultiData } = action.payload;
      return {
        ...state,
        page: searchMultiData.page,
        results: searchMultiData.results as movieFromMulti[] | tvFromMulti[],
        total_pages: searchMultiData.total_pages,
        total_results: searchMultiData.total_results,
      };

    case MORE_SEARCHABLE_MULTI:
      const { data: moreSearchMultiData } = action.payload;
      return {
        ...state,
        page: moreSearchMultiData.page,
        results: [...state.results, ...moreSearchMultiData.results],
        total_pages: moreSearchMultiData.total_pages,
        total_results: moreSearchMultiData.total_results,
      };

    default:
      return state;
  }
};
