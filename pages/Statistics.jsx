import { useSelector } from "react-redux"; // Импортируем хук для получения данных из Redux store
import ReusableResultsTable from "../ui/ReusableResultsTable"; // Импортируем компонент таблицы результатов
import Row from "../ui/Row"; // Импортируем компонент для управления расположением строк
import TableTitle from "../ui/TableTitle"; // Импортируем компонент для заголовка таблицы
import { useEffect, useState } from "react"; // Импортируем хуки React для управления состоянием и эффектами
import useAllPlayers from "../features/reusableTable/useAllPlayers"; // Хук для получения данных о всех игроках
import { useTable } from "../features/table/useTable"; // Хук для получения данных таблицы
import { addTeamNamesToPlayers } from "../utils/helpers"; // Импортируем вспомогательную функцию для добавления имен команд к игрокам
import { CircularProgress } from "@mui/material"; // Импортируем компонент индикатора загрузки из MUI
import styled from "styled-components"; // Импортируем styled-components для стилизации
import HeaderUserBox from "../ui/HeaderUserBox";
import User from "../ui/User";

// Стилизованный контейнер для индикатора загрузки, выравнивающий его по центру
const CenterSpinnerDiv = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 90vh; // Высота контейнера
`;

// Стилизованный блок для обертки таблицы
const TableWrapperBlock = styled.div`
  background-color: #fafafa; // Фоновый цвет таблицы
  border-radius: var(--border-radius-lg-pfl); // Радиус скругления углов
`;

// Функция рендеринга ячеек таблицы для каждого игрока
function render(player) {
  // Определяем порядок колонок для таблицы
  const order = [
    "number",
    "playerName",
    "teamName",
    "scored",
    "assists",
    "scored_assists",
    "games",
  ];

  // Создаем ячейки таблицы в указанном порядке
  return order.map((key) => (
    <ReusableResultsTable.StyledTableCell key={key}>
      {player[key]} {/* Заполняем ячейку данными из объекта игрока */}
    </ReusableResultsTable.StyledTableCell>
  ));
}

function Statistics() {
  // Состояние для обновленных данных игроков с добавленными именами команд
  const [updatedPlayersWithTeamNames, setUpdatedPlayersWithTeamNames] =
    useState([]);

  // Извлекаем текущий уровень лиги из Redux store
  const { leagueTier = "" } = useSelector((state) => state?.league?.leagueTier);

  // Используем хук для получения данных о всех игроках и индикаторе загрузки
  const { players = [], isLoadingPlayers } = useAllPlayers(leagueTier);

  // Используем хук для получения данных таблицы и индикатора загрузки
  const { tableData = [], isLoading: isLoadingTable } = useTable();

  // Определяем общее состояние загрузки
  const isLoading = isLoadingPlayers || isLoadingTable;

  useEffect(() => {
    // Обновляем данные игроков, когда получены данные игроков и таблицы
    if (players.length > 0 && tableData.length > 0) {
      // Добавляем имена команд к игрокам и обновляем состояние
      const updatedPlayers = addTeamNamesToPlayers(players, tableData);
      setUpdatedPlayersWithTeamNames(updatedPlayers);
    }
  }, [players, tableData]); // Зависимости эффекта: данные игроков и таблицы

  return (
    <Row gap={2}>
      <HeaderUserBox>
        <TableTitle>Статистика</TableTitle> {/* Заголовок таблицы */}
        <User />
      </HeaderUserBox>

      <TableWrapperBlock>
        {isLoading ? (
          <CenterSpinnerDiv>
            <CircularProgress /> {/* Индикатор загрузки */}
          </CenterSpinnerDiv>
        ) : (
          <>
            <Row type="horizontal" gap={3}>
              <ReusableResultsTable
                initialTitle="Лучшие бомбардиры" // Начальный заголовок таблицы
                tableTitle="Статистика игроков" // Заголовок таблицы
                players={updatedPlayersWithTeamNames} // Передаем обновленные данные игроков
                render={render} // Функция рендеринга ячеек таблицы
              ></ReusableResultsTable>
            </Row>
          </>
        )}
      </TableWrapperBlock>
    </Row>
  );
}

export default Statistics;
