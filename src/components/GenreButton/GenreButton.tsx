import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getSortedTvsData } from "../../services/asyncActions";
import { getSortedMoviesData } from "../../services/asyncActions";
import {
  ADD_SINGLE_MOVIE_GENRE,
  ADD_SINGLE_TV_GENRE,
  CHANGE_SELECTED_MOVIE_GENRES,
  CHANGE_SELECTED_TV_GENRES,
  GET_SORTED_MOVIES,
  GET_SORTED_TVS,
} from "../../utils/constants";
import { genre } from "../../types";
import {
  getSelectedMovieGenres,
  getSelectedTvGenres,
} from "../../store/selectors";

import styles from "./GenreButton.module.scss";

interface GenreButtonProps {
  genre: genre;
  isSeparateGenre?: boolean;
  pageType?: "movies" | "tvs";
}

const GenreButton: FC<GenreButtonProps> = ({
  genre,
  isSeparateGenre,
  pageType,
}) => {
  const dispatch = useDispatch();
  const selectedMovieGenres = useSelector(getSelectedMovieGenres);
  const selectedTvGenres = useSelector(getSelectedTvGenres);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      // @ts-ignore
      getSortedMoviesData(GET_SORTED_MOVIES, selectedMovieGenres.join(","), 1)
    );
  }, [selectedMovieGenres]);

  useEffect(() => {
    dispatch(
      // @ts-ignore
      getSortedTvsData(GET_SORTED_TVS, selectedTvGenres.join(","), 1)
    );
  }, [selectedTvGenres]);

  return pageType === "movies" ? (
    isSeparateGenre ? (
      <button
        className={styles.genreBtn}
        onClick={() => {
          localStorage.setItem("searchableMoviesValue", "");
          dispatch({ type: ADD_SINGLE_MOVIE_GENRE, payload: genre.id });
          navigate("/movies");
        }}
      >
        {genre.name}
      </button>
    ) : (
      <button
        className={`${styles.genreBtn} ${
          selectedMovieGenres.includes(genre.id)
            ? styles.genreBtn__selected
            : ""
        }`}
        onClick={() =>
          dispatch({ type: CHANGE_SELECTED_MOVIE_GENRES, payload: genre.id })
        }
      >
        {genre.name}
      </button>
    )
  ) : isSeparateGenre ? (
    <button
      className={styles.genreBtn}
      onClick={() => {
        localStorage.setItem("searchableTvsValue", "");
        dispatch({ type: ADD_SINGLE_TV_GENRE, payload: genre.id });
        navigate("/tvs");
      }}
    >
      {genre.name}
    </button>
  ) : (
    <button
      className={`${styles.genreBtn} ${
        selectedTvGenres.includes(genre.id) ? styles.genreBtn__selected : ""
      }`}
      onClick={() =>
        dispatch({ type: CHANGE_SELECTED_TV_GENRES, payload: genre.id })
      }
    >
      {genre.name}
    </button>
  );
};

export default GenreButton;
