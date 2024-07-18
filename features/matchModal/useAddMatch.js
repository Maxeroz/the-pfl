import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMatch as addMatchAPI } from "../../services/apiMatch";
import { useSelector } from "react-redux";

export function useAddMatch() {
  const queryClient = useQueryClient();

  // Получение данных текущей команды из Redux
  const {
    id: team1Id,
    teamName: currentTeamName,
    scored: currentTeamScored,
    imgUrl: team1ImgUrl,
  } = useSelector((state) => state.match.currentTeam);

  // Получение данных команды соперника из Redux
  const {
    id: team2Id,
    teamName: opponentTeam,
    scored: opponentTeamScored,
    imgUrl: team2ImgUrl,
  } = useSelector((state) => state.match.opponentTeam);

  // Создание объекта нового матча на основе данных из Redux
  const newMatch = {
    team1Id,
    team1: currentTeamName,
    team1Scored: Number(currentTeamScored),
    team1ImgUrl,
    team2Id,
    team2: opponentTeam,
    team2Scored: Number(opponentTeamScored),
    team2ImgUrl,
  };

  // Использование хука useMutation для создания новой записи матча
  const {
    isPending,
    mutate: addMatch,
    error,
  } = useMutation({
    mutationFn: () => addMatchAPI(newMatch),
    onSuccess: () => queryClient.invalidateQueries(["matches"]),
  });

  // Возвращаем свойства мутации, которые можно использовать в компоненте
  return { addMatch };
}
