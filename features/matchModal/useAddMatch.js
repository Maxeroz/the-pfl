import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMatch as addMatchAPI } from "../../services/apiMatch";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setIsPending } from "./matchModalSlice";

export function useAddMatch() {
  const queryClient = useQueryClient();

  // Получение данных текущей команды из Redux
  const {
    id: team1Id,
    teamName: currentTeamName,
    scored: currentTeamScored,
    imgUrl: team1ImgUrl,
  } = useSelector((state) => state.match.currentTeam);

  const dispatch = useDispatch();

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
    onSuccess: () => {
      queryClient.invalidateQueries(["matches"]);
    },
  });

  // Использование useEffect для отслеживания изменения isPending
  useEffect(() => {
    if (isPending) {
      dispatch(setIsPending(true));
    } else {
      dispatch(setIsPending(false));
    }
  }, [isPending, dispatch]);

  // Возвращаем свойства мутации, которые можно использовать в компоненте
  return { addMatch, isPending };
}
