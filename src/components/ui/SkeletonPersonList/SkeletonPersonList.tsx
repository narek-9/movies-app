import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";
import styles from "./SkeletonPersonList.module.scss";

const SkeletonPersonList = () => {
  return <Skeleton className={styles.skeletonPerson}/>;
};

export default SkeletonPersonList;
