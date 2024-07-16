import { configureStore } from "@reduxjs/toolkit";
import leagueReducer from "../features/selectLeague/leagueSlice";

const store = configureStore({
  reducer: {
    league: leagueReducer,
  },
});

export default store;
