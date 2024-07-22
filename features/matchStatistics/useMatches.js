import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMatchesFromLast24Hours } from "../../services/apiMatch";

export function useMatches() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["matches"],
    queryFn: getMatchesFromLast24Hours,
  });

  return { isLoading, data, error };
}
