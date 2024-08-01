import { useQuery } from "@tanstack/react-query";
import { getTeamInfo as getTeamInfoApi } from "../../services/apiTeam";

export function useTeam(queryLeagueId, teamId) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["team", `teamId${teamId}`],
    queryFn: () => getTeamInfoApi(queryLeagueId, teamId),
    enabled: Boolean(queryLeagueId) && Boolean(teamId), // Запускать только если оба параметра имеют значения
  });

  return { isLoading, data: data || {}, error };
}
