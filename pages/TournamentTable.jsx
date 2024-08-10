import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useTable } from "../features/table/useTable";
import Row from "../ui/Row";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableTitle from "../ui/TableTitle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
} from "@mui/material";
import CreateMatchModal from "../features/matchModal/CreateMatchModal";
import { useDispatch } from "react-redux";

import { pickCurrentTeam } from "../features/matchModal/matchModalSlice";
import CenterSpinnerDiv from "../ui/CenterSpinnerDiv";

const StyledTableCell = styled(TableCell)`
  font-size: 14px;

  white-space: nowrap;
`;

const LastGameSpan = styled.span`
  text-align: center;

  // Проверить эти стили
  display: inline-block;
  width: 22px;
  text-align: center;

  margin: 0 1px;
  padding: 4px;
  border-radius: 4px;
  background-color: ${({ result }) =>
    result === "W" ? "#7FB519" : result === "D" ? "#FFD96B" : "#DB2719"};
  color: ${({ result }) => (result === "D" ? "#1f2937" : "#fff")};
`;

const StyledImg = styled.img`
  width: 25px;
  height: 100%;
`;

const TeamName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

// Анимация плавного появления
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledTableContainer = styled(TableContainer)`
  border-radius: var(--border-radius-lg-pfl);
`;

const TableWrapperBlock = styled.div`
  background-color: #f5f5f7;
  border-radius: var(--border-radius-lg-pfl);

  animation: ${fadeIn} 0.5s ease-in-out; // Применение анимации
`;

function TournamentTable() {
  const { isLoading = true, tableData } = useTable();
  const [isModalOpen, setModalOpen] = useState(false);
  // const { currentTeam } = useSelector((state) => state.match);

  const dispatch = useDispatch();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSubmit = (matchData) => {
    console.log("Match Data: ", matchData);
    // Обновите данные таблицы и отправьте их в Supabase
    // Например, можно использовать функцию updateTableData(matchData)
  };

  const handleCurrentTeam = (obj) => {
    dispatch(pickCurrentTeam(obj));
  };

  return (
    <Row gap={2}>
      <TableTitle>Таблица турнира</TableTitle>

      <TableWrapperBlock>
        {isLoading ? (
          <CenterSpinnerDiv />
        ) : (
          <>
            {/* <Button onClick={handleOpenModal} variant="contained" color="primary">
            Создать матч
          </Button> */}
            <StyledTableContainer component={Paper} sx={{ borderRadius: 10 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">М</StyledTableCell>
                    <StyledTableCell align="center">Команда</StyledTableCell>
                    <StyledTableCell align="right">И</StyledTableCell>
                    <StyledTableCell align="right">В</StyledTableCell>
                    <StyledTableCell align="right">Н</StyledTableCell>
                    <StyledTableCell align="right">П</StyledTableCell>
                    <StyledTableCell align="right">ГЗ</StyledTableCell>
                    <StyledTableCell align="right">ГП</StyledTableCell>{" "}
                    <StyledTableCell align="right">+/-</StyledTableCell>
                    <StyledTableCell align="right">О</StyledTableCell>
                    <StyledTableCell align="center">
                      Последние игры
                    </StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {tableData.map((item) => (
                    <TableRow
                      key={item.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <StyledTableCell align="center">
                        {item.place}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <TeamName>
                          <StyledImg src={item.imageUrl} />
                          <Button
                            variant="text"
                            sx={{ fontSize: 11 }}
                            onClick={() => {
                              handleCurrentTeam({
                                teamName: item.teamName,
                                id: item.id,
                                imgUrl: item.imageUrl,
                              });
                              handleOpenModal();
                            }}
                          >
                            {item.teamName}
                          </Button>
                        </TeamName>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.games}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.wins}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.draws}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.losses}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.scored}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.missed}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.difference}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.points}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.lastGames.map((result, index) => (
                          <LastGameSpan key={index} result={result}>
                            {result}
                          </LastGameSpan>
                        ))}
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledTableContainer>
            <CreateMatchModal
              open={isModalOpen}
              handleClose={handleCloseModal}
              teams={tableData} // Передайте данные о командах в модальное окно
              handleSubmit={handleSubmit}
            />
          </>
        )}
      </TableWrapperBlock>
    </Row>
  );
}

export default TournamentTable;
