import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";
import styles from "./SkeletonMovieList.module.scss";

const SkeletonMovieList = () => {
  return <Skeleton className={styles.skeletonMovie} />;
};

export default SkeletonMovieList;
