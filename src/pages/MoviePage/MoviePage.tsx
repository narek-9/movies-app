import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

import { getSimilarMoviesOrTvsData } from "../../services/asyncActions";
import {
  getDetails,
  getMovieOrTvVideosData,
  getMovieOrTvCreditsData,
} from "../../services/api";
import { genre, movie, movieCast, crew, video } from "../../types";
import { GET_SIMILAR_MOVIES } from "../../utils/constants";
import { getSimilarMovies } from "../../store/selectors";

import GenreButton from "../../components/GenreButton/GenreButton";
import ScrollButton from "../../components/ScrollButton/ScrollButton";
import MovieList from "../../components/ui/MovieList/MovieList";
import PersonList from "../../components/ui/PersonList/PersonList";
import SkeletonPersonList from "../../components/ui/SkeletonPersonList/SkeletonPersonList";
import SkeletonMovieList from "../../components/ui/SkeletonMoviesList/SkeletonMovieList";

import notFound from "../../assets/not-found.png";

import "react-loading-skeleton/dist/skeleton.css";
import styles from "./MoviePage.module.scss";

const MoviePage: FC = () => {
  const [currentMovie, setCurrentMovie] = useState<movie>();
  const [currentMovieVideos, setCurrentMovieVideos] = useState<video[]>([]);
  const [currentMovieGenres, setCurrentMovieGenres] = useState<genre[]>([]);
  const [movieCreditsData, setMovieCreditsData] = useState<{
    id: number;
    cast: movieCast[];
    crew: crew[];
  }>();
  const [isTrailerSelected, setIsTrailerSelected] = useState<boolean>(true);
  const [isWatchSelected, setIsWatchSelected] = useState<boolean>(false);
  const [firstSimilarMovieIndex, setFirstSimilarMovieIndex] =
    useState<number>(0);
  const [lastSimilarMovieIndex, setLastSimilarMovieIndex] = useState<number>(4);
  const [firstMovieCastIndex, setFirstMovieCastIndex] = useState<number>(0);
  const [lastMovieCastIndex, setLastMovieCastIndex] = useState<number>(4);

  const dispatch = useDispatch();
  const similarMovies = useSelector(getSimilarMovies);

  let { id } = useParams();
  //@ts-ignore
  id = Number(id?.slice(1, id.length));

  useEffect(() => {
    const getMovieData = async () => {
      const movieData: movie = await getDetails("movie", Number(id));

      setCurrentMovie(movieData);
      setCurrentMovieGenres(movieData.genres);

      const videos = await getMovieOrTvVideosData("movie", movieData.id);
      setCurrentMovieVideos(videos.results);

      const movieCredits = await getMovieOrTvCreditsData("movie", movieData.id);
      setMovieCreditsData(movieCredits);
    };

    getMovieData();
  }, [id]);

  useEffect(() => {
    dispatch(
      // @ts-ignore
      getSimilarMoviesOrTvsData(GET_SIMILAR_MOVIES, "movie", id, 1)
    );
    setFirstSimilarMovieIndex(0);
    setLastSimilarMovieIndex(4);
  }, [id]);

  const isButtonDisabled = !currentMovie?.homepage;

  return (
    <>
      {currentMovie ? (
        <>
          <div className={styles.movieData}>
            <div
              className={`${styles.movieData__poster} ${
                !currentMovie.poster_path
                  ? styles.movieData__poster__whiteBorder
                  : ""
              }`}
              style={{
                backgroundImage: `
          ${
            currentMovie.poster_path
              ? `url(https://image.tmdb.org/t/p/original/${currentMovie.poster_path})`
              : `url(${notFound})`
          }
          `,
              }}
            ></div>
            <div className={styles.movieData__info}>
              {currentMovie.title ? (
                <div className={styles.movieData__info__title}>
                  {currentMovie.original_title}{" "}
                  {currentMovie.release_date
                    ? `(${currentMovie.release_date.slice(0, 4)})`
                    : ""}
                </div>
              ) : (
                ""
              )}
              {currentMovieGenres.length ? (
                <div className={styles.movieData__info__genres}>
                  Genres:{" "}
                  {currentMovieGenres.map((genre) => (
                    <GenreButton
                      genre={genre}
                      isSeparateGenre
                      pageType="movies"
                      key={genre.id}
                    />
                  ))}
                </div>
              ) : (
                ""
              )}
              {currentMovie.overview ? (
                <div className={styles.movieData__info__overview}>
                  {currentMovie.overview}
                </div>
              ) : (
                ""
              )}
              {currentMovie.runtime ? (
                <div className={styles.movieData__info__runTime}>
                  Run Time: {currentMovie.runtime} min
                </div>
              ) : (
                ""
              )}
              <div>
                <button
                  className={`${styles.movieData__info__linkButton} ${
                    isButtonDisabled
                      ? styles.movieData__info__linkButton__disabled
                      : styles.movieData__info__linkButton__notDisabled
                  }`}
                  disabled={isButtonDisabled}
                >
                  {isButtonDisabled ? (
                    "Movie Site"
                  ) : (
                    <a
                      className={styles.movieData__info__linkButton__a}
                      href={`${currentMovie.homepage}`}
                      target="blank"
                    >
                      Movie Site
                    </a>
                  )}
                </button>
              </div>
            </div>
          </div>
          {movieCreditsData?.cast.length ? (
            <div className={styles.creditsContent}>
              <h1>Casts</h1>
              <div className={styles.creditsContent__wrapper}>
                <ScrollButton
                  data={movieCreditsData.cast}
                  firstIndex={firstMovieCastIndex}
                  lastIndex={lastMovieCastIndex}
                  setFirstIndex={setFirstMovieCastIndex}
                  setLastIndex={setLastMovieCastIndex}
                  isNextButton={false}
                />
                {movieCreditsData.cast
                  .slice(firstMovieCastIndex, lastMovieCastIndex)
                  .map((cast) => (
                    <PersonList person={cast} key={cast.id} />
                  ))}
                <ScrollButton
                  data={movieCreditsData.cast}
                  firstIndex={firstMovieCastIndex}
                  lastIndex={lastMovieCastIndex}
                  setFirstIndex={setFirstMovieCastIndex}
                  setLastIndex={setLastMovieCastIndex}
                  isNextButton
                />
              </div>
            </div>
          ) : (
            ""
          )}
          {similarMovies.results.length ? (
            <div className={styles.similarMoviesContent}>
              <h1>Similar Movies</h1>
              <div className={styles.similarMoviesContent__wrapper}>
                <ScrollButton
                  movie={currentMovie}
                  isNextButton={false}
                  data={similarMovies}
                  firstIndex={firstSimilarMovieIndex}
                  lastIndex={lastSimilarMovieIndex}
                  setFirstIndex={setFirstSimilarMovieIndex}
                  setLastIndex={setLastSimilarMovieIndex}
                  valueForDispatch="movie"
                />
                {similarMovies.results
                  .slice(firstSimilarMovieIndex, lastSimilarMovieIndex)
                  .map((movie) => (
                    <div
                      className={styles.similarMoviesContent__wrapper__item}
                      key={movie.id}
                    >
                      <MovieList movie={movie} />
                    </div>
                  ))}
                <ScrollButton
                  movie={currentMovie}
                  isNextButton
                  data={similarMovies}
                  firstIndex={firstSimilarMovieIndex}
                  lastIndex={lastSimilarMovieIndex}
                  setFirstIndex={setFirstSimilarMovieIndex}
                  setLastIndex={setLastSimilarMovieIndex}
                  valueForDispatch="movie"
                />
              </div>
            </div>
          ) : (
            ""
          )}
          <div
            className={`${styles.selectContent} ${
              isWatchSelected ? styles.selectContent__paddingBottom : ""
            }`}
          >
            <div
              onClick={() => {
                setIsTrailerSelected(true);
                setIsWatchSelected(false);
              }}
            >
              <p
                className={`${styles.selectContent__selectText}  ${
                  isTrailerSelected
                    ? styles.selectContent__selectText__selected
                    : ""
                }`}
              >
                Trailer
              </p>
            </div>
            <div
              onClick={() => {
                setIsWatchSelected(true);
                setIsTrailerSelected(false);
              }}
            >
              <p
                className={`${styles.selectContent__selectText} ${
                  isWatchSelected
                    ? styles.selectContent__selectText__selected
                    : ""
                }`}
              >
                Watch
              </p>
            </div>
          </div>
          {isTrailerSelected ? (
            currentMovieVideos.length ? (
              <div className={styles.movieVideos}>
                {currentMovieVideos.slice(0, 10).map((video) => (
                  <div className={styles.movieVideos__item} key={video.id}>
                    <h2>{video.name}</h2>
                    <iframe
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title={video.name}
                    ></iframe>
                  </div>
                ))}
              </div>
            ) : (
              <h1 className={styles.noTrailers}>No Trailers</h1>
            )
          ) : (
            ""
          )}
        </>
      ) : (
        <>
          <div className={styles.skeletonMovieData}>
            <div className={styles.skeletonMovieData__poster}>
              <Skeleton />
            </div>
            <div className={styles.skeletonMovieData__info}>
              <Skeleton className={styles.skeletonMovieData__info__title} />
              <Skeleton className={styles.skeletonMovieData__info__genres} />
              <Skeleton className={styles.skeletonMovieData__info__overview} />
              <Skeleton className={styles.skeletonMovieData__info__runTime} />
              <Skeleton
                className={styles.skeletonMovieData__info__linkButton}
              />
            </div>
          </div>
          <div className={styles.skeletonCreditsContent}>
            <div className={styles.skeletonCreditsContent__titleWrapper}>
              <Skeleton />
            </div>
            <div className={styles.skeletonCreditsContent__wrapper}>
              {Array(4)
                .fill(0)
                .map((_, id) => (
                  <SkeletonPersonList key={id} />
                ))}
            </div>
          </div>
          <div className={styles.skeletonCreditsContent}>
            <div className={styles.skeletonCreditsContent__titleWrapper}>
              <Skeleton />
            </div>
            <div className={styles.skeletonCreditsContent__wrapper}>
              {Array(4)
                .fill(0)
                .map((_, id) => (
                  <SkeletonMovieList key={id} />
                ))}
            </div>
          </div>
          <div className={styles.skeletonSelectContent}>
            <div className={styles.skeletonSelectContent__item}>
              <Skeleton />
            </div>
            <div className={styles.skeletonSelectContent__item}>
              <Skeleton />
            </div>
          </div>
          <div className={styles.skeletonMovieVideos}>
            <div className={styles.skeletonMovieVideos__titleWrapper}>
              <Skeleton />
            </div>
            <div className={styles.skeletonMovieVideos__item}>
              <Skeleton />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MoviePage;
