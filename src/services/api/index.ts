import axios from "axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMmY2YjU4NzEzNGU4MTQ4ZjE5NTBjOWExMjhhZjNjZiIsInN1YiI6IjY0YzI3OTFjMWNmZTNhMGViNDI5YzdhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RjAdrYAKwu741L2FmZCgIO2d30KLltYn9VgGC__JmOg",
  },
};

export const getDetails = async (
  pageType: "movie" | "tv" | "person",
  id: number
) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/${pageType}/${id}?language=en-US`,
    options
  );

  return data;
};

export const getMovieOrTvVideosData = async (
  pageType: "movie" | "tv",
  id: number
) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/${pageType}/${id}/videos?language=en-US`,
    options
  );

  return data;
};

export const getMovieOrTvCreditsData = async (
  pageType: "movie" | "tv",
  id: number
) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/${pageType}/${id}/credits?language=en-US`,
    options
  );

  return data;
};

export const getPersonCreditsData = async (
  creditType: "movie" | "tv",
  person_id: number
) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/person/${person_id}/${creditType}_credits?language=en-US`,
    options
  );

  return data;
};

export const getGenresData = async (pageType: "movie" | "tv") => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/genre/${pageType}/list?language=en`,
    options
  );

  return data;
};
