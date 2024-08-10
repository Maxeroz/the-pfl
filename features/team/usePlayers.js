import { useQuery } from "@tanstack/react-query";
import { getPlayersByTeamId } from "../../services/apiPlayers";

// Хук для получения всех игроков команды по ID из URL
export function usePlayers(teamId) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["allTeamPlayers", teamId],
    queryFn: () => getPlayersByTeamId(teamId),
    enabled: Boolean(teamId), // Запускать только если оба параметра имеют значения
  });

  return { isLoading, data, error };
}
