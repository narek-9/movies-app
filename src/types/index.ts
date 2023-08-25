export interface topRatedMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface topRatedTv {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface trendingTv {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: movieCollection;
  budget: number;
  genres: genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: productionCompanie[];
  production_coutries: productionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: spokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface tv {
  adult: boolean;
  backdrop_path: string;
  created_by: createdBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: episode;
  name: string;
  networks: network[];
  next_episode_to_air: episode;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: productionCompanie[];
  production_coutries: productionCountry[];
  seasons: season[];
  spoken_languages: spokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface movieFromMulti {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface tvFromMulti {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface genre {
  id: number;
  name: string;
}

export interface video {
  id: string;
  iso_639_1: null | string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: true;
  publidhes_at: string;
  site: string;
  size: number;
  type: string;
}

export interface movieImages {
  backdrops: movieBackdrop[];
  id: number;
  logos: movieLogo[];
  posters: moviePoster[];
}

export interface similarTV {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface movieCast {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface tvCast {
  adult: boolean;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface crew {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface trendingPerson {
  adult: boolean;
  gender: number;
  id: number;
  known_for: knownForMovie[] | trendingTv[];
  known_for_department: string;
  media_type: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface person {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

export interface personAsMovieCast {
  adult: boolean;
  backdrop_path: string;
  character: string;
  credit_id: string;
  genre_ids: number[];
  id: number;
  order: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface personAsTvCast {
  adult: boolean;
  backdrop_path: string;
  character: string;
  credit_id: string;
  episode_count: number;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface personAsMovieCrew {
  adult: boolean;
  backdrop_path: string;
  credit_id: string;
  genre_ids: number[];
  id: number;
  job: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface personAsTvCrew {
  adult: boolean;
  backdrop_path: string;
  credit_id: string;
  department: string;
  episode_count: number;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  job: string;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface sortedTv {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  nme: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

interface productionCompanie {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface productionCountry {
  iso_3166_1: string;
  name: string;
}

interface spokenLanguage {
  english_name: string;
  iso_639_1: null | string;
  name: string;
}

interface createdBy {
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  profile_path: any;
}

interface episode {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: string;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

interface network {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

interface movieBackdrop {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: null | string;
  vote_average: number;
  vote_count: number;
  width: number;
}

interface movieLogo {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: null | string;
  vote_average: number;
  vote_count: number;
  width: number;
}

interface moviePoster {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: null | string;
  vote_average: number;
  vote_count: number;
  width: number;
}

interface knownForMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  media_type: "movie" | "tv";
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface movieCollection {
  backdrop_path: string;
  id: number;
  name: string;
  poster_path: string;
}
