import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTransferWindow as updateTransferWindowApi } from "../../services/apiProfile"; // Переименовано для избежания конфликта
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast"; // Импортируйте toast для отображения сообщений

export function useUpdateTransferWindow(transferWindowValue) {
  const queryClient = useQueryClient();

  const league = useSelector((state) => state.league.leagueTier);
  const leagueId = league.split(" ").slice(-1)[0]; // Получаем строку

  const {
    mutate: updateTransferWindow,
    isLoading: isUpdatingTransferWindow,
    data: updatedTransferWindow,
  } = useMutation({
    mutationFn: () => updateTransferWindowApi(leagueId, transferWindowValue),
    onSuccess: () => {
      // Используем toast для успешного уведомления
      toast.success("Трансферное окно обновлено");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isUpdatingTransferWindow,
    updatedTransferWindow,
    updateTransferWindow,
  }; // Не забудьте вернуть функцию mutate
}
