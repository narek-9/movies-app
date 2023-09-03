import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

import { getMoreMoviesOrTvsData } from "../../services/asyncActions";
import { getSearchMoviesOrTvsOrPersonsData } from "../../services/asyncActions";
import {
  GET_MORE_SORTED_TVS,
  GET_MORE_TVS,
  GET_SEARCHABLE_TVS,
  MORE_SEARCHABLE_TVS,
} from "../../utils/constants";
import { genre } from "../../types";
import { getGenresData } from "../../services/api";
import {
  getAllTvs,
  getSearchTvs,
  getSelectedTvGenres,
  getSortedTvs,
} from "../../store/selectors";

import Search from "../../components/Search/Search";
import MoreButton from "../../components/MoreButton/MoreButton";
import GenreButton from "../../components/GenreButton/GenreButton";
import MovieList from "../../components/ui/MovieList/MovieList";
import SkeletonMovieList from "../../components/ui/SkeletonMoviesList/SkeletonMovieList";

import "react-loading-skeleton/dist/skeleton.css";
import styles from "./TvsPage.module.scss";

const TvsPage: FC = () => {
  const [searchValue, setSearchValue] = useState<string>(
    localStorage.getItem("searchableTvsValue") || ""
  );
  const [tvGenres, setTvGenres] = useState<genre[]>([]);

  const dispatch = useDispatch();
  const allTvs = useSelector(getAllTvs);
  const searchTvs = useSelector(getSearchTvs);
  const selectedTvGenres = useSelector(getSelectedTvGenres);
  const sortedTvs = useSelector(getSortedTvs);

  if (searchValue && searchTvs.page === 0) {
    dispatch(
      // @ts-ignore
      getSearchMoviesOrTvsOrPersonsData(
        GET_SEARCHABLE_TVS,
        searchValue,
        "tv",
        1
      )
    );
  }

  useEffect(() => {
    if (!allTvs.results.length) {
      // @ts-ignore
      dispatch(getMoreMoviesOrTvsData(GET_MORE_TVS, "tv", 1));
    }

    const getData = async () => {
      const genres = await getGenresData("tv");
      setTvGenres(genres.genres);
    };

    getData();
  }, []);

  let selectedGenresNames: string[] = [];
  tvGenres.forEach((genre) => {
    if (selectedTvGenres.includes(genre.id)) {
      selectedGenresNames.push(genre.name);
    }
  });

  return (
    <>
      <Search
        dispatchType={GET_SEARCHABLE_TVS}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <div className={styles.content}>
        {!searchValue.trim() ? (
          tvGenres.length ? (
            <div>
              {tvGenres.map((genre) => (
                <GenreButton pageType="tvs" genre={genre} key={genre.id} />
              ))}
            </div>
          ) : (
            <div className={styles.skeletonGenres}>
              {Array(20)
                .fill(0)
                .map((_, id) => (
                  <Skeleton className={styles.skeletonGenres__genre} key={id} />
                ))}
            </div>
          )
        ) : (
          ""
        )}
        {selectedTvGenres.length ? (
          <>
            <h1>{selectedGenresNames.join(" & ")} TV</h1>
            {sortedTvs.results.length ? (
              <>
                <div className={styles.content__tvs}>
                  {sortedTvs.results.map((movie) => (
                    <div className={styles.content__tvs__item} key={movie.id}>
                      <MovieList movie={movie} />
                    </div>
                  ))}
                </div>
                {sortedTvs.results.length ? (
                  sortedTvs.page >= 0 ? (
                    <MoreButton
                      dispatchType={GET_MORE_SORTED_TVS}
                      genres={selectedTvGenres}
                      pageType="tvs"
                    />
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </>
            ) : (
              <h1>No TV</h1>
            )}
          </>
        ) : searchValue.trim() ? (
          <>
            <h1>Search Results</h1>
            {searchTvs.results.length ? (
              <>
                <div className={styles.content__tvs}>
                  {searchTvs.results.map((movie) => (
                    <div className={styles.content__tvs__item} key={movie.id}>
                      <MovieList movie={movie} />
                    </div>
                  ))}
                </div>
                {searchTvs.results.length ? (
                  searchTvs.page >= 0 ? (
                    <MoreButton
                      dispatchType={MORE_SEARCHABLE_TVS}
                      searchValue={searchValue}
                      pageType="tvs"
                    />
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </>
            ) : (
              <h1>No TV</h1>
            )}
          </>
        ) : (
          <>
            <h1>TV </h1>
            <div className={styles.content__tvs}>
              {allTvs.results.length
                ? allTvs.results.map((movie) => (
                    <div className={styles.content__tvs__item} key={movie.id}>
                      <MovieList movie={movie} />
                    </div>
                  ))
                : Array(4)
                    .fill(0)
                    .map((_, id) => <SkeletonMovieList key={id} />)}
            </div>
            {allTvs.results.length ? (
              allTvs.page >= 0 ? (
                <MoreButton dispatchType={GET_MORE_TVS} pageType="tvs" />
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </>
  );
};

export default TvsPage;
