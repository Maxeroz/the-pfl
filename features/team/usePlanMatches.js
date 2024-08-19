import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getFirstThreeMatchesById } from "../../services/apiMatch";

export function usePlanMatches() {
  const { id: teamId } = useParams();

  const {
    data: planMatches,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["planMatches", teamId],
    queryFn: () => getFirstThreeMatchesById(teamId),
    enabled: !!teamId, // Запуск только если teamId существует
  });

  return { planMatches, error, isLoading };
}
