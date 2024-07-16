import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/apiProfile";

export function useProfile() {
  const {
    isLoading,
    data: profile,
    error,
  } = useQuery({ queryKey: ["profile"], queryFn: getProfile });

  return { isLoading, profile, error };
}
