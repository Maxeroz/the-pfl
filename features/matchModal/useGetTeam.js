import { useQuery } from "@tanstack/react-query";
import { getTeamRow } from "../../services/apiMatch";

export function useGetTeam(teamName) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["team", teamName],
    queryFn: () => getTeamRow(teamName),
    enabled: !!teamName, // Проверка на null и undefined
  });

  return { data, isLoading, error };
}
