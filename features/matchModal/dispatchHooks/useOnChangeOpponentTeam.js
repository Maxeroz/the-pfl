import { useDispatch } from "react-redux";

import { pickOpponentTeam } from "../matchModalSlice";

export function useOnChangeOpponentTeam(teamsToPickOpponent) {
  const dispatch = useDispatch();

  return (e) => {
    const selectedTeamId = e.target.value;
    const selectedTeam = teamsToPickOpponent.find(
      (team) => team.id === selectedTeamId
    );
    dispatch(
      pickOpponentTeam({
        id: selectedTeam.id,
        teamName: selectedTeam.teamName,
        imgUrl: selectedTeam.imageUrl,
      })
    );
  };
}
