import { useGetTeam } from "./useGetTeam";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLeagueTableByTeamName } from "../../services/apiMatch";
import { useSelector } from "react-redux";

// Функция для получения текущей даты в формате YYYY-MM-DD
const getFormattedDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function useCreateMatch(pickTeam) {
  const queryClient = useQueryClient();

  const teamName = useSelector((state) =>
    pickTeam ? state.match[pickTeam]?.teamName : null
  );

  const { scored, missed } = useSelector((state) =>
    pickTeam ? state.match[pickTeam] || {} : {}
  );

  const draw = scored === missed;
  const win = scored > missed;

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
    const todayDate = getFormattedDate();
    let dateExists = false;

    pointsChart = pointsChart.map((entry) => {
      if (entry.date === todayDate) {
        dateExists = true;
        return {
          ...entry,
          points: entry.points + points,
        };
      }
      return entry;
    });

    if (!dateExists) {
      pointsChart.push({
        date: todayDate,
        points,
      });
    }

    // Сортируем по дате
    pointsChart.sort((a, b) => new Date(a.date) - new Date(b.date));

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
