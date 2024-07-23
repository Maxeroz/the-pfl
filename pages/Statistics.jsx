import { useSelector } from "react-redux";
import ReusableResultsTable from "../ui/ReusableResultsTable";
import Row from "../ui/Row";
import TableTitle from "../ui/TableTitle";
import { useEffect, useState } from "react";
import useAllPlayers from "../features/reusableTable/useAllPlayers";
import { useTable } from "../features/table/useTable";
import { addTeamNamesToPlayers } from "../utils/helpers";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const titpleOptions = ["Лучшие бомбардиры", "Лучшие ассистенты"];

const CenterSpinnerDiv = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;

  height: 90vh;
`;

const TableWrapperBlock = styled.div`
  background-color: #f5f5f7;
  border-radius: var(--border-radius-lg-pfl);
`;

// Функция render
function render(player) {
  const order = [
    "number",
    "playerName",
    "teamName",
    "scored",
    "assists",
    "scored_assists",
    "games",
  ];

  return order.map((key) => (
    <ReusableResultsTable.StyledTableCell key={key}>
      {player[key]}
    </ReusableResultsTable.StyledTableCell>
  ));
}

function Statistics() {
  const [updatedPlayersWithTeamNames, setUpdatedPlayersWithTeamNames] =
    useState([]);
  const { leagueTier = "" } = useSelector((state) => state?.league?.leagueTier);

  const { players = [], isLoadingPlayers } = useAllPlayers(leagueTier);
  const { tableData = [], isLoading: isLoadingTable } = useTable();

  const isLoading = isLoadingPlayers || isLoadingTable;

  useEffect(() => {
    setUpdatedPlayersWithTeamNames(addTeamNamesToPlayers(players, tableData));
  }, [players, tableData]);

  return (
    <Row gap={3}>
      <Row>
        <TableTitle>Статистика</TableTitle>
      </Row>

      <TableWrapperBlock>
        {isLoading ? (
          <CenterSpinnerDiv>
            <CircularProgress />
          </CenterSpinnerDiv>
        ) : (
          <>
            <Row type="horizontal" gap={3}>
              <ReusableResultsTable
                titleOptions={titpleOptions}
                initialTitle="Лучшие бомбардиры"
                players={updatedPlayersWithTeamNames}
                render={render}
              >
                <ReusableResultsTable.TableHead>
                  <ReusableResultsTable.TableRow>
                    <ReusableResultsTable.StyledTableCell>
                      №
                    </ReusableResultsTable.StyledTableCell>
                    <ReusableResultsTable.StyledTableCell>
                      Имя
                    </ReusableResultsTable.StyledTableCell>
                    <ReusableResultsTable.StyledTableCell>
                      Команда
                    </ReusableResultsTable.StyledTableCell>
                    <ReusableResultsTable.StyledTableCell>
                      Г
                    </ReusableResultsTable.StyledTableCell>
                    <ReusableResultsTable.StyledTableCell>
                      П
                    </ReusableResultsTable.StyledTableCell>
                    <ReusableResultsTable.StyledTableCell>
                      Г+П
                    </ReusableResultsTable.StyledTableCell>
                    <ReusableResultsTable.StyledTableCell>
                      Игры
                    </ReusableResultsTable.StyledTableCell>
                  </ReusableResultsTable.TableRow>
                </ReusableResultsTable.TableHead>
              </ReusableResultsTable>
              {/* <ReusableResultsTable title="Список Ассистентов" /> */}
            </Row>
          </>
        )}
      </TableWrapperBlock>
    </Row>
  );
}

export default Statistics;
