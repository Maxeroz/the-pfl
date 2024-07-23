import { useQuery } from "@tanstack/react-query";
import { getPlayersByTeamId } from "../../services/apiMatch";
import { useSelector } from "react-redux";

export function usePlayersByTeam(teamType) {
  const { id: teamId = null, teamName = "" } = useSelector(
    (state) => state.match[teamType]
  );

  const {
    isLoading,
    data: players,
    error,
  } = useQuery({
    queryKey: [`${teamType}`, teamName],
    queryFn: () => getPlayersByTeamId(teamId),
    enabled: !!teamName,
  });

  return { isLoading, players, error };
}
