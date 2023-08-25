import axios from "axios";
import { useDispatch } from "react-redux";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMmY2YjU4NzEzNGU4MTQ4ZjE5NTBjOWExMjhhZjNjZiIsInN1YiI6IjY0YzI3OTFjMWNmZTNhMGViNDI5YzdhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RjAdrYAKwu741L2FmZCgIO2d30KLltYn9VgGC__JmOg",
  },
};

export const getMoreTopRatedMoviesOrTvsData = (
  dispatchType: string,
  pageType: "movie" | "tv",
  pageNumber: number
) => {
  return (dispatch: ReturnType<typeof useDispatch>) => {
    axios
      .get(
        `https://api.themoviedb.org/3/${pageType}/top_rated?language=en-US&page=${pageNumber}`,
        options
      )
      .then((res) => dispatch({ type: dispatchType, payload: res }));
  };
};
