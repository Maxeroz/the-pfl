import { createSlice } from "@reduxjs/toolkit";

const initialTeamState = {
  id: null,
  teamName: "",
  scored: "",
  missed: "",
  playersScoredGoals: [],
  imgUrl: "",
  isPending: false,
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
      state.currentTeam.id = action.payload.id;
      state.currentTeam.teamName = action.payload.teamName;
      state.currentTeam.imgUrl = action.payload.imgUrl;
    },
    pickOpponentTeam: (state, action) => {
      state.opponentTeam.id = action.payload.id;
      state.opponentTeam.teamName = action.payload.teamName;
      state.opponentTeam.imgUrl = action.payload.imgUrl;
    },
    pickCurrentTeamResult: (state, action) => {
      state.currentTeam.scored = action.payload;
      state.opponentTeam.missed = action.payload;
    },
    pickOpponentTeamResult: (state, action) => {
      state.opponentTeam.scored = action.payload;
      state.currentTeam.missed = action.payload;
    },
    resetMatchState: (state) => {
      state.currentTeam = { ...initialTeamState };
      state.opponentTeam = { ...initialTeamState };
    },
    setIsPending(state, action) {
      state.currentTeam.isPending = action.payload;
    },
    handlePlayerClick: (state, action) => {
      const { team, player } = action.payload;
      const teamKey = team === "currentTeam" ? "currentTeam" : "opponentTeam";
      if (state[teamKey].playersScoredGoals.find((p) => p.id === player.id)) {
        // Удалить игрока, если он уже выбран
        state[teamKey].playersScoredGoals = state[
          teamKey
        ].playersScoredGoals.filter((p) => p.id !== player.id);
      } else {
        state[teamKey].playersScoredGoals.push({
          ...player,
          scored: 0,
        });
      }
    },
    handleGoalsChange: (state, action) => {
      const { team, playerId, scored } = action.payload;
      const teamKey = team === "currentTeam" ? "currentTeam" : "opponentTeam";
      state[teamKey].playersScoredGoals = state[teamKey].playersScoredGoals.map(
        (player) => {
          if (player.id === playerId) {
            const newScored = scored < 0 ? 0 : scored;
            return { ...player, scored: newScored };
          }
          return player;
        }
      );
    },
    handleAssistsChange(state, action) {
      const { team, playerId, assists } = action.payload;
      const currentPlayers =
        team === "currentTeam"
          ? state.currentTeam.playersScoredGoals
          : state.opponentTeam.playersScoredGoals;

      const playerIndex = currentPlayers.findIndex((p) => p.id === playerId);
      if (playerIndex >= 0) {
        currentPlayers[playerIndex].assists = assists;
      }
    },
  },
});

export const {
  setMatchResult,

  pickCurrentTeam,
  pickCurrentTeamResult,

  pickOpponentTeam,
  pickOpponentTeamResult,

  handlePlayerClick,
  handleGoalsChange,
  handleAssistsChange,

  resetMatchState,

  setIsPending,
} = createMatchSlice.actions;

export default createMatchSlice.reducer;
