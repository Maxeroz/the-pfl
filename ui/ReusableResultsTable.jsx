import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  MenuItem,
  Select,
  FormControl,
  TableBody,
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

// 1. Create a context
const TabelContext = createContext();

// 2. Create parent component
const StyledTableContainer = styled(TableContainer)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ccc;
  overflow: hidden;
  border-radius: var(--border-radius-lg-pfl);

  animation: ${fadeIn} 0.3s ease-in-out; // Применение анимации
`;

const StyledSelect = styled(Select)`
  border-radius: var(--border-radius-lg-pfl);
  font-size: 14px;
  letter-spacing: 0.2rem;
  color: var(--color-primary-100);
  padding: 4px 10px;
  background-color: var(--color-primary-900);
  width: 100%;
`;

const StyledFormControl = styled(FormControl)`
  width: 100%;
`;

const StyledTableCell = styled(TableCell)`
  font-size: 13px;
`;

function ReusableTableHeading({ title, setTitle, titleOptions }) {
  return (
    <StyledFormControl variant="outlined">
      <StyledSelect
        labelId="select-label"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        label="Table Heading"
      >
        {titleOptions.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  );
}

function ReusableResultsTable({
  children,
  players,
  initialTitle,
  titleOptions,
  render,
}) {
  const [title, setTitle] = useState(initialTitle || titleOptions[0]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("number");

  const handleRequestSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

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
    <TabelContext.Provider value={{}}>
      <StyledTableContainer>
        <ReusableTableHeading
          title={title}
          setTitle={setTitle}
          titleOptions={titleOptions}
        />
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          {children}
          <TableHead>
            <TableRow>
              <TableCell sortDirection={orderBy === "number" ? order : false}>
                <TableSortLabel
                  active={orderBy === "number"}
                  direction={orderBy === "number" ? order : "asc"}
                  onClick={() => handleRequestSort("number")}
                >
                  №
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={orderBy === "playerName" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "playerName"}
                  direction={orderBy === "playerName" ? order : "asc"}
                  onClick={() => handleRequestSort("playerName")}
                >
                  Имя
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "teamName" ? order : false}>
                <TableSortLabel
                  active={orderBy === "teamName"}
                  direction={orderBy === "teamName" ? order : "asc"}
                  onClick={() => handleRequestSort("teamName")}
                >
                  Команда
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "scored" ? order : false}>
                <TableSortLabel
                  active={orderBy === "scored"}
                  direction={orderBy === "scored" ? order : "asc"}
                  onClick={() => handleRequestSort("scored")}
                >
                  Г
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "assists" ? order : false}>
                <TableSortLabel
                  active={orderBy === "assists"}
                  direction={orderBy === "assists" ? order : "asc"}
                  onClick={() => handleRequestSort("assists")}
                >
                  П
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={orderBy === "scored_assists" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "scored_assists"}
                  direction={orderBy === "scored_assists" ? order : "asc"}
                  onClick={() => handleRequestSort("scored_assists")}
                >
                  Г+П
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "games" ? order : false}>
                <TableSortLabel
                  active={orderBy === "games"}
                  direction={orderBy === "games" ? order : "asc"}
                  onClick={() => handleRequestSort("games")}
                >
                  Игры
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedPlayers.map((player, index) => (
              <TableRow key={index}>{render(player)}</TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </TabelContext.Provider>
  );
}

ReusableResultsTable.TableHead = TableHead;
ReusableResultsTable.TableRow = TableRow;
ReusableResultsTable.StyledTableCell = StyledTableCell;

export default ReusableResultsTable;
