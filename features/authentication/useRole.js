import { useQuery } from "@tanstack/react-query";
import { getRole } from "../../services/apiAuth";
import { useUser } from "./useUser";

export function useRole() {
  const { user, isLoading: isUserLoading } = useUser();

  // Запрос не выполняется, если данные пользователя еще не загружены или нет ID
  const {
    data: role,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["role", user?.id],
    queryFn: () => (user?.id ? getRole(user.id) : Promise.resolve(null)),
    enabled: !!user?.id, // Запрос будет выполнен только если есть ID
  });

  return {
    role: role ?? null, // Возвращаем только роль
    error,
    isLoading: isUserLoading || isLoading, // Состояние загрузки объединяет оба состояния
  };
}
