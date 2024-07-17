import { useQuery } from "@tanstack/react-query";
import { getPlayersByTeamName } from "../../services/apiMatch";
import { useSelector } from "react-redux";

export function usePlayersCurrentTeam() {
  const { teamName = "" } = useSelector((state) => state.match.currentTeam);

  const {
    isLoading,
    data: players,
    error,
  } = useQuery({
    queryKey: ["playersCurrentTeam"],
    queryFn: () => getPlayersByTeamName(teamName),
    enabled: !!teamName,
  });

  return { isLoading, players, error };
}
