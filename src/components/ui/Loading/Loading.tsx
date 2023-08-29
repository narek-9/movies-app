import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContainer__load}></div>
    </div>
  );
};

export default Loading;
