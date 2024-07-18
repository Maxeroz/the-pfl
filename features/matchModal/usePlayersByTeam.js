import { useQuery } from "@tanstack/react-query";
import { getPlayersByTeamName } from "../../services/apiMatch";
import { useSelector } from "react-redux";

export function usePlayersByTeam(teamType) {
  const { teamName = "" } = useSelector((state) => state.match[teamType]);

  const {
    isLoading,
    data: players,
    error,
  } = useQuery({
    queryKey: [`${teamType}`, teamName],
    queryFn: () => getPlayersByTeamName(teamName),
    enabled: !!teamName,
  });

  return { isLoading, players, error };
}
