import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  // InputLabel,
  Select,
  FormControl,
  TableBody,
} from "@mui/material";
import { createContext, useEffect, useState } from "react";
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
      {/* <InputLabel id="select-label">Table Heading</InputLabel> */}
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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function ReusableResultsTable({
  children,
  players,
  initialTitle,
  titleOptions,
  render,
}) {
  const [title, setTitle] = useState(initialTitle || titleOptions[0]);

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
          <TableBody>
            {/* Map through each player and render a TableRow for each */}
            {players.map((player, index) => (
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
