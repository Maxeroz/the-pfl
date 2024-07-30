import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TableBody,
  Paper,
} from "@mui/material";
import { createContext, useState } from "react";
import styled, { keyframes } from "styled-components";

// Анимация плавного появления
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Создание контекста
const TableContext = createContext();

// Стилизованный контейнер для таблицы с анимацией плавного появления
const StyledTableContainer = styled(TableContainer)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ccc;
  overflow: hidden;
  border-radius: var(--border-radius-lg-pfl);
  animation: ${fadeIn} 0.3s ease-in-out; // Применение анимации
  table-layout: fixed; // Устанавливаем фиксированное расположение таблицы
`;

// Стилизованная ячейка таблицы
const StyledTableCell = styled(TableCell)`
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis; // Добавляем многоточие для длинного текста
  white-space: nowrap; // Не переносить текст на новую строку
`;

// Стилизованная ячейка заголовка таблицы
const HeadTableCell = styled(TableCell)`
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis; // Добавляем многоточие для длинного текста
  white-space: nowrap; // Не переносить текст на новую строку
`;

// Стилизованный заголовок таблицы
const StyledHeading = styled.h2`
  font-size: 1.7rem;
  font-weight: 600;
  text-align: center;
  padding: 10px 0;
  margin: 0;
  border-radius: var(--border-radius-lg-pfl);
`;

function ReusableTableHeading({ title }) {
  return <StyledHeading>{title}</StyledHeading>;
}

function ReusableResultsTable({ children, players, tableTitle, render }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("number");

  const handleRequestSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  // Сортировка игроков по выбранному критерию
  const sortedPlayers = [...players].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Ограничение на 10 строк
  const displayedPlayers = sortedPlayers.slice(0, 10);

  return (
    <TableContext.Provider value={{}}>
      <StyledTableContainer>
        <ReusableTableHeading title={tableTitle} />{" "}
        {/* Используем новый компонент заголовка */}
        <Table
          sx={{ minWidth: 700 }}
          aria-label="simple table"
          component={Paper}
        >
          {children}
          <TableHead>
            <TableRow>
              <HeadTableCell
                sx={{ width: "90px" }}
                sortDirection={orderBy === "number" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "number"}
                  direction={orderBy === "number" ? order : "asc"}
                  onClick={() => handleRequestSort("number")}
                >
                  №
                </TableSortLabel>
              </HeadTableCell>
              <HeadTableCell
                sx={{ width: "170px" }}
                sortDirection={orderBy === "playerName" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "playerName"}
                  direction={orderBy === "playerName" ? order : "asc"}
                  onClick={() => handleRequestSort("playerName")}
                >
                  Имя
                </TableSortLabel>
              </HeadTableCell>
              <HeadTableCell
                sortDirection={orderBy === "teamName" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "teamName"}
                  direction={orderBy === "teamName" ? order : "asc"}
                  onClick={() => handleRequestSort("teamName")}
                >
                  Команда
                </TableSortLabel>
              </HeadTableCell>
              <HeadTableCell
                sortDirection={orderBy === "scored" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "scored"}
                  direction={orderBy === "scored" ? order : "asc"}
                  onClick={() => handleRequestSort("scored")}
                >
                  Г
                </TableSortLabel>
              </HeadTableCell>
              <HeadTableCell
                sortDirection={orderBy === "assists" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "assists"}
                  direction={orderBy === "assists" ? order : "asc"}
                  onClick={() => handleRequestSort("assists")}
                >
                  П
                </TableSortLabel>
              </HeadTableCell>
              <HeadTableCell
                sortDirection={orderBy === "scored_assists" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "scored_assists"}
                  direction={orderBy === "scored_assists" ? order : "asc"}
                  onClick={() => handleRequestSort("scored_assists")}
                >
                  Г+П
                </TableSortLabel>
              </HeadTableCell>
              <HeadTableCell
                sortDirection={orderBy === "games" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "games"}
                  direction={orderBy === "games" ? order : "asc"}
                  onClick={() => handleRequestSort("games")}
                >
                  Игры
                </TableSortLabel>
              </HeadTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedPlayers.map((player, index) => (
              <TableRow key={index}>{render(player)}</TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </TableContext.Provider>
  );
}

ReusableResultsTable.TableHead = TableHead;
ReusableResultsTable.TableRow = TableRow;
ReusableResultsTable.StyledTableCell = StyledTableCell;

export default ReusableResultsTable;
