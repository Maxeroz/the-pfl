// MatchSetupModal.js
import Button from "../../ui/Button";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
} from "@mui/material";
import { useContext, useState } from "react";
import ReusableModalWindow, {
  useReusabelModal,
} from "../../ui/ReusableModalWindow";

function MatchSetupModal({ tableData, handler }) {
  const teams = tableData.map((teamData) => teamData.teamName);

  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [matchDate, setMatchDate] = useState("");

  const { handleClose } = useReusabelModal();

  const handleChangeTeamA = (event) => {
    setTeamA(event.target.value);
  };

  const handleChangeTeamB = (event) => {
    setTeamB(event.target.value);
  };

  const handleChangeMatchDate = (event) => {
    setMatchDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const team1 = {
      team1: teamA,
      team1Id: tableData
        .filter((teamData) => teamData.teamName === teamA)
        ?.at(0)?.id,
      team1ImgUrl: tableData
        .filter((teamData) => teamData.teamName === teamA)
        ?.at(0)?.imageUrl,
    };

    const team2 = {
      team2: teamB,
      team2Id: tableData
        .filter((teamData) => teamData.teamName === teamB)
        ?.at(0)?.id,
      team2ImgUrl: tableData
        .filter((teamData) => teamData.teamName === teamB)
        ?.at(0)?.imageUrl,
    };

    const newMatchObj = {
      ...team1,
      ...team2,
      date: matchDate,
    };

    handler(newMatchObj);
    handleClose();
  };

  const filteredTeamsForTeamA = teams.filter((team) => team !== teamB);
  const filteredTeamsForTeamB = teams.filter((team) => team !== teamA);

  return (
    <>
      <h2>Настройка матча</h2>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <FormControl fullWidth>
            <InputLabel id="teamA">Команда A</InputLabel>
            <Select
              labelId="teamA"
              id="teamA-select"
              value={teamA}
              label="Команда A"
              onChange={handleChangeTeamA}
            >
              {filteredTeamsForTeamA.map((teamName, index) => (
                <MenuItem value={teamName} key={index}>
                  {teamName}
                </MenuItem>
              ))}
            </Select>
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
    </>
  );
}

export default MatchSetupModal;
