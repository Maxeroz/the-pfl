// Импорт необходимых библиотек и компонентов из MUI и React
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { removeStringFromArray } from "../../utils/helpers";

import { HiFolderOpen } from "react-icons/hi2";

// Импорт действий из matchModalSlice
import {
  handleGoalsChange,
  handlePlayerClick,
  pickCurrentTeamResult,
  pickOpponentTeam,
  pickOpponentTeamResult,
  resetMatchState,
} from "./matchModalSlice";

// Импорт компонентов для аккордеона из MUI
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

// Импорт кастомных хуков для получения списка игроков команд
import { usePlayersCurrentTeam } from "./usePlayersCurrentTeam";
import { usePlayersOpponentTeam } from "./usePlayersOpponentTeam copy";
import Row from "../../ui/Row";
import { useCreateMatch } from "./useCreateMatch";

// Стили для модального окна
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 460,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
  overflowY: "auto", // Добавляем прокрутку
};

const CreateMatchModal = ({ open, handleClose, teams, handleSubmit }) => {
  const dispatch = useDispatch();

  // Получение игроков текущей команды и команды соперника
  const { players: playersCurrentTeam = [] } = usePlayersCurrentTeam();
  const { players: playersOpponentTeam = [] } = usePlayersOpponentTeam();

  // Селекторы для получения информации о текущей и противоположной командах из состояния
  const {
    teamName: team1,
    scored: score1,
    playersScoredGoals: playersScoredGoalsCurrentTeam,
  } = useSelector((state) => state.match.currentTeam);

  // Хук чтобы получить данные ряда команды
  const { updateTeamRow: updateTeamRowCurrent } = useCreateMatch("currentTeam");
  const { updateTeamRow: updateTeamRowOpponent } =
    useCreateMatch("opponentTeam");

  const {
    teamName: team2,
    scored: score2,
    playersScoredGoals: playersScoredGoalsOpponentTeam,
  } = useSelector((state) => state.match.opponentTeam);

  // Получение названий команд без текущей команды
  const teamsNames = removeStringFromArray(
    teams.map((team) => team.teamName),
    team1
  );

  const onSubmit = () => {
    updateTeamRowCurrent();
    updateTeamRowOpponent();
    // Вызов функции handleSubmit и закрытие модального окна
    // handleSubmit({ team1, team2, score1, score2 });
    handleClose();
  };

  const handleModalClose = () => {
    // Сброс состояния матча и закрытие модального окна
    dispatch(resetMatchState());
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleModalClose}>
      <Box sx={style}>
        <h2>Внести результат матча</h2>

        {/* Выбор первой команды */}
        <TextField
          select
          label="Команда 1"
          value={team1}
          fullWidth
          margin="normal"
        >
          <MenuItem value={team1}>{team1}</MenuItem>
        </TextField>

        {/* Выбор второй команды */}
        <TextField
          select
          label="Команда 2"
          value={team2}
          onChange={(e) => {
            dispatch(pickOpponentTeam(e.target.value));
          }}
          fullWidth
          margin="normal"
        >
          {teamsNames.map((teamName) => (
            <MenuItem key={teamName} value={teamName}>
              {teamName}
            </MenuItem>
          ))}
        </TextField>

        {/* Ввод результата первой команды */}
        <TextField
          label="Результат команды 1"
          value={score1}
          onChange={(e) => dispatch(pickCurrentTeamResult(e.target.value))}
          fullWidth
          margin="normal"
        />

        {/* Ввод результата второй команды */}
        <TextField
          label="Результат команды 2"
          value={score2}
          onChange={(e) => dispatch(pickOpponentTeamResult(e.target.value))}
          fullWidth
          margin="normal"
        />

        <Row gap={2}>
          {/* Аккордеон для игроков текущей команды, забивших голы */}
          <Accordion>
            <AccordionSummary
              expandIcon={<HiFolderOpen />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ fontSize: 13 }}>
                Игроки команды {team1}, забившие гол
              </Typography>
            </AccordionSummary>

            {/* Детали аккордеона с возможностью скролла */}
            <AccordionDetails sx={{ maxHeight: 200, overflowY: "auto" }}>
              {playersCurrentTeam.map((player) => {
                const isSelected = playersScoredGoalsCurrentTeam?.some(
                  (p) => p.id === player.id
                );

                const playerGoals =
                  playersScoredGoalsCurrentTeam?.find((p) => p.id === player.id)
                    ?.scored || 0;

                return (
                  <div
                    key={player.id}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {/* MenuItem для выбора игрока */}
                    <MenuItem
                      value={player.playerName}
                      onClick={() =>
                        dispatch(
                          handlePlayerClick({ team: "currentTeam", player })
                        )
                      }
                      style={{
                        backgroundColor: isSelected ? "lightblue" : "inherit",
                        flexGrow: 1,
                      }}
                    >
                      {player.playerName}
                    </MenuItem>
                    {isSelected && (
                      <TextField
                        type="number"
                        label="Голы"
                        value={playerGoals}
                        onChange={(e) =>
                          dispatch(
                            handleGoalsChange({
                              team: "currentTeam",
                              playerId: player.id,
                              scored: parseInt(e.target.value),
                            })
                          )
                        }
                        style={{ width: 60, marginLeft: 10 }}
                      />
                    )}
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>

          {/* Аккордеон для игроков команды соперника, забивших голы */}
          {team2 && (
            <Accordion>
              <AccordionSummary
                expandIcon={<HiFolderOpen />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography sx={{ fontSize: 13 }}>
                  Игроки команды {team2}, забившие гол
                </Typography>
              </AccordionSummary>

              {/* Детали аккордеона с возможностью скролла */}
              <AccordionDetails sx={{ maxHeight: 200, overflowY: "auto" }}>
                {playersOpponentTeam.map((player) => {
                  const isSelected = playersScoredGoalsOpponentTeam?.some(
                    (p) => p.id === player.id
                  );

                  const playerGoals =
                    playersScoredGoalsOpponentTeam?.find(
                      (p) => p.id === player.id
                    )?.scored || 0;

                  return (
                    <div
                      key={player.id}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {/* MenuItem для выбора игрока */}
                      <MenuItem
                        value={player.playerName}
                        onClick={() =>
                          dispatch(
                            handlePlayerClick({ team: "opponentTeam", player })
                          )
                        }
                        style={{
                          backgroundColor: isSelected ? "lightblue" : "inherit",
                          flexGrow: 1,
                        }}
                      >
                        {player.playerName}
                      </MenuItem>
                      {isSelected && (
                        <TextField
                          type="number"
                          label="Голы"
                          value={playerGoals}
                          onChange={(e) =>
                            dispatch(
                              handleGoalsChange({
                                team: "opponentTeam",
                                playerId: player.id,
                                scored: parseInt(e.target.value),
                              })
                            )
                          }
                          style={{ width: 60, marginLeft: 10 }}
                        />
                      )}
                    </div>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          )}
          {/* Кнопка для подтверждения изменений */}
          <Button onClick={onSubmit} variant="contained" fullWidth>
            Применить
          </Button>
        </Row>
      </Box>
    </Modal>
  );
};

export default CreateMatchModal;
