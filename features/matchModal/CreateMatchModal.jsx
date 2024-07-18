// Импорт необходимых компонентов из MUI и React
import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { HiFolderOpen } from "react-icons/hi2";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import Row from "../../ui/Row";
import LoadingModal from "../../ui/LoadingModal";
import { removeObjectById } from "../../utils/helpers";
import { useCreateMatch } from "./useCreateMatch";
import { usePlayersByTeam } from "./usePlayersByTeam";
import { useAddMatch } from "./useAddMatch";
import {
  handleGoalsChange,
  handlePlayerClick,
  pickCurrentTeamResult,
  pickOpponentTeam,
  pickOpponentTeamResult,
  resetMatchState,
} from "./matchModalSlice";

// Стили для модального окна
const style = {
  borderRadius: 3,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 460,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
  overflowY: "auto",
};

const CreateMatchModal = ({ open, handleClose, teams }) => {
  const dispatch = useDispatch();

  // Получение списка игроков текущей и противоположной команды
  const { players: playersCurrentTeam = [] } = usePlayersByTeam("currentTeam");
  const { players: playersOpponentTeam = [] } =
    usePlayersByTeam("opponentTeam");

  // Получение данных о текущей и противоположной командах из Redux состояния
  const {
    id: team1Id,
    teamName: team1,
    scored: score1,
    playersScoredGoals: playersScoredGoalsCurrentTeam,
  } = useSelector((state) => state.match.currentTeam);
  const {
    id: team2Id,
    teamName: team2,
    scored: score2,
    playersScoredGoals: playersScoredGoalsOpponentTeam,
  } = useSelector((state) => state.match.opponentTeam);

  // Хуки для обновления данных команды текущей и противоположной команды
  const { updateTeamRow: updateTeamRowCurrent, isPending: isPendingCurrent } =
    useCreateMatch("currentTeam");
  const { updateTeamRow: updateTeamRowOpponent, isPending: isPendingOpponent } =
    useCreateMatch("opponentTeam");

  // Формирование списка команд без текущей команды
  const teamsToPickOpponent = removeObjectById(teams, team1Id);

  const { addMatch } = useAddMatch();

  // Обработчик подтверждения изменений (submit)
  const onSubmit = async () => {
    // Асинхронное обновление данных команд и добавление матча
    await Promise.all([
      updateTeamRowCurrent(),
      updateTeamRowOpponent(),
      addMatch(),
    ]);
    // Сбрасываем состояние матча и закрываем модальное окно
    dispatch(resetMatchState());
    handleClose();
  };

  // Обработчик закрытия модального окна
  const handleModalClose = () => {
    // Сбрасываем состояние матча и закрываем модальное окно
    dispatch(resetMatchState());
    handleClose();
  };

  return (
    <>
      {/* Модальное окно */}
      <Modal open={open} onClose={handleModalClose}>
        <Box sx={style}>
          <h2>Внести результат матча</h2>

          {/* Выбор команды 1 */}
          <TextField
            select
            label="Команда 1"
            value={team1}
            fullWidth
            margin="normal"
            disabled
          >
            <MenuItem value={team1}>{team1}</MenuItem>
          </TextField>

          {/* Выбор команды 2 */}
          <TextField
            select
            label="Команда 2"
            value={team2Id || ""}
            onChange={(e) => {
              const selectedTeamId = e.target.value;
              const selectedTeam = teamsToPickOpponent.find(
                (team) => team.id === selectedTeamId
              );
              console.log(selectedTeam);
              dispatch(
                pickOpponentTeam({
                  id: selectedTeam.id,
                  teamName: selectedTeam.teamName,
                  imgUrl: selectedTeam.imageUrl,
                })
              );
            }}
            fullWidth
            margin="normal"
          >
            {teamsToPickOpponent.map((team) => (
              <MenuItem key={team.id} value={team.id}>
                {team.teamName}
              </MenuItem>
            ))}
          </TextField>

          {/* Ввод результатов команд */}
          <TextField
            label="Результат команды 1"
            value={score1}
            onChange={(e) => dispatch(pickCurrentTeamResult(e.target.value))}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Результат команды 2"
            value={score2}
            onChange={(e) => dispatch(pickOpponentTeamResult(e.target.value))}
            fullWidth
            margin="normal"
          />

          <Row gap={2}>
            {/* Аккордеон для игроков текущей команды */}
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
              <AccordionDetails sx={{ maxHeight: 200, overflowY: "auto" }}>
                {playersCurrentTeam.map((player) => {
                  const isSelected = playersScoredGoalsCurrentTeam?.some(
                    (p) => p.id === player.id
                  );
                  const playerGoals =
                    playersScoredGoalsCurrentTeam?.find(
                      (p) => p.id === player.id
                    )?.scored || 0;

                  return (
                    <div
                      key={player.id}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {/* Выбор игрока */}
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
                      {/* Ввод количества голов */}
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

            {/* Аккордеон для игроков противоположной команды */}
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
                        {/* Выбор игрока */}
                        <MenuItem
                          value={player.playerName}
                          onClick={() =>
                            dispatch(
                              handlePlayerClick({
                                team: "opponentTeam",
                                player,
                              })
                            )
                          }
                          style={{
                            backgroundColor: isSelected
                              ? "lightblue"
                              : "inherit",
                            flexGrow: 1,
                          }}
                        >
                          {player.playerName}
                        </MenuItem>
                        {/* Ввод количества голов */}
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

      {/* Модальное окно загрузки */}
      <LoadingModal isUpdating={isPendingCurrent || isPendingOpponent} />
    </>
  );
};

export default CreateMatchModal;
