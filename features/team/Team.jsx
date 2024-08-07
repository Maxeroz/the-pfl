import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useTeam } from "./useTeam";

import Row from "../../ui/Row";
import TeamInfoCard from "./TeamInfoCard";
import LoadingTeamInfo from "./LoadingTeamInfo";
import TeamChart from "./TeamChart";
import LoadingTeamChart from "./LoadingTeamChart";
import TeamChartPagination from "./TeamChartPagination";
import styled from "styled-components";
import Button from "../../ui/Button";

const OperationsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// 1. Create Context
const TeamContext = createContext();

// 2.Parent Component
function Team() {
  // Извлечение параметров из URL
  const { id: teamId } = useParams();

  // Получение leagueId из строки запроса
  const navigate = useNavigate(); // Получаем функцию navigate

  const [searchParams, setSearchParams] = useSearchParams();
  const queryLeagueId = searchParams.get("leagueId");

  const league = useSelector((state) => state.league.leagueTier);
  const currentLeagueId = league.split(" ").slice(-1)[0]; // Исправление: получаем строку

  const [isPointsChart, setIsPointsChart] = useState();

  // Функция обработчик для перехода назад
  const handleBackClick = () => {
    navigate(-1); // Переход на один узел назад
  };

  useEffect(() => {
    // Проверяем, нужно ли действительно обновлять параметры
    if (queryLeagueId !== currentLeagueId) {
      searchParams.set("leagueId", currentLeagueId);
      setSearchParams(searchParams, { replace: true }); // используем replace, чтобы избежать добавления в историю
    }
  }, [currentLeagueId, queryLeagueId, searchParams, setSearchParams]);

  const { isLoading, data: teamData } = useTeam(queryLeagueId, teamId);

  // Проверка, если ли массив с сыгранными матчами, для того чтобы определить, нужно ли отображать график изменения очков команды

  useEffect(() => {
    const pointsChart = teamData?.pointsChart?.length > 0; // true если есть данные
    setIsPointsChart(pointsChart);
  }, [teamData]);

  return (
    <TeamChartPagination>
      <TeamContext.Provider value={{ ...teamData }}>
        <Row gap={2}>
          <OperationsRow>
            <Button onClick={handleBackClick}>Назад</Button>
          </OperationsRow>
          <Row type="horizontal">
            <>
              {isLoading ? <LoadingTeamInfo /> : <TeamInfoCard />}
              {!isLoading && isPointsChart ? (
                <TeamChart />
              ) : (
                <LoadingTeamChart />
              )}
            </>
          </Row>
        </Row>
      </TeamContext.Provider>
    </TeamChartPagination>
  );
}

export function useTeamContext() {
  const context = useContext(TeamContext);
  if (context === undefined)
    throw new Error("TeamContext was used outside TeamProvider");
  return context;
}

export default Team;
