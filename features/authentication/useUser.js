import { useQuery } from "@tanstack/react-query";
import { getSessionAndUser } from "../../services/apiAuth";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getSessionAndUser,
  });

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
