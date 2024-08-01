import { useGetTeam } from "./useGetTeam";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLeagueTableByTeamName } from "../../services/apiMatch";
import { useSelector } from "react-redux";

export function useCreateMatch(pickTeam) {
  const queryClient = useQueryClient();

  // Проверяем, что pickTeam определен
  const teamName = useSelector((state) =>
    pickTeam ? state.match[pickTeam]?.teamName : null
  );

  const { scored, missed } = useSelector((state) =>
    pickTeam ? state.match[pickTeam] || {} : {}
  );

  const draw = scored === missed;
  const win = scored > missed;

  // Вызываем хук useGetTeam с teamName
  const { data: teamData } = useGetTeam(teamName);

  let updatedTeamRow = null;
  let lastGames = teamData ? [...teamData.lastGames] : [];
  let pointsChart = teamData ? [...teamData.pointsChart] : [];

  if (teamData) {
    let result;
    let points;
    if (draw) {
      result = "D";
      points = 1;
    } else if (win) {
      result = "W";
      points = 3;
    } else {
      result = "L";
      points = 0;
    }

    // Обновляем lastGames
    if (lastGames.length >= 5) {
      lastGames.pop(); // Удаляем последний элемент, если длина массива равна или больше 5
    }
    lastGames.unshift(result); // Добавляем новый элемент в начало массива

    // Обновляем pointsChart
    if (pointsChart.length > 0) {
      // Если массив не пустой, добавляем новый элемент
      const lastPoints = pointsChart[pointsChart.length - 1];
      pointsChart.push(lastPoints + points);
    } else {
      // Если массив пустой, просто добавляем первый элемент
      pointsChart.push(points);
    }

    updatedTeamRow = {
      ...teamData,
      games: teamData.games + 1,
      draws: draw ? teamData.draws + 1 : teamData.draws,
      wins: win ? teamData.wins + 1 : teamData.wins,
      losses: win ? teamData.losses : teamData.losses + 1,
      missed: teamData.missed + Number(missed),
      scored: teamData.scored + Number(scored),
      lastGames: lastGames,
      points: teamData.points + points,
      pointsChart: pointsChart, // Обновляем pointsChart
      difference:
        teamData.scored + Number(scored) - (teamData.missed + Number(missed)),
    };
  }

  const {
    isPending,
    mutate: updateTeamRow,
    error: updatingError,
  } = useMutation({
    mutationFn: () => {
      if (updatedTeamRow) {
        return updateLeagueTableByTeamName(teamName, updatedTeamRow);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["table"]);
    },
  });

  return { updateTeamRow, isPending, updatingError };
}
