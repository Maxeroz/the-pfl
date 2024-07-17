import { configureStore } from "@reduxjs/toolkit";
import leagueReducer from "../features/selectLeague/leagueSlice";
import matchReducer from "../features/matchModal/matchModalSlice";

const store = configureStore({
  reducer: {
    league: leagueReducer,
    match: matchReducer,
  },
});

export default store;
