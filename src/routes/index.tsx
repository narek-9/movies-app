import HomePage from "../pages/HomePage/HomePage";
import MoviePage from "../pages/MoviePage/MoviePage";
import MoviesPage from "../pages/MoviesPage/MoviesPage";
import PersonPage from "../pages/PersonPage/PersonPage";
import PersonsPage from "../pages/PersonsPage/PersonsPage";
import TvPage from "../pages/TvPage/TvPage";
import TvsPage from "../pages/TvsPage/TvsPage";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/movies",
    element: <MoviesPage />,
  },
  {
    path: "/movies/:id",
    element: <MoviePage />,
  },
  {
    path: "/tvs",
    element: <TvsPage />,
  },
  {
    path: "/tvs/:id",
    element: <TvPage />,
  },
  {
    path: "/persons",
    element: <PersonsPage />,
  },
  {
    path: "/persons/:id",
    element: <PersonPage />,
  },
];
