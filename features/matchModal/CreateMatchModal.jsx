import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { removeStringFromArray } from "../../utils/helpers";

import { pickOpponentTeam, resetMatchState } from "./matchModalSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const CreateMatchModal = ({ open, handleClose, teams, handleSubmit }) => {
  const team1 = useSelector((state) => state.match.currentTeam.teamName);
  const teamsNames = removeStringFromArray(
    teams.map((team) => team.teamName),
    team1
  );

  const team2 = useSelector((state) => state.match.opponentTeam.teamName);

  const dispatch = useDispatch();

  const [score1, setScore1] = useState("");
  const [score2, setScore2] = useState("");

  const onSubmit = () => {
    handleSubmit({ team1, team2, score1, score2 });
    handleClose();
  };

  const handleModalClose = () => {
    // Дополнительная логика при закрытии модального окна
    dispatch(resetMatchState());
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleModalClose}>
      <Box sx={style}>
        <h2>Создать матч</h2>

        <TextField
          select
          label="Команда 1"
          value={team1}
          fullWidth
          margin="normal"
        >
          <MenuItem value={team1}>{team1}</MenuItem>
        </TextField>

        <TextField
          select
          label="Команда 2"
          value={team2}
          onChange={(e) => dispatch(pickOpponentTeam(e.target.value))}
          fullWidth
          margin="normal"
        >
          {teamsNames.map((teamName) => (
            <MenuItem key={teamName} value={teamName}>
              {teamName}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Результат команды 1"
          value={score1}
          onChange={(e) => setScore1(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Результат команды 2"
          value={score2}
          onChange={(e) => setScore2(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button onClick={onSubmit} variant="contained" fullWidth>
          Применить
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateMatchModal;
