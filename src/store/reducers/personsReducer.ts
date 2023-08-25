import { trendingPerson } from "../../types/index";
import {
  GET_MORE_PERSONS,
  GET_SEARCHABLE_PERSONS,
  MORE_SEARCHABLE_PERSONS,
} from "../../utils/constants";

interface personsAction {
  type: string;
  payload?: any;
}

interface state {
  allPersons: {
    page: number;
    results: trendingPerson[];
    total_pages: number;
    total_results: number;
  };
  searchPersons: {
    page: number;
    results: trendingPerson[];
    total_pages: number;
    total_results: number;
  };
}

const initialState: state = {
  allPersons: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  searchPersons: {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
};

export const personsReducer = (state = initialState, action: personsAction) => {
  switch (action.type) {
    case GET_MORE_PERSONS:
      const { data: moreTvsData } = action.payload;
      return {
        ...state,
        allPersons: {
          page: moreTvsData.page,
          results: [
            ...state.allPersons.results,
            ...(moreTvsData.results as trendingPerson[]),
          ],
          total_pages: moreTvsData.total_pages,
          total_results: moreTvsData.total_results,
        },
      };

    case GET_SEARCHABLE_PERSONS:
      const { data: searchPersonsData } = action.payload;
      return {
        ...state,
        searchPersons: {
          page: searchPersonsData.page,
          results: searchPersonsData.results as trendingPerson[],
          total_pages: searchPersonsData.total_pages,
          total_results: searchPersonsData.total_results,
        },
      };

    case MORE_SEARCHABLE_PERSONS:
      const { data: moreSearchPersonsData } = action.payload;
      return {
        ...state,
        searchPersons: {
          page: moreSearchPersonsData.page,
          results: [
            ...state.searchPersons.results,
            ...(moreSearchPersonsData.results as trendingPerson[]),
          ],
          total_pages: moreSearchPersonsData.total_pages,
          total_results: moreSearchPersonsData.total_results,
        },
      };

    default:
      return state;
  }
};
