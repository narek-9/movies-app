import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSearchMultiData } from "../../services/asyncActions";
import { getMoreTopRatedMoviesOrTvsData } from "../../services/asyncActions";
import { getMoreTrendingMoviesOrTvsOrPersonsData } from "../../services/asyncActions";
import {
  GET_MORE_TOP_RATED_MOVIES,
  GET_MORE_TOP_RATED_TVS,
  GET_MORE_TRENDING_MOVIES,
  GET_MORE_TRENDING_TVS,
  GET_SEARCHABLE_MULTI,
  MORE_SEARCHABLE_MULTI,
} from "../../utils/constants";
import {
  getSearchMulti,
  getTopRatedMovies,
  getTopRatedTvs,
  getTrendingMovies,
  getTrendingTvs,
} from "../../store/selectors";

import MovieList from "../../components/ui/MovieList/MovieList";
import Search from "../../components/Search/Search";
import MoreButton from "../../components/MoreButton/MoreButton";
import ScrollButton from "../../components/ScrollButton/ScrollButton";

import styles from "./HomePage.module.scss";

const HomePage: FC = () => {
  const [searchValue, setSearchValue] = useState<string>(
    localStorage.getItem("searchableMultiValue") || ""
  );
  const [firstTopRatedMoviesIndex, setFirstTopRatedMoviesIndex] =
    useState<number>(0);
  const [lastTopRatedMoviesIndex, setLastTopRatedMoviesIndex] =
    useState<number>(4);
  const [firstTopRatedTvsIndex, setFirstTopRatedTvsIndex] = useState<number>(0);
  const [lastTopRatedTvsIndex, setLastTopRatedTvsIndex] = useState<number>(4);
  const [firstTrendingMoviesIndex, setFirstTrendingMoviesIndex] =
    useState<number>(0);
  const [lastTrendingMoviesIndex, setLastTrendingMoviesIndex] =
    useState<number>(4);
  const [firstTrendingTvsIndex, setFirstTrendingTvsIndex] = useState<number>(0);
  const [lastTrendingTvsIndex, setLastTrendingTvsIndex] = useState<number>(4);

  const dispatch = useDispatch();
  const topRatedMovies = useSelector(getTopRatedMovies);
  const topRatedTvs = useSelector(getTopRatedTvs);
  const trendingMovies = useSelector(getTrendingMovies);
  const trendingTvs = useSelector(getTrendingTvs);
  const searchMulti = useSelector(getSearchMulti);

  if (searchValue && searchMulti.page === 0) {
    dispatch(
      // @ts-ignore
      getSearchMultiData(GET_SEARCHABLE_MULTI, searchValue, 1)
    );
  }

  useEffect(() => {
    dispatch(
      // @ts-ignore
      getMoreTopRatedMoviesOrTvsData(GET_MORE_TOP_RATED_MOVIES, "movie", 1)
    );
    dispatch(
      // @ts-ignore
      getMoreTopRatedMoviesOrTvsData(GET_MORE_TOP_RATED_TVS, "tv", 1)
    );
    dispatch(
      // @ts-ignore
      getMoreTrendingMoviesOrTvsOrPersonsData(
        GET_MORE_TRENDING_MOVIES,
        "movie",
        1
      )
    );
    dispatch(
      // @ts-ignore
      getMoreTrendingMoviesOrTvsOrPersonsData(GET_MORE_TRENDING_TVS, "tv", 1)
    );
  }, []);

  return (
    <>
      <Search
        dispatchType={GET_SEARCHABLE_MULTI}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <div className={styles.content}>
        {searchMulti.results.length ? (
          <>
            <h1>Search Results</h1>
            <div className={styles.content__block}>
              {searchMulti.results.map((multi) => (
                <div className={styles.content__block__item} key={multi.id}>
                  <MovieList movie={multi} />
                </div>
              ))}
            </div>
            {searchMulti.results.length ? (
              searchMulti.page >= 0 ? (
                <MoreButton
                  dispatchType={MORE_SEARCHABLE_MULTI}
                  searchValue={searchValue}
                  pageType="multi"
                />
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            <div>
              {topRatedMovies.results.length ? (
                <div>
                  <h1>Top Rated Movies</h1>
                  <div className={styles.content__block}>
                    <ScrollButton
                      data={topRatedMovies}
                      firstIndex={firstTopRatedMoviesIndex}
                      setFirstIndex={setFirstTopRatedMoviesIndex}
                      lastIndex={lastTopRatedMoviesIndex}
                      setLastIndex={setLastTopRatedMoviesIndex}
                      isNextButton={false}
                      valueForDispatch="topRatedMovies"
                    />
                    {topRatedMovies.results
                      .slice(firstTopRatedMoviesIndex, lastTopRatedMoviesIndex)
                      .map((movie) => (
                        <div
                          className={styles.content__block__item}
                          key={movie.id}
                        >
                          <MovieList movie={movie} />
                        </div>
                      ))}
                    <ScrollButton
                      data={topRatedMovies}
                      firstIndex={firstTopRatedMoviesIndex}
                      setFirstIndex={setFirstTopRatedMoviesIndex}
                      lastIndex={lastTopRatedMoviesIndex}
                      setLastIndex={setLastTopRatedMoviesIndex}
                      isNextButton
                      valueForDispatch="topRatedMovies"
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.artificialContent}>
                  <div className={styles.artificialContent__title}></div>
                  <div className={styles.artificialContent__wrapper}>
                    <div
                      className={styles.artificialContent__wrapper__item}
                    ></div>
                    <div
                      className={styles.artificialContent__wrapper__item}
                    ></div>
                    <div
                      className={styles.artificialContent__wrapper__item}
                    ></div>
                    <div
                      className={styles.artificialContent__wrapper__item}
                    ></div>
                  </div>
                </div>
              )}
              {trendingMovies.results.length ? (
                <div>
                  <h1>Trending Movies</h1>
                  <div className={styles.content__block}>
                    <ScrollButton
                      data={trendingMovies}
                      firstIndex={firstTrendingMoviesIndex}
                      setFirstIndex={setFirstTrendingMoviesIndex}
                      lastIndex={lastTrendingMoviesIndex}
                      setLastIndex={setLastTrendingMoviesIndex}
                      isNextButton={false}
                      valueForDispatch="trendingMovies"
                    />
                    {trendingMovies.results
                      .slice(firstTrendingMoviesIndex, lastTrendingMoviesIndex)
                      .map((movie) => (
                        <div
                          className={styles.content__block__item}
                          key={movie.id}
                        >
                          <MovieList movie={movie} />
                        </div>
                      ))}
                    <ScrollButton
                      data={trendingMovies}
                      firstIndex={firstTrendingMoviesIndex}
                      setFirstIndex={setFirstTrendingMoviesIndex}
                      lastIndex={lastTrendingMoviesIndex}
                      setLastIndex={setLastTrendingMoviesIndex}
                      isNextButton
                      valueForDispatch="trendingMovies"
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.artificialContent}>
                  <div className={styles.artificialContent__title}></div>
                  <div className={styles.artificialContent__wrapper}>
                    <div
                      className={styles.artificialContent__wrapper__item}
                    ></div>
                    <div
                      className={styles.artificialContent__wrapper__item}
                    ></div>
                    <div
                      className={styles.artificialContent__wrapper__item}
                    ></div>
                    <div
                      className={styles.artificialContent__wrapper__item}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            <div>
              {topRatedTvs.results.length ? (
                <div>
                  <h1>Top Rated TV</h1>
                  <div className={styles.content__block}>
                    <ScrollButton
                      data={topRatedTvs}
                      firstIndex={firstTopRatedTvsIndex}
                      lastIndex={lastTopRatedTvsIndex}
                      setFirstIndex={setFirstTopRatedTvsIndex}
                      setLastIndex={setLastTopRatedTvsIndex}
                      isNextButton={false}
                      valueForDispatch="topRatedTvs"
                    />
                    {topRatedTvs.results
                      .slice(firstTopRatedTvsIndex, lastTopRatedTvsIndex)
                      .map((movie) => (
                        <div
                          className={styles.content__block__item}
                          key={movie.id}
                        >
                          <MovieList movie={movie} />
                        </div>
                      ))}
                    <ScrollButton
                      data={topRatedTvs}
                      firstIndex={firstTopRatedTvsIndex}
                      lastIndex={lastTopRatedTvsIndex}
                      setFirstIndex={setFirstTopRatedTvsIndex}
                      setLastIndex={setLastTopRatedTvsIndex}
                      isNextButton
                      valueForDispatch="topRatedTvs"
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.artificialContent}>
                  <div className={styles.artificialContent__title}></div>
                  <div className={styles.artificialContent__wrapper}>
                    <div
                      className={styles.artificialContent__wrapper__item}
                    ></div>
                    <div
                      className={styles.artificialContent__wrapper__item}
                    ></div>
                    <div
                      className={styles.artificialContent__wrapper__item}
                    ></div>
                    <div
                      className={styles.artificialContent__wrapper__item}
                    ></div>
                  </div>
                </div>
              )}
              {trendingTvs.results.length ? (
                <div>
                  <h1>Trending TV</h1>
                  <div className={styles.content__block}>
                    <ScrollButton
                      data={trendingTvs}
                      firstIndex={firstTrendingTvsIndex}
                      setFirstIndex={setFirstTrendingTvsIndex}
                      lastIndex={lastTrendingTvsIndex}
                      setLastIndex={setLastTrendingTvsIndex}
                      isNextButton={false}
                      valueForDispatch="trendingTvs"
                    />
                    {trendingTvs.results
                      .slice(firstTrendingTvsIndex, lastTrendingTvsIndex)
                      .map((movie) => (
                        <div
                          className={styles.content__block__item}
                          key={movie.id}
                        >
                          <MovieList movie={movie} />
                        </div>
                      ))}
                    <ScrollButton
                      data={trendingTvs}
                      firstIndex={firstTrendingTvsIndex}
                      setFirstIndex={setFirstTrendingTvsIndex}
                      lastIndex={lastTrendingTvsIndex}
                      setLastIndex={setLastTrendingTvsIndex}
                      isNextButton
                      valueForDispatch="trendingTvs"
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.artificialContent}>
                  <div className={styles.artificialContent__title}></div>
                  <div className={styles.artificialContent__wrapper}>
                    <div
                      className={styles.artificialContent__wrapper__item}
                    ></div>
                    <div
                      className={styles.artificialContent__wrapper__item}
                    ></div>
                    <div
                      className={styles.artificialContent__wrapper__item}
                    ></div>
                    <div
                      className={styles.artificialContent__wrapper__item}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
