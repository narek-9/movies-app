import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMoreMoviesOrTvsData } from "../../services/asyncActions";
import { getSearchMoviesOrTvsOrPersonsData } from "../../services/asyncActions";
import {
  GET_MORE_MOVIES,
  GET_MORE_SORTED_MOVIES,
  GET_SEARCHABLE_MOVIES,
  MORE_SEARCHABLE_MOVIES,
} from "../../utils/constants";
import { getGenresData } from "../../services/api";
import { genre } from "../../types";
import {
  getAllMovies,
  getSearchMovies,
  getSelectedMovieGenres,
  getSortedMovies,
} from "../../store/selectors";

import MovieList from "../../components/ui/MovieList/MovieList";
import Search from "../../components/Search/Search";
import MoreButton from "../../components/MoreButton/MoreButton";
import GenreButton from "../../components/GenreButton/GenreButton";

import styles from "./MoviesPage.module.scss";

const MoviesPage: FC = () => {
  const [searchValue, setSearchValue] = useState<string>(
    localStorage.getItem("searchableMoviesValue") || ""
  );
  const [movieGenres, setMovieGenres] = useState<genre[]>();

  const dispatch = useDispatch();
  const allMovies = useSelector(getAllMovies);
  const searchMovies = useSelector(getSearchMovies);
  const selectedMovieGenres = useSelector(getSelectedMovieGenres);
  const sortedMovies = useSelector(getSortedMovies);

  if (searchValue && searchMovies.page === 0) {
    dispatch(
      // @ts-ignore
      getSearchMoviesOrTvsOrPersonsData(
        GET_SEARCHABLE_MOVIES,
        searchValue,
        "movie",
        1
      )
    );
  }

  useEffect(() => {
    if (!allMovies.results.length) {
      // @ts-ignore
      dispatch(getMoreMoviesOrTvsData(GET_MORE_MOVIES, "movie", 1));
    }

    const getData = async () => {
      const genres = await getGenresData("movie");
      setMovieGenres(genres.genres);
    };

    getData();
  }, []);

  let selectedGenresNames: string[] = [];
  movieGenres?.forEach((genre) => {
    if (selectedMovieGenres.includes(genre.id)) {
      selectedGenresNames.push(genre.name);
    }
  });

  return (
    <>
      <Search
        dispatchType={GET_SEARCHABLE_MOVIES}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <div className={styles.content}>
        {!searchValue.trim() ? (
          movieGenres?.length ? (
            <div>
              {movieGenres?.map((genre) => (
                <GenreButton pageType="movies" genre={genre} key={genre.id} />
              ))}
            </div>
          ) : (
            <div className={styles.artificialGenres}>
              <div className={styles.artificialGenres__item}></div>
              <div className={styles.artificialGenres__item}></div>
              <div className={styles.artificialGenres__item}></div>
              <div className={styles.artificialGenres__item}></div>
              <div className={styles.artificialGenres__item}></div>
              <div className={styles.artificialGenres__item}></div>
              <div className={styles.artificialGenres__item}></div>
              <div className={styles.artificialGenres__item}></div>
              <div className={styles.artificialGenres__item}></div>
              <div className={styles.artificialGenres__item}></div>
            </div>
          )
        ) : (
          ""
        )}
        {selectedMovieGenres.length ? (
          <>
            <h1>{selectedGenresNames.join(" & ")} Movies</h1>
            {sortedMovies.results.length ? (
              <>
                <div className={styles.content__movies}>
                  {sortedMovies.results.map((movie) => (
                    <div
                      className={styles.content__movies__item}
                      key={movie.id}
                    >
                      <MovieList movie={movie} />
                    </div>
                  ))}
                </div>
                {sortedMovies.results.length ? (
                  sortedMovies.page >= 0 ? (
                    <MoreButton
                      dispatchType={GET_MORE_SORTED_MOVIES}
                      genres={selectedMovieGenres}
                      pageType="movies"
                    />
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </>
            ) : (
              <h1>No Movies</h1>
            )}
          </>
        ) : searchValue.trim() ? (
          <>
            <h1>Search Results</h1>
            {searchMovies.results.length ? (
              <>
                <div className={styles.content__movies}>
                  {searchMovies.results.map((movie) => (
                    <div
                      className={styles.content__movies__item}
                      key={movie.id}
                    >
                      <MovieList movie={movie} />
                    </div>
                  ))}
                </div>
                {searchMovies.results.length ? (
                  searchMovies.page >= 0 ? (
                    <MoreButton
                      dispatchType={MORE_SEARCHABLE_MOVIES}
                      searchValue={searchValue}
                      pageType="movies"
                    />
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </>
            ) : (
              <h1>No Movies</h1>
            )}
          </>
        ) : allMovies.results.length ? (
          <>
            <h1>Movies</h1>
            <div className={styles.content__movies}>
              {allMovies.results.map((movie) => (
                <div className={styles.content__movies__item} key={movie.id}>
                  <MovieList movie={movie} />
                </div>
              ))}
            </div>
            {allMovies.results.length ? (
              allMovies.page >= 0 ? (
                <MoreButton dispatchType={GET_MORE_MOVIES} pageType="movies" />
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </>
        ) : (
          <div className={styles.artificialContent}>
            <div className={styles.artificialContent__title}></div>
            <div className={styles.artificialContent__wrapper}>
              <div className={styles.artificialContent__wrapper__item}></div>
              <div className={styles.artificialContent__wrapper__item}></div>
              <div className={styles.artificialContent__wrapper__item}></div>
              <div className={styles.artificialContent__wrapper__item}></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MoviesPage;
