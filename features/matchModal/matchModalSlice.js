import { createSlice } from "@reduxjs/toolkit";

const initialTeamState = {
  teamName: "",
  scored: 0,
  missed: 0,
};

const initialState = {
  currentTeam: { ...initialTeamState },
  opponentTeam: { ...initialTeamState },
};

const createMatchSlice = createSlice({
  name: "createMatch",
  initialState,
  reducers: {
    setMatchResult: (state, action) => {
      state.currentTeam = action.payload.currentTeam;
      state.opponentTeam = action.payload.opponentTeam;
    },
    pickCurrentTeam: (state, action) => {
      state.currentTeam.teamName = action.payload;
    },
    pickOpponentTeam: (state, action) => {
      state.opponentTeam.teamName = action.payload;
    },
    resetMatchState: (state) => {
      state.currentTeam = { ...initialTeamState };
      state.opponentTeam = { ...initialTeamState };
    },
  },
});

export const {
  setMatchResult,
  pickCurrentTeam,
  pickOpponentTeam,
  resetMatchState,
} = createMatchSlice.actions;

export default createMatchSlice.reducer;
