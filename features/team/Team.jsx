import { createContext, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { useTeam } from "./useTeam";

import Row from "../../ui/Row";
import TeamInfoCard from "./TeamInfoCard";
import LoadingTeamInfo from "./LoadingTeamInfo";

// 1. Create Context
const TeamContext = createContext();

// 2.Parent Component
function Team() {
  // Извлечение параметров из URL
  const { id: teamId } = useParams();

  // Получение leagueId из строки запроса
  const [searchParams, setSearchParams] = useSearchParams();
  const queryLeagueId = searchParams.get("leagueId");

  const league = useSelector((state) => state.league.leagueTier);
  const currentLeagueId = league.split(" ").slice(-1)[0]; // Исправление: получаем строку

  useEffect(() => {
    // Проверяем, нужно ли действительно обновлять параметры
    if (queryLeagueId !== currentLeagueId) {
      searchParams.set("leagueId", currentLeagueId);
      setSearchParams(searchParams, { replace: true }); // используем replace, чтобы избежать добавления в историю
    }
  }, [currentLeagueId, queryLeagueId, searchParams, setSearchParams]);

  const { isLoading, data: teamData } = useTeam(queryLeagueId, teamId);

  return (
    <TeamContext.Provider value={{ ...teamData }}>
      <Row gap={2}>
        <Row>{isLoading ? <LoadingTeamInfo /> : <TeamInfoCard />}</Row>
      </Row>
    </TeamContext.Provider>
  );
}

export function useTeamContext() {
  const context = useContext(TeamContext);
  if (context === undefined)
    throw new Error("TeamContext was used outside TeamProvider");
  return context;
}

export default Team;
