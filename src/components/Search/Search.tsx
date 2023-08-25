import { FC } from "react";
import { useDispatch } from "react-redux";

import { getSearchMoviesOrTvsOrPersonsData } from "../../services/asyncActions";
import { getSearchMultiData } from "../../services/asyncActions";
import {
  DELETE_ALL_MOVIE_GENRES,
  DELETE_ALL_TV_GENRES,
  GET_SEARCHABLE_MOVIES,
  GET_SEARCHABLE_MULTI,
  GET_SEARCHABLE_PERSONS,
  GET_SEARCHABLE_TVS,
} from "../../utils/constants";

import styles from "./Search.module.scss";

interface SearchProps {
  dispatchType: string;
  searchValue: string;
  setSearchValue: (e: React.SetStateAction<string>) => void;
}

const Search: FC<SearchProps> = ({
  dispatchType,
  searchValue,
  setSearchValue,
}) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.search}>
      <input
        className={styles.search__input}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);

          switch (dispatchType) {
            case GET_SEARCHABLE_MOVIES:
              localStorage.setItem("searchableMoviesValue", e.target.value);
              dispatch({ type: DELETE_ALL_MOVIE_GENRES });
              dispatch(
                // @ts-ignore
                getSearchMoviesOrTvsOrPersonsData(
                  dispatchType,
                  e.target.value,
                  "movie",
                  1
                )
              );
              break;

            case GET_SEARCHABLE_TVS:
              localStorage.setItem("searchableTvsValue", e.target.value);
              dispatch({ type: DELETE_ALL_TV_GENRES });
              dispatch(
                // @ts-ignore
                getSearchMoviesOrTvsOrPersonsData(
                  dispatchType,
                  e.target.value,
                  "tv",
                  1
                )
              );
              break;

            case GET_SEARCHABLE_MULTI:
              localStorage.setItem("searchableMultiValue", e.target.value);
              dispatch(
                // @ts-ignore
                getSearchMultiData(dispatchType, e.target.value, 1)
              );
              break;

            case GET_SEARCHABLE_PERSONS:
              localStorage.setItem("searchablePersonsValue", e.target.value);
              dispatch(
                // @ts-ignore
                getSearchMoviesOrTvsOrPersonsData(
                  dispatchType,
                  e.target.value,
                  "person",
                  1
                )
              );
              break;

            default:
              break;
          }
        }}
        type="text"
        placeholder="Search Movie"
      />
    </div>
  );
};

export default Search;
