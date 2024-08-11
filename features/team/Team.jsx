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
import TabelTitle from "../../ui/TableTitle";
import LoadingOperationsRow from "./LoadingOperationsRow";
import PlayersInTeam from "./PlayersInTeam";
import { usePlayers } from "./usePlayers";

import { HiChevronDown } from "react-icons/hi2";
import { useDeleteTeam } from "./useDeleteTeam";
import ReusableModalWindow from "../../ui/ReusableModalWindow";
import DeleteTeamForm from "../../ui/DeleteTeamForm";
import ConfirmAction from "../../ui/ConfirmAction";

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const OperationsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: var(--color-grey-0);

  padding: 10px 20px;
  border-radius: var(--border-radius-lg-pfl);
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const PlayersRow = styled(OperationsRow)``;

// 1. Create Context
const TeamContext = createContext();

// 2.Parent Component
function Team() {
  // Извлечение параметров из URL
  const { id: teamId } = useParams();

  const [isPlayersOpen, setIsPlayersOpen] = useState(false);

  // Функция для открытия таблицы по кнопке
  function togglePlayersOpen() {
    setIsPlayersOpen((prevStae) => !prevStae);
  }

  // Получение leagueId из строки запроса
  const navigate = useNavigate(); // Получаем функцию navigate

  const [searchParams, setSearchParams] = useSearchParams();
  const queryLeagueId = searchParams.get("leagueId");

  const league = useSelector((state) => state.league.leagueTier);
  const currentLeagueId = league.split(" ").slice(-1)[0]; // Исправление: получаем строку

  // Функция для удаления команды из хука
  const { deleteTeam, isPending: isDeletingTeam } = useDeleteTeam();

  const tableName = `league${currentLeagueId}_table`;

  // Получаем данные о команде
  const { isLoading, data: teamData } = useTeam(queryLeagueId, teamId);
  const { isLoading: isLoadingPlayers, data: playersData = [] } =
    usePlayers(teamId);

  const { imageUrl = "" } = teamData;
  // const fileName = imageUrl.split("/").pop().split("?")[0];

  const teamName = teamData.teamName;

  const handleDeleteTeam = () => {
    deleteTeam({ tableName, id: teamId, imageUrl });
  };

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

  // Проверка, если ли массив с сыгранными матчами, для того чтобы определить, нужно ли отображать график изменения очков команды

  // useEffect(() => {
  //   const pointsChart = teamData?.pointsChart?.length > 0; // true если есть данные
  //   setIsPointsChart(pointsChart);
  // }, [teamData]);

  return (
    <TeamChartPagination>
      <TeamContext.Provider value={{ ...teamData, playersData, isPlayersOpen }}>
        <Row gap={2}>
          {isLoading ? (
            <LoadingOperationsRow />
          ) : (
            <OperationsRow>
              <TabelTitle height="small">
                Футбольный клуб: {teamName}
              </TabelTitle>
              <ButtonsContainer>
                <ReusableModalWindow>
                  <ReusableModalWindow.ToggleButton id="deleteTeam">
                    <Button variant="error">Удалить</Button>
                  </ReusableModalWindow.ToggleButton>

                  <ReusableModalWindow.Window id="deleteTeam">
                    <DeleteTeamForm>
                      <ConfirmAction
                        action={{ value: "удалить", target: "команду" }}
                        variant="error"
                        handler={handleDeleteTeam}
                      >
                        Вы действительно желаете
                      </ConfirmAction>
                    </DeleteTeamForm>
                  </ReusableModalWindow.Window>
                </ReusableModalWindow>
                <Button onClick={handleBackClick}>Назад</Button>
              </ButtonsContainer>
            </OperationsRow>
          )}

          <Row type="horizontal">
            <>
              {isLoading ? <LoadingTeamInfo /> : <TeamInfoCard />}
              {!isLoading ? <TeamChart /> : <LoadingTeamChart />}
            </>
          </Row>

          <Row gap={2}>
            <PlayersRow direction="column">
              <TabelTitle height="small">Состав </TabelTitle>

              <StyledButton onClick={togglePlayersOpen}>
                <HiChevronDown />
              </StyledButton>
            </PlayersRow>
            <PlayersInTeam />
          </Row>
          <Row></Row>
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
