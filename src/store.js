import { configureStore } from "@reduxjs/toolkit";
import leagueReducer from "../features/selectLeague/leagueSlice";
import matchReducer from "../features/matchModal/matchModalSlice";
import userSlice from "../features/authentication/userSlice";

const store = configureStore({
  reducer: {
    league: leagueReducer,
    match: matchReducer,
    user: userSlice,
  },
});

export default store;
