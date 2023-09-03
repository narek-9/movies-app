import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMoreTrendingMoviesOrTvsOrPersonsData } from "../../services/asyncActions";
import { getSearchMoviesOrTvsOrPersonsData } from "../../services/asyncActions";
import { getMoreMoviesOrTvsData } from "../../services/asyncActions";
import { getSearchMultiData } from "../../services/asyncActions";
import { getSortedMoviesData } from "../../services/asyncActions";
import { getSortedTvsData } from "../../services/asyncActions";
import {
  GET_MORE_MOVIES,
  GET_MORE_PERSONS,
  GET_MORE_SORTED_MOVIES,
  GET_MORE_SORTED_TVS,
  GET_MORE_TVS,
  MORE_SEARCHABLE_MOVIES,
  MORE_SEARCHABLE_MULTI,
  MORE_SEARCHABLE_PERSONS,
  MORE_SEARCHABLE_TVS,
} from "../../utils/constants";
import {
  getAllMovies,
  getAllPersons,
  getAllTvs,
  getSearchMovies,
  getSearchMulti,
  getSearchPersons,
  getSearchTvs,
  getSortedMovies,
  getSortedTvs,
} from "../../store/selectors";

import styles from "./MoreButton.module.scss";

interface MoreButtonProps {
  dispatchType: string;
  searchValue?: string;
  pageType: "tvs" | "movies" | "multi" | "persons";
  genres?: number[];
}

const MoreButton: FC<MoreButtonProps> = ({
  dispatchType,
  searchValue,
  pageType,
  genres,
}) => {
  const dispatch = useDispatch();
  const allMovies = useSelector(getAllMovies);
  const searchMovies = useSelector(getSearchMovies);
  const allTvs = useSelector(getAllTvs);
  const searchTvs = useSelector(getSearchTvs);
  const searchMulti = useSelector(getSearchMulti);
  const allPersons = useSelector(getAllPersons);
  const searchPersons = useSelector(getSearchPersons);
  const sortedMovies = useSelector(getSortedMovies);
  const sortedTvs = useSelector(getSortedTvs);

  let currentPage = 0;
  let totalPages = 0;

  if (pageType === "movies") {
    currentPage = allMovies.page;
    totalPages = allMovies.total_pages;

    if (searchValue) {
      currentPage = searchMovies.page;
      totalPages = searchMovies.total_pages;
    } else if (genres?.length) {
      currentPage = sortedMovies.page;
      totalPages = sortedMovies.total_pages;
    }
  } else if (pageType === "tvs") {
    currentPage = allTvs.page;
    totalPages = allTvs.total_pages;

    if (searchValue) {
      currentPage = searchTvs.page;
      totalPages = searchTvs.total_pages;
    } else if (genres?.length) {
      currentPage = sortedTvs.page;
      totalPages = sortedTvs.total_pages;
    }
  } else if (pageType === "persons") {
    currentPage = allPersons.page;
    totalPages = allPersons.total_pages;

    if (searchValue) {
      currentPage = searchPersons.page;
      totalPages = searchPersons.total_pages;
    }
  } else {
    currentPage = searchMulti.page;
    totalPages = searchMulti.total_pages;
  }

  const isButtonDisabled = currentPage >= totalPages;

  return (
    <div className={styles.buttonWrapper}>
      <button
        className={`${styles.buttonWrapper__button} ${
          isButtonDisabled
            ? styles.buttonWrapper__button__disabled
            : styles.buttonWrapper__button__notDisabled
        }`}
        onClick={() => {
          switch (dispatchType) {
            case GET_MORE_MOVIES:
              dispatch(
                // @ts-ignore
                getMoreMoviesOrTvsData(dispatchType, "movie", currentPage + 1)
              );
              break;

            case MORE_SEARCHABLE_MOVIES:
              dispatch(
                // @ts-ignore
                getSearchMoviesOrTvsOrPersonsData(
                  dispatchType,
                  searchValue || "",
                  "movie",
                  currentPage + 1
                )
              );
              break;

            case GET_MORE_TVS:
              dispatch(
                // @ts-ignore
                getMoreMoviesOrTvsData(dispatchType, "tv", currentPage + 1)
              );
              break;

            case MORE_SEARCHABLE_TVS:
              dispatch(
                // @ts-ignore
                getSearchMoviesOrTvsOrPersonsData(
                  dispatchType,
                  searchValue || "",
                  "tv",
                  currentPage + 1
                )
              );
              break;

            case MORE_SEARCHABLE_MULTI:
              dispatch(
                // @ts-ignore
                getSearchMultiData(
                  dispatchType,
                  searchValue || "",
                  currentPage + 1
                )
              );
              break;

            case GET_MORE_PERSONS:
              dispatch(
                // @ts-ignore
                getMoreTrendingMoviesOrTvsOrPersonsData(
                  dispatchType,
                  "person",
                  currentPage + 1
                )
              );
              break;

            case MORE_SEARCHABLE_PERSONS:
              dispatch(
                // @ts-ignore
                getSearchMoviesOrTvsOrPersonsData(
                  dispatchType,
                  searchValue || "",
                  "person",
                  currentPage + 1
                )
              );
              break;

            case GET_MORE_SORTED_MOVIES:
              dispatch(
                // @ts-ignore
                getSortedMoviesData(
                  dispatchType,
                  genres?.join(",") || "",
                  currentPage + 1
                )
              );
              break;

            case GET_MORE_SORTED_TVS:
              dispatch(
                // @ts-ignore
                getSortedTvsData(
                  dispatchType,
                  genres?.join(",") || "",
                  currentPage + 1
                )
              );
              break;

            default:
              break;
          }
        }}
        disabled={isButtonDisabled}
      >
        {isButtonDisabled ? "No more" : "More"}
      </button>
    </div>
  );
};

export default MoreButton;
