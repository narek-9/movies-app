import { useDispatch } from "react-redux";
import axios from "axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMmY2YjU4NzEzNGU4MTQ4ZjE5NTBjOWExMjhhZjNjZiIsInN1YiI6IjY0YzI3OTFjMWNmZTNhMGViNDI5YzdhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RjAdrYAKwu741L2FmZCgIO2d30KLltYn9VgGC__JmOg",
  },
};

export const getSearchMoviesOrTvsOrPersonsData = (
  dispatchType: string,
  searchValue: string,
  pageType: "movie" | "tv" | "person",
  pageNumber: number
) => {
  return (dispatch: ReturnType<typeof useDispatch>) => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/${pageType}?query=${searchValue}&include_adult=false&language=en-US&page=${pageNumber}`,
        options
      )
      .then((res) => dispatch({ type: dispatchType, payload: res }));
  };
};
