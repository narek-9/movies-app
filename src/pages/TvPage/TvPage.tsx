import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

import { getSimilarMoviesOrTvsData } from "../../services/asyncActions";
import {
  getDetails,
  getMovieOrTvCreditsData,
  getMovieOrTvVideosData,
} from "../../services/api";
import { crew, genre, tv, tvCast, video } from "../../types";
import { GET_MORE_SIMILAR_TVS } from "../../utils/constants";
import { getSimilarTvs } from "../../store/selectors";

import PersonList from "../../components/ui/PersonList/PersonList";
import ScrollButton from "../../components/ScrollButton/ScrollButton";
import MovieList from "../../components/ui/MovieList/MovieList";
import GenreButton from "../../components/GenreButton/GenreButton";
import SkeletonPersonList from "../../components/ui/SkeletonPersonList/SkeletonPersonList";
import SkeletonMovieList from "../../components/ui/SkeletonMoviesList/SkeletonMovieList";

import notFound from "../../assets/not-found.png";

import "react-loading-skeleton/dist/skeleton.css";
import styles from "./TvPage.module.scss";

const TvPage: FC = () => {
  const [currentTv, setCurrentTv] = useState<tv>();
  const [currentTvVideos, setCurrentTvVideos] = useState<video[]>([]);
  const [currentTvGenres, setCurrentTvGenres] = useState<genre[]>([]);
  const [tvCreditsData, setTvCreditsData] = useState<{
    id: number;
    cast: tvCast[];
    crew: crew[];
  }>();
  const [firstSimilarTvIndex, setFirstSimilarTvIndex] = useState<number>(0);
  const [lastSimilarTvIndex, setLastSimilarTvIndex] = useState<number>(4);
  const [firstTvCastIndex, setFirstTvCastIndex] = useState<number>(0);
  const [lastTvCastIndex, setLastTvCastIndex] = useState<number>(4);

  let { id } = useParams();
  //@ts-ignore
  id = Number(id?.slice(1, id.length));

  const dispatch = useDispatch();
  const similarTvs = useSelector(getSimilarTvs);

  useEffect(() => {
    const getTv = async () => {
      const tvData = await getDetails("tv", Number(id));

      setCurrentTv(tvData);
      setCurrentTvGenres(tvData.genres);

      const videos = await getMovieOrTvVideosData("tv", tvData.id);
      setCurrentTvVideos(videos.results);

      const tvCredits = await getMovieOrTvCreditsData("tv", tvData.id);
      setTvCreditsData(tvCredits);
    };

    getTv();
  }, [id]);

  useEffect(() => {
    dispatch(
      // @ts-ignore
      getSimilarMoviesOrTvsData(GET_MORE_SIMILAR_TVS, "tv", id, 1)
    );
    setFirstSimilarTvIndex(0);
    setLastSimilarTvIndex(4);
  }, [id]);

  const isButtonDisabled = !currentTv?.homepage;

  return (
    <>
      {currentTv ? (
        <>
          <div className={styles.tvData}>
            <div
              className={`${styles.tvData__poster} ${
                !currentTv.poster_path ? styles.tvData__poster__whiteBorder : ""
              }`}
              style={{
                backgroundImage: `
            ${
              currentTv.poster_path
                ? `url(https://image.tmdb.org/t/p/original/${currentTv.poster_path})`
                : `url(${notFound})`
            }
            `,
              }}
            ></div>
            <div className={styles.tvData__info}>
              {currentTv.name ? (
                <div className={styles.tvData__info__title}>
                  {currentTv.name}{" "}
                  {currentTv.first_air_date
                    ? `(${currentTv.first_air_date.slice(0, 4)})`
                    : ""}
                </div>
              ) : (
                ""
              )}
              {currentTv.genres.length ? (
                <div className={styles.tvData__info__genres}>
                  Genres:{" "}
                  {currentTvGenres.map((genre) => (
                    <GenreButton
                      genre={genre}
                      isSeparateGenre
                      pageType="tvs"
                      key={genre.id}
                    />
                  ))}
                </div>
              ) : (
                ""
              )}
              {currentTv.overview ? (
                <div className={styles.tvData__info__overview}>
                  {currentTv.overview}
                </div>
              ) : (
                ""
              )}
              {currentTv.episode_run_time.length ? (
                <div className={styles.tvData__info__runTime}>
                  Run Time: {currentTv.episode_run_time[0] + " min"}
                </div>
              ) : (
                ""
              )}
              <div>
                <button
                  className={`${styles.tvData__info__linkButton} ${
                    isButtonDisabled
                      ? styles.tvData__info__linkButton__disabled
                      : styles.tvData__info__linkButton__notDisabled
                  }`}
                  disabled={isButtonDisabled}
                >
                  {isButtonDisabled ? (
                    "TV Site"
                  ) : (
                    <a
                      className={styles.tvData__info__linkButton__a}
                      href={`${currentTv.homepage}`}
                      target="blank"
                    >
                      TV Site
                    </a>
                  )}
                </button>
              </div>
            </div>
          </div>
          {tvCreditsData?.cast.length ? (
            <div className={styles.creditsContent}>
              <h1>Casts</h1>
              <div className={styles.creditsContent__wrapper}>
                <ScrollButton
                  data={tvCreditsData.cast}
                  firstIndex={firstTvCastIndex}
                  lastIndex={lastTvCastIndex}
                  setFirstIndex={setFirstTvCastIndex}
                  setLastIndex={setLastTvCastIndex}
                  isNextButton={false}
                />
                {tvCreditsData.cast
                  .slice(firstTvCastIndex, lastTvCastIndex)
                  .map((cast) => (
                    <PersonList person={cast} key={cast.id} />
                  ))}
                <ScrollButton
                  data={tvCreditsData.cast}
                  firstIndex={firstTvCastIndex}
                  lastIndex={lastTvCastIndex}
                  setFirstIndex={setFirstTvCastIndex}
                  setLastIndex={setLastTvCastIndex}
                  isNextButton
                />
              </div>
            </div>
          ) : (
            ""
          )}
          {similarTvs.results.length ? (
            <div className={styles.similarTvsContent}>
              <h1>Similar TV</h1>
              <div className={styles.similarTvsContent__wrapper}>
                <ScrollButton
                  movie={currentTv}
                  isNextButton={false}
                  data={similarTvs}
                  firstIndex={firstSimilarTvIndex}
                  lastIndex={lastSimilarTvIndex}
                  setFirstIndex={setFirstSimilarTvIndex}
                  setLastIndex={setLastSimilarTvIndex}
                  valueForDispatch="tv"
                />
                {similarTvs.results
                  .slice(firstSimilarTvIndex, lastSimilarTvIndex)
                  .map((tv) => (
                    <div
                      className={styles.similarTvsContent__wrapper__item}
                      key={tv.id}
                    >
                      <MovieList movie={tv} />
                    </div>
                  ))}
                <ScrollButton
                  movie={currentTv}
                  isNextButton
                  data={similarTvs}
                  firstIndex={firstSimilarTvIndex}
                  lastIndex={lastSimilarTvIndex}
                  setFirstIndex={setFirstSimilarTvIndex}
                  setLastIndex={setLastSimilarTvIndex}
                  valueForDispatch="tv"
                />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className={styles.tvVideos}>
            {currentTvVideos.length ? (
              currentTvVideos.slice(0, 10).map((video) => (
                <div key={video.id} className={styles.tvVideos__item}>
                  <h1>{video.name}</h1>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                  ></iframe>
                </div>
              ))
            ) : (
              <h1 className={styles.noTrailers}>No Trailers</h1>
            )}
          </div>
        </>
      ) : (
        <>
          <div className={styles.skeletonTvData}>
            <div className={styles.skeletonTvData__poster}>
              <Skeleton />
            </div>
            <div className={styles.skeletonTvData__info}>
              <Skeleton className={styles.skeletonTvData__info__title} />
              <Skeleton className={styles.skeletonTvData__info__genres} />
              <Skeleton className={styles.skeletonTvData__info__overview} />
              <Skeleton className={styles.skeletonTvData__info__runTime} />
              <Skeleton className={styles.skeletonTvData__info__linkButton} />
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
          <div className={styles.skeletonTvVideos}>
            <div className={styles.skeletonTvVideos__titleWrapper}>
              <Skeleton />
            </div>
            <div className={styles.skeletonTvVideos__item}>
              <Skeleton />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TvPage;
