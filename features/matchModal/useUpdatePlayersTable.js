import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { updatePlayerById } from "../../services/apiPlayers";

// Хук для обновления данных игроков
export function useUpdatePlayer() {
  // Извлекаем массивы игроков из состояния Redux
  const { playersScoredGoals: playersScoredGoalsCurrentTeam } = useSelector(
    (state) => state.match.currentTeam
  );
  const { playersScoredGoals: playersScoredGoalsOpponentTeam } = useSelector(
    (state) => state.match.opponentTeam
  );

  // Создаем мутацию с помощью useMutation
  const { isLoading, mutateAsync, error } = useMutation({
    mutationFn: async ({ id, data }) => {
      // Вызываем функцию обновления игрока для каждого игрока
      return await updatePlayerById(id, data);
    },
    // Опционально: обработка ошибок
    onError: (error) => {
      console.error("Ошибка обновления игрока:", error);
    },
    // Опционально: обработка успешного обновления
    onSuccess: (data) => {
      console.log("Игрок обновлён успешно:", data);
    },
  });

  // Функция для запуска обновления всех игроков
  const updateAllPlayers = async () => {
    try {
      // Создаем массив с объединенными игроками из обеих команд
      const allPlayers = [
        ...playersScoredGoalsCurrentTeam,
        ...playersScoredGoalsOpponentTeam,
      ];

      console.log(allPlayers);

      // Преобразуем каждый объект игрока в массиве
      const playersToUpdate = allPlayers.map((player) => {
        // Извлекаем количество голов и ассистов для каждого игрока
        const { scored = 0, assists = 0 } = player;

        return {
          id: player.id, // Идентификатор игрока
          data: {
            ...player, // Сохраняем существующие свойства игрока
            games: (player.games || 0) + 1, // Увеличиваем количество игр на 1
            scored, // Используем текущее значение голов
            assists, // Используем текущее значение ассистов
            scored_assists: scored + assists, // Вычисляем новое значение scored_assists
          },
        };
      });

      console.log(playersToUpdate);

      // Перебираем массив и запускаем мутацию для каждого игрока
      for (const { id, data } of playersToUpdate) {
        await mutateAsync({ id, data }); // Используем mutateAsync с двумя аргументами
      }

      console.log("Все игроки обновлены.");
    } catch (error) {
      console.error("Ошибка при обновлении игроков:", error);
    }
  };

  return {
    isLoading, // Используем isLoading вместо isPending
    updateAllPlayers, // Возвращаем функцию для обновления всех игроков
    error,
  };
}
