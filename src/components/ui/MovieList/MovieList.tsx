import { FC } from "react";
import { Link } from "react-router-dom";

import { topRatedMovie, topRatedTv } from "../../../types";

import notFound from "../../../assets/not-found.png";

import styles from "./MovieList.module.scss";

interface MovieListProps {
  movie: topRatedMovie | topRatedTv;
}

const MovieList: FC<MovieListProps> = ({ movie }) => {
  const isMovie = Object.hasOwn(movie, "original_title");

  return isMovie ? (
    <Link to={`/movies/:${movie?.id}`} className={styles.link}>
      <img
        className={`${styles.link__img} ${
          !movie.poster_path ? styles.link__img__whiteBorder : ""
        }`}
        src={
          movie?.poster_path
            ? `https://image.tmdb.org/t/p/original/${movie?.poster_path}`
            : notFound
        }
        alt=""
      />
      <p className={styles.link__text}>
        {
          // @ts-ignore
          movie?.original_title || "no title"
        }
      </p>
    </Link>
  ) : (
    <Link to={`/tvs/:${movie?.id}`} className={styles.link}>
      <img
        className={`${styles.link__img} ${
          !movie.poster_path ? styles.link__img__whiteBorder : ""
        }`}
        src={
          movie?.poster_path
            ? `https://image.tmdb.org/t/p/original/${movie?.poster_path}`
            : notFound
        }
        alt=""
      />
      <p className={styles.link__text}>
        {
          // @ts-ignore
          movie?.name || "no title"
        }
      </p>
    </Link>
  );
};

export default MovieList;
