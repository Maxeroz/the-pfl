import { createSlice } from "@reduxjs/toolkit";
import { getLastElement } from "../../utils/helpers";

const initialState = {
  leagueTier: "ПФЛ ЛИГА 1",
  leagueLogo: "logo-pfl1.png",
};

const leagueSlice = createSlice({
  name: "league",
  initialState,
  reducers: {
    setLeague: (state, action) => {
      const imgIndex = getLastElement(action.payload, " ");
      state.leagueTier = action.payload;
      state.leagueLogo = `logo-pfl${imgIndex}.png`;
    },
  },
});

export const { setLeague } = leagueSlice.actions;
export default leagueSlice.reducer;
