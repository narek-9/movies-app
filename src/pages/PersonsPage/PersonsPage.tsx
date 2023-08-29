import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMoreTrendingMoviesOrTvsOrPersonsData } from "../../services/asyncActions";
import { getSearchMoviesOrTvsOrPersonsData } from "../../services/asyncActions";
import {
  GET_MORE_PERSONS,
  GET_SEARCHABLE_PERSONS,
  MORE_SEARCHABLE_PERSONS,
} from "../../utils/constants";
import { getAllPersons, getSearchPersons } from "../../store/selectors";

import Search from "../../components/Search/Search";
import MoreButton from "../../components/MoreButton/MoreButton";
import PersonList from "../../components/ui/PersonList/PersonList";

import styles from "./PersonsPage.module.scss";
import Loading from "../../components/ui/Loading/Loading";

const PersonsPage: FC = () => {
  const [searchValue, setSearchValue] = useState<string>(
    localStorage.getItem("searchablePersonsValue") || ""
  );

  const dispatch = useDispatch();
  const allPersons = useSelector(getAllPersons);
  const searchPersons = useSelector(getSearchPersons);

  if (searchValue && searchPersons.page === 0) {
    dispatch(
      // @ts-ignore
      getSearchMoviesOrTvsOrPersonsData(
        GET_SEARCHABLE_PERSONS,
        searchValue,
        "person",
        1
      )
    );
  }

  useEffect(() => {
    if (!allPersons.results.length) {
      dispatch(
        // @ts-ignore
        getMoreTrendingMoviesOrTvsOrPersonsData(GET_MORE_PERSONS, "person", 1)
      );
    }
  }, []);

  return (
    <>
      <Search
        dispatchType={GET_SEARCHABLE_PERSONS}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <div className={styles.content}>
        {searchValue.trim() ? (
          <>
            <h1>Search Results</h1>
            {searchPersons.results.length ? (
              <>
                <div className={styles.content__persons}>
                  {searchPersons.results.map((person) => (
                    <div
                      className={styles.content__persons__item}
                      key={person.id}
                    >
                      <PersonList person={person} />
                    </div>
                  ))}
                </div>
                {searchPersons.results.length ? (
                  searchPersons.page >= 0 ? (
                    <MoreButton
                      dispatchType={MORE_SEARCHABLE_PERSONS}
                      searchValue={searchValue}
                      pageType="persons"
                    />
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </>
            ) : (
              <h1>No Persons</h1>
            )}
          </>
        ) : allPersons.results.length ? (
          <>
            <h1>Persons</h1>
            <div className={styles.content__persons}>
              {allPersons.results.map((person) => (
                <div className={styles.content__persons__item} key={person.id}>
                  <PersonList person={person} />
                </div>
              ))}
            </div>
            {allPersons.results.length ? (
              allPersons.page >= 0 ? (
                <MoreButton
                  dispatchType={GET_MORE_PERSONS}
                  pageType="persons"
                />
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default PersonsPage;
