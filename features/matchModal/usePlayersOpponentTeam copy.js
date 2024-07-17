import { useQuery } from "@tanstack/react-query";
import { getPlayersByTeamName } from "../../services/apiMatch";
import { useSelector } from "react-redux";

export function usePlayersOpponentTeam() {
  const { teamName = "" } = useSelector((state) => state.match.opponentTeam);

  const {
    isLoading,
    data: players,
    error,
  } = useQuery({
    queryKey: ["playersOpponentTeam", teamName],
    queryFn: () => getPlayersByTeamName(teamName),
    enabled: !!teamName,
  });

  return { isLoading, players, error };
}
