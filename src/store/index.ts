import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import { moviesReducer } from "./reducers/moviesReducer";
import { tvsReducer } from "./reducers/tvsReducer";
import { searchMultiReducer } from "./reducers/searchMultiReducer";
import { personsReducer } from "./reducers/personsReducer";

const rootReducer = combineReducers({
  movies: moviesReducer,
  tvs: tvsReducer,
  searchMulti: searchMultiReducer,
  persons: personsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
