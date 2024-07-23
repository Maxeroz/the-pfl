import { useQuery } from "@tanstack/react-query";
import { getAllPlayers } from "../../services/apiPlayers";

function useAllPlayers({ tableName }) {
  const {
    isLoadin: isLoadingPlayers,
    data: players,
    error: playersError,
  } = useQuery({
    queryKey: ["players"],
    queryFn: getAllPlayers,
  });

  return { isLoadingPlayers, players, playersError };
}

export default useAllPlayers;
