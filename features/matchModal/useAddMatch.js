import { useMutation } from "@tanstack/react-query";
import { addMatch as addMatchAPI } from "../../services/apiMatch";
import { useSelector } from "react-redux";

export function useAddMatch() {
  // Получение данных текущей команды из Redux
  const { teamName: currentTeamName, scored: currentTeamScored } = useSelector(
    (state) => state.match.currentTeam
  );

  // Получение данных команды соперника из Redux
  const { teamName: opponentTeam, scored: opponentTeamScored } = useSelector(
    (state) => state.match.opponentTeam
  );

  // Создание объекта нового матча на основе данных из Redux
  const newMatch = {
    team1: currentTeamName,
    team1Scored: Number(currentTeamScored),
    team2: opponentTeam,
    team2Scored: Number(opponentTeamScored),
  };

  // Использование хука useMutation для создания новой записи матча
  const {
    isPending,
    mutate: addMatch,
    error,
  } = useMutation({
    mutationFn: () => addMatchAPI(newMatch),
  });

  // Возвращаем свойства мутации, которые можно использовать в компоненте
  return { addMatch };
}
