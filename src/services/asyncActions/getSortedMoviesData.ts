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

export const getSortedMoviesData = (
  dispatchType: string,
  genres: string,
  pageNumber: number
) => {
  return (dispatch: ReturnType<typeof useDispatch>) => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc&with_genres=${genres}`,
        options
      )
      .then((res) => dispatch({ type: dispatchType, payload: res }));
  };
};
