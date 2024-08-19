import styled from "styled-components";
import TableTitle from "./TableTitle";
import { useSettings } from "../features/selectLeague/useSettings";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { createPortal } from "react-dom";

const StyledContainer = styled.div`
  position: absolute;
  left: -9999px;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  flex-direction: column;
  gap: 20px;
  padding: 20px;

  width: 100%;

  height: 3300px;
`;

const TablesBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  gap: 10px;
`;

const SignatureContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Signature = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function MatchSetUpTableContainer({
  reference,
  teamA,
  teamB,
  playersTeamA,
  playersTeamB,
}) {
  const { settings = [] } = useSettings();
  const { leagueTier } = settings;

  return createPortal(
    <StyledContainer ref={reference}>
      <TableTitle>Название турнира : {leagueTier}</TableTitle>
      <TableTitle>
        {teamA} - {teamB}
      </TableTitle>

      <TablesBox>
        {/* Команда A */}
        <TeamContainer>
          <TableTitle>{teamA}</TableTitle>
          <TableContainer component={Paper} sx={{ width: 700 }}>
            <Table sx={{ width: 700 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 5, fontSize: 20 }}>№</TableCell>
                  <TableCell sx={{ width: 20, fontSize: 20 }}>ФИО</TableCell>
                  <TableCell sx={{ width: 10, fontSize: 20 }}>Голы</TableCell>
                  <TableCell sx={{ width: 10, fontSize: 20 }}>
                    Карточки
                  </TableCell>
                  <TableCell sx={{ width: 10, fontSize: 20 }}>Пасы</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {playersTeamA?.map((player) => (
                  <TableRow
                    key={player.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left" sx={{ fontSize: 15 }}>
                      {player.number}
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: 15 }}>
                      {player.playerName}
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: 15 }}>
                      0
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: 15 }}>
                      0/0
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: 15 }}>
                      0
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TeamContainer>

        {/* Команда B */}
        <TeamContainer>
          <TableTitle>{teamB}</TableTitle>
          <TableContainer component={Paper} sx={{ width: 700 }}>
            <Table sx={{ width: 700 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 5, fontSize: 20 }}>№</TableCell>
                  <TableCell sx={{ width: 20, fontSize: 20 }}>ФИО</TableCell>
                  <TableCell sx={{ width: 10, fontSize: 20 }}>Голы</TableCell>
                  <TableCell sx={{ width: 10, fontSize: 20 }}>
                    Карточки
                  </TableCell>
                  <TableCell sx={{ width: 10, fontSize: 20 }}>Пасы</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {playersTeamB?.map((player) => (
                  <TableRow
                    key={player.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left" sx={{ fontSize: 15 }}>
                      {player.number}
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: 15 }}>
                      {player.playerName}
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: 15 }}>
                      0
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: 15 }}>
                      0/0
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: 15 }}>
                      0
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TeamContainer>
      </TablesBox>

      <SignatureContainer>
        <Signature>
          <span>Подпись капитана команды: {teamA}</span>
        </Signature>
      </SignatureContainer>
    </StyledContainer>,
    document.body
  );
}

export default MatchSetUpTableContainer;
