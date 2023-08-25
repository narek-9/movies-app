import { FC } from "react";
import { Link } from "react-router-dom";

import { movieCast, trendingPerson, tvCast } from "../../../types";

import notFound from "../../../assets/not-found.png";

import styles from "./PersonList.module.scss";

interface PersonListProps {
  person: trendingPerson | movieCast | tvCast;
}

const PersonList: FC<PersonListProps> = ({ person }) => {
  return (
    <div className={styles.person}>
      <Link to={`/persons/:${person.id}`} className={styles.person__link}>
        <img
          className={`${styles.person__link__img} ${
            !person.profile_path ? styles.person__link__img__whiteBorder : ""
          }`}
          src={
            person.profile_path
              ? `https://image.tmdb.org/t/p/original/${person.profile_path}`
              : notFound
          }
          alt=""
        />

        <p className={styles.person__link__text}>
          {person.name || "(No data)"}
        </p>
      </Link>
    </div>
  );
};

export default PersonList;
