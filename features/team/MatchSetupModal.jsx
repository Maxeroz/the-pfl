import Button from "../../ui/Button";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ReusableModalWindow, {
  useReusabelModal,
} from "../../ui/ReusableModalWindow";
import { usePlayers } from "./usePlayers";
import generatePDF from "react-to-pdf";
import MatchSetUpTableContainer from "../../ui/MatchSetUpTableContainer";

function MatchSetupModal({ tableData, handler, teamId }) {
  const teams = tableData.map((teamData) => teamData.teamName);

  const currentTeamName = tableData.find(
    (team) => String(team.id) === String(teamId)
  ).teamName;
  const teamAId = teamId;
  const [teamBId, setTeamBId] = useState();

  const [teamA] = useState(currentTeamName);
  const [teamB, setTeamB] = useState("");
  const [matchDate, setMatchDate] = useState("");

  const targetRef = useRef();

  useEffect(() => {
    if (teamB)
      setTeamBId(tableData.find((team) => team?.teamName === teamB).id);
  }, [teamB]);

  const { data: playersTeamA, error: errorPlayersTeamA } = usePlayers(teamAId);
  const { data: playersTeamB, error: errorPlayersTeamB } = usePlayers(teamBId);

  const { handleClose } = useReusabelModal();

  const team1 = {
    team1: teamA,
    team1Id: tableData.filter((teamData) => teamData.teamName === teamA)?.at(0)
      ?.id,
    team1ImgUrl: tableData
      .filter((teamData) => teamData.teamName === teamA)
      ?.at(0)?.imageUrl,
  };

  const team2 = {
    team2: teamB,
    team2Id: tableData.filter((teamData) => teamData.teamName === teamB)?.at(0)
      ?.id,
    team2ImgUrl: tableData
      .filter((teamData) => teamData.teamName === teamB)
      ?.at(0)?.imageUrl,
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newMatchObj = {
      ...team1,
      ...team2,
      date: matchDate,
    };

    handler(newMatchObj);
    generatePDF(targetRef, { filename: "page.pdf" });
    handleClose();
  };

  const handleChangeTeamB = (event) => {
    setTeamB(event.target.value);
  };

  const handleChangeMatchDate = (event) => {
    setMatchDate(event.target.value);
  };

  const today = new Date().toISOString().slice(0, 16);

  const filteredTeamsForTeamB = teams.filter((team) => team !== teamA);

  return (
    <>
      <h2>Настройка матча</h2>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <FormControl fullWidth>
            <TextField
              id="teamA"
              label="Команда A"
              value={teamA}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              disabled
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="teamB">Команда B</InputLabel>
            <Select
              labelId="teamB"
              id="teamB-select"
              value={teamB}
              label="Команда B"
              onChange={handleChangeTeamB}
            >
              {filteredTeamsForTeamB.map((teamName, index) => (
                <MenuItem value={teamName} key={index}>
                  {teamName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="matchDate"
            label="Дата и время"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            value={matchDate}
            onChange={handleChangeMatchDate}
            required
            inputProps={{
              min: today,
            }}
          />

          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
          >
            <ReusableModalWindow.CloseModal>
              <Button variant="secondary" type="button">
                Отмена
              </Button>
            </ReusableModalWindow.CloseModal>
            <Button type="submit" primary>
              Сохранить
            </Button>
          </div>
        </Box>
      </form>
      <MatchSetUpTableContainer
        teamA={teamA}
        teamB={teamB}
        playersTeamA={playersTeamA}
        playersTeamB={playersTeamB}
        reference={targetRef}
      />
    </>
  );
}

export default MatchSetupModal;
