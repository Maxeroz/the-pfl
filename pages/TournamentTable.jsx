import React, { useState } from "react";
import styled from "styled-components";
import { useTable } from "../features/table/useTable";
import Loader from "../ui/Loader";
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
} from "@mui/material";
import CreateMatchModal from "../features/matchModal/CreateMatchModal";
import { useDispatch } from "react-redux";

import { pickCurrentTeam } from "../features/matchModal/matchModalSlice";

const StyledTableCell = styled(TableCell)`
  font-size: 14px;
`;

const CenterSpinnerDiv = styled.div`
  display: flex;
  margin: auto 0;
  align-items: center;
  justify-content: center;
`;

const LastGameSpan = styled.span`
  margin: 0 2px;
  padding: 4px;
  border-radius: 4px;
  background-color: ${({ result }) =>
    result === "W" ? "green" : result === "D" ? "yellow" : "red"};
  color: white;
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

function TournamentTable() {
  const { isLoading, tableData } = useTable();
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

  const handleCurrentTeam = (id) => {
    dispatch(pickCurrentTeam(id));
  };

  return (
    <Row>
      <TableTitle>Таблица турнира</TableTitle>

      {isLoading ? (
        <CenterSpinnerDiv>
          <Loader isLoading={isLoading} size={50} display={false} />
        </CenterSpinnerDiv>
      ) : (
        <>
          {/* <Button onClick={handleOpenModal} variant="contained" color="primary">
            Создать матч
          </Button> */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>М</StyledTableCell>
                  <StyledTableCell align="center">Команда</StyledTableCell>
                  <StyledTableCell align="right">И</StyledTableCell>
                  <StyledTableCell align="right">В</StyledTableCell>
                  <StyledTableCell align="right">Н</StyledTableCell>
                  <StyledTableCell align="right">П</StyledTableCell>
                  <StyledTableCell align="right">ГЗ</StyledTableCell>
                  <StyledTableCell align="right">ГП</StyledTableCell>{" "}
                  <StyledTableCell align="right">+/-</StyledTableCell>
                  <StyledTableCell align="right">О</StyledTableCell>
                  <StyledTableCell align="right">
                    Последние игры
                  </StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tableData.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell>{item.place}</StyledTableCell>
                    <StyledTableCell align="right">
                      <TeamName>
                        <StyledImg src={item.imageUrl} />
                        <Button
                          variant="text"
                          sx={{ fontSize: 11 }}
                          onClick={() => {
                            handleCurrentTeam(item.teamName);
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
                    <StyledTableCell align="right">{item.wins}</StyledTableCell>
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
                    </StyledTableCell>{" "}
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
          </TableContainer>
          <CreateMatchModal
            open={isModalOpen}
            handleClose={handleCloseModal}
            teams={tableData} // Передайте данные о командах в модальное окно
            handleSubmit={handleSubmit}
          />
        </>
      )}
    </Row>
  );
}

export default TournamentTable;
