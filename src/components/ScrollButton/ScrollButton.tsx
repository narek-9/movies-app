import { FC, Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getMoreTopRatedMoviesOrTvsData } from "../../services/asyncActions";
import { getMoreTrendingMoviesOrTvsOrPersonsData } from "../../services/asyncActions";
import { getSimilarMoviesOrTvsData } from "../../services/asyncActions";
import {
  GET_MORE_SIMILAR_MOVIES,
  GET_MORE_SIMILAR_TVS,
  GET_MORE_TOP_RATED_MOVIES,
  GET_MORE_TOP_RATED_TVS,
  GET_MORE_TRENDING_MOVIES,
  GET_MORE_TRENDING_TVS,
} from "../../utils/constants";
import { movie, tv } from "../../types";

import arrow from "../../assets/arrow.png";

import styles from "./ScrollButton.module.scss";

interface ScrollButtonProps {
  valueForDispatch?:
    | "movie"
    | "tv"
    | "topRatedMovies"
    | "topRatedTvs"
    | "trendingMovies"
    | "trendingTvs";
  movie?: movie | tv;
  isNextButton: boolean;
  data: any;
  firstIndex: number;
  setFirstIndex: Dispatch<SetStateAction<number>>;
  lastIndex: number;
  setLastIndex: Dispatch<SetStateAction<number>>;
}

const ScrollButton: FC<ScrollButtonProps> = ({
  valueForDispatch,
  movie,
  isNextButton,
  data,
  firstIndex,
  lastIndex,
  setFirstIndex,
  setLastIndex,
}) => {
  const [validIndexToDispatch, setValidIndexToDispatch] = useState<number>(12);

  const dispatch = useDispatch();

  useEffect(() => {
    setValidIndexToDispatch(12);
  }, [movie?.id]);

  return isNextButton ? (
    <button
      className={`${styles.button} ${
        valueForDispatch ? styles.button__top180 : styles.button__top100
      } ${styles.button__next} ${
        lastIndex >= (valueForDispatch ? data?.results.length : data.length)
          ? styles.button__disabled
          : ""
      }`}
      onClick={() => {
        setFirstIndex(firstIndex + 4);
        setLastIndex(lastIndex + 4);
        if (lastIndex + 4 === validIndexToDispatch) {
          setValidIndexToDispatch(validIndexToDispatch + 12);

          switch (valueForDispatch) {
            case "movie":
              dispatch(
                // @ts-ignore
                getSimilarMoviesOrTvsData(
                  GET_MORE_SIMILAR_MOVIES,
                  "movie",
                  movie?.id || 0,
                  data.page + 1
                )
              );
              break;

            case "tv":
              dispatch(
                // @ts-ignore
                getSimilarMoviesOrTvsData(
                  GET_MORE_SIMILAR_TVS,
                  "tv",
                  movie?.id || 0,
                  data.page + 1
                )
              );
              break;

            case "topRatedMovies":
              dispatch(
                // @ts-ignore
                getMoreTopRatedMoviesOrTvsData(
                  GET_MORE_TOP_RATED_MOVIES,
                  "movie",
                  data.page + 1
                )
              );
              break;

            case "topRatedTvs":
              dispatch(
                // @ts-ignore
                getMoreTopRatedMoviesOrTvsData(
                  GET_MORE_TOP_RATED_TVS,
                  "tv",
                  data.page + 1
                )
              );
              break;

            case "trendingMovies":
              dispatch(
                // @ts-ignore
                getMoreTrendingMoviesOrTvsOrPersonsData(
                  GET_MORE_TRENDING_MOVIES,
                  "movie",
                  data.page + 1
                )
              );
              break;

            case "trendingTvs":
              dispatch(
                // @ts-ignore
                getMoreTrendingMoviesOrTvsOrPersonsData(
                  GET_MORE_TRENDING_TVS,
                  "tv",
                  data.page + 1
                )
              );
              break;

            default:
              break;
          }
        }
      }}
      disabled={
        lastIndex >= (valueForDispatch ? data?.results.length : data.length)
      }
    >
      <img src={arrow} alt="Next" />
    </button>
  ) : (
    <button
      className={`${styles.button} ${
        valueForDispatch ? styles.button__top180 : styles.button__top100
      } ${styles.button__prev} ${
        firstIndex <= 0 ? styles.button__disabled : ""
      }`}
      onClick={() => {
        setFirstIndex(firstIndex - 4);
        setLastIndex(lastIndex - 4);
      }}
      disabled={firstIndex <= 0}
    >
      <img src={arrow} alt="Previous" />
    </button>
  );
};

export default ScrollButton;
