import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getDetails, getPersonCreditsData } from "../../services/api";
import {
  person,
  personAsMovieCast,
  personAsMovieCrew,
  personAsTvCast,
  personAsTvCrew,
} from "../../types";

import MovieList from "../../components/ui/MovieList/MovieList";

import notFound from "../../assets/not-found.png";

import styles from "./PersonPage.module.scss";

const PersonPage: FC = () => {
  const [currentPerson, setCurrentPerson] = useState<person>();
  const [isBiographyVisible, setIsBiographyVisible] = useState<boolean>(false);
  const [personMovieCreditsData, setPersonMovieCreditsData] = useState<{
    id: number;
    cast: personAsMovieCast[];
    crew: personAsMovieCrew[];
  }>();
  const [personTvCreditsData, setPersonTvCreditsData] = useState<{
    id: number;
    cast: personAsTvCast[];
    crew: personAsTvCrew[];
  }>();

  const [selectedValue, setSelectedValue] = useState<string>(
    localStorage.getItem("selectedPersonCredit") || "movies as cast"
  );

  let { id } = useParams();
  //@ts-ignore
  id = Number(id?.slice(1, id.length));

  useEffect(() => {
    const getPersonData = async () => {
      const personData: person = await getDetails("person", Number(id));

      const personMovieCredits = await getPersonCreditsData(
        "movie",
        personData.id
      );
      setPersonMovieCreditsData(personMovieCredits);

      const personTvCredits = await getPersonCreditsData("tv", personData.id);
      setPersonTvCreditsData(personTvCredits);

      setCurrentPerson(personData);
    };

    getPersonData();

    localStorage.setItem("selectedPersonCredit", "movies as cast");
  }, [id]);

  const isButtonDisabled = !currentPerson?.homepage;

  const birthYear = currentPerson?.birthday.slice(0, 4);
  let birthMonth = currentPerson?.birthday.slice(5, 7);
  const birthDay = currentPerson?.birthday.slice(8, 10);

  const deathYear = currentPerson?.deathday?.slice(0, 4);
  let deathMonth = currentPerson?.deathday?.slice(5, 7);
  const deathDay = currentPerson?.deathday?.slice(8, 10);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();

  let personAge = 0;

  if (currentPerson?.deathday) {
    personAge = Number(deathYear) - Number(birthYear);

    if (Number(deathMonth) < Number(birthMonth)) {
      personAge -= 1;
    } else if (
      Number(deathMonth) === Number(birthMonth) &&
      Number(deathDay) < Number(birthDay)
    ) {
      personAge -= 1;
    }
  } else {
    personAge = currentYear - Number(birthYear);
    if (currentMonth + 1 < Number(birthMonth)) {
      personAge -= 1;
    } else if (
      currentMonth + 1 === Number(birthMonth) &&
      Number(currentDay) < Number(birthDay)
    ) {
      personAge -= 1;
    }
  }

  switch (birthMonth) {
    case "01":
      birthMonth = "January";
      break;
    case "02":
      birthMonth = "February";
      break;
    case "03":
      birthMonth = "March";
      break;
    case "04":
      birthMonth = "April";
      break;
    case "05":
      birthMonth = "May";
      break;
    case "06":
      birthMonth = "June";
      break;
    case "07":
      birthMonth = "July";
      break;
    case "08":
      birthMonth = "August";
      break;
    case "09":
      birthMonth = "September";
      break;
    case "10":
      birthMonth = "October";
      break;
    case "11":
      birthMonth = "November";
      break;
    case "12":
      birthMonth = "December";
      break;
  }

  if (currentPerson?.deathday) {
    switch (deathMonth) {
      case "01":
        deathMonth = "January";
        break;
      case "02":
        deathMonth = "February";
        break;
      case "03":
        deathMonth = "March";
        break;
      case "04":
        deathMonth = "April";
        break;
      case "05":
        deathMonth = "May";
        break;
      case "06":
        deathMonth = "June";
        break;
      case "07":
        deathMonth = "July";
        break;
      case "08":
        deathMonth = "August";
        break;
      case "09":
        deathMonth = "September";
        break;
      case "10":
        deathMonth = "October";
        break;
      case "11":
        deathMonth = "November";
        break;
      case "12":
        deathMonth = "December";
        break;
    }
  }

  return (
    <>
      {currentPerson ? (
        <>
          <div className={styles.personData}>
            <div
              className={styles.personData__poster}
              style={{
                backgroundImage: `
            ${
              currentPerson.profile_path
                ? `url(https://image.tmdb.org/t/p/original/${currentPerson.profile_path})`
                : `url(${notFound})`
            }
            `,
              }}
            ></div>
            <div className={styles.personData__info}>
              {currentPerson.name ? (
                <div className={styles.personData__info__name}>
                  {currentPerson.name}
                </div>
              ) : (
                ""
              )}
              {currentPerson.birthday ? (
                <div className={styles.personData__info__ageInfo}>
                  <div>
                    Birthday: {birthDay} {birthMonth} {birthYear}{" "}
                    {currentPerson.deathday ? "" : `(${personAge} yo)`} (
                    {currentPerson.place_of_birth})
                  </div>
                </div>
              ) : (
                ""
              )}
              {currentPerson.deathday ? (
                <div className={styles.personData__info__deathDayInfo}>
                  <div>
                    Deathday: {deathDay} {deathMonth} {deathYear} ({personAge}{" "}
                    yo)
                  </div>
                </div>
              ) : (
                ""
              )}
              {currentPerson.also_known_as ? (
                <div className={styles.personData__info__alsoKnownAs}>
                  Also known as:{" "}
                  {currentPerson.also_known_as.slice(0, 3).join(",")}
                </div>
              ) : (
                ""
              )}
              {currentPerson.biography ? (
                <div className={styles.personData__info__biography}>
                  <span>
                    Biography:{" "}
                    <small
                      className="see"
                      onClick={() => setIsBiographyVisible((prev) => !prev)}
                    >
                      {isBiographyVisible ? "Hide" : "See"}
                    </small>
                  </span>
                  {isBiographyVisible ? (
                    <div>{currentPerson.biography}</div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}

              <div>
                <button
                  className={`${styles.personData__info__linkButton} ${
                    isButtonDisabled
                      ? styles.personData__info__linkButton__disabled
                      : styles.personData__info__linkButton__notDisabled
                  }`}
                  disabled={isButtonDisabled}
                >
                  {isButtonDisabled ? (
                    "Person Site"
                  ) : (
                    <a
                      className={styles.personData__info__linkButton__a}
                      href={`${currentPerson.homepage}`}
                      target="blank"
                    >
                      Person Site
                    </a>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className={styles.selectCredit}>
            <p
              className={`${styles.selectCredit__text} ${
                selectedValue === "movies as cast"
                  ? styles.selectCredit__text__selected
                  : ""
              }`}
              onClick={() => {
                setSelectedValue("movies as cast");
                localStorage.setItem("selectedPersonCredit", "movies as cast");
              }}
            >
              {currentPerson.name} Movies as cast
            </p>
            <p
              className={`${styles.selectCredit__text} ${
                selectedValue === "tvs as cast" &&
                styles.selectCredit__text__selected
              }`}
              onClick={() => {
                setSelectedValue("tvs as cast");
                localStorage.setItem("selectedPersonCredit", "tvs as cast");
              }}
            >
              {currentPerson.name} TV as cast
            </p>
            <p
              className={`${styles.selectCredit__text} ${
                selectedValue === "movies as crew"
                  ? styles.selectCredit__text__selected
                  : ""
              }`}
              onClick={() => {
                setSelectedValue("movies as crew");
                localStorage.setItem("selectedPersonCredit", "movies as crew");
              }}
            >
              {currentPerson.name} Movies as crew
            </p>
            <p
              className={`${styles.selectCredit__text} ${
                selectedValue === "tvs as crew"
                  ? styles.selectCredit__text__selected
                  : ""
              }`}
              onClick={() => {
                setSelectedValue("tvs as crew");
                localStorage.setItem("selectedPersonCredit", "tvs as crew");
              }}
            >
              {currentPerson.name} TV as crew
            </p>
          </div>

          <div className={styles.content}>
            <h1>
              {currentPerson.name || "Person"}
              {selectedValue === "movies as cast"
                ? "Movies as cast"
                : selectedValue === "tvs as cast"
                ? "TV as cast"
                : selectedValue === "movies as crew"
                ? "Movies as crew"
                : "TV as crew"}
            </h1>
            {selectedValue === "movies as cast" &&
              (personMovieCreditsData?.cast.length ? (
                <div className={styles.content__creditContent}>
                  {personMovieCreditsData.cast.map((movie) => (
                    <div
                      className={styles.content__creditContent__item}
                      key={movie.id}
                    >
                      <MovieList movie={movie} />
                    </div>
                  ))}
                </div>
              ) : (
                <h1 className={styles.content__noData}>No Movies</h1>
              ))}
            {selectedValue === "tvs as cast" &&
              (personTvCreditsData?.cast.length ? (
                <div className={styles.content__creditContent}>
                  {personTvCreditsData.cast.map((movie) => (
                    <div
                      className={styles.content__creditContent__item}
                      key={movie.id}
                    >
                      <MovieList movie={movie} />
                    </div>
                  ))}
                </div>
              ) : (
                <h1 className={styles.content__noData}>No TV</h1>
              ))}
            {selectedValue === "movies as crew" &&
              (personMovieCreditsData?.crew.length ? (
                <div className={styles.content__creditContent}>
                  {personMovieCreditsData.crew.map((movie) => (
                    <div
                      className={styles.content__creditContent__item}
                      key={movie.id}
                    >
                      <MovieList movie={movie} />
                    </div>
                  ))}
                </div>
              ) : (
                <h2 className={styles.content__noData}>No Movies</h2>
              ))}
            {selectedValue === "tvs as crew" &&
              (personTvCreditsData?.crew.length ? (
                <div className={styles.content__creditContent}>
                  (
                  {personTvCreditsData.crew.map((movie) => (
                    <div
                      className={styles.content__creditContent__item}
                      key={movie.id}
                    >
                      <MovieList movie={movie} />
                    </div>
                  ))}
                  )
                </div>
              ) : (
                <h2 className={styles.content__noData}>No TV</h2>
              ))}
          </div>
        </>
      ) : (
        <>
          <div className={styles.artificialPersonData}>
            <div className={styles.artificialPersonData__poster}></div>
            <div className={styles.artificialPersonData__info}>
              <div className={styles.artificialPersonData__info__name}></div>
              <div className={styles.artificialPersonData__info__ageInfo}></div>
              <div
                className={styles.artificialPersonData__info__alsoKnownAs}
              ></div>
              <div
                className={styles.artificialPersonData__info__biography}
              ></div>
              <div
                className={styles.artificialPersonData__info__linkButton}
              ></div>
            </div>
          </div>
          <div className={styles.artificialSelectCredit}>
            <div className={styles.artificialSelectCredit__text}></div>
            <div className={styles.artificialSelectCredit__text}></div>
            <div className={styles.artificialSelectCredit__text}></div>
            <div className={styles.artificialSelectCredit__text}></div>
          </div>
          <div className={styles.artificialSelectContent}>
            <div className={styles.artificialSelectContent__title}></div>
            <div className={styles.artificialSelectContent__wrapper}>
              <div
                className={styles.artificialSelectContent__wrapper__item}
              ></div>
              <div
                className={styles.artificialSelectContent__wrapper__item}
              ></div>
              <div
                className={styles.artificialSelectContent__wrapper__item}
              ></div>
              <div
                className={styles.artificialSelectContent__wrapper__item}
              ></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PersonPage;
