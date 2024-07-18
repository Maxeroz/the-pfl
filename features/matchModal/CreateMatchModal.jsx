// Импорт необходимых компонентов из MUI и React
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { removeStringFromArray } from "../../utils/helpers";
import { HiFolderOpen } from "react-icons/hi2";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import Row from "../../ui/Row";
import { useCreateMatch } from "./useCreateMatch";
import { usePlayersByTeam } from "./usePlayersByTeam";
import LoadingModal from "../../ui/LoadingModal";
import {
  handleGoalsChange,
  handlePlayerClick,
  pickCurrentTeamResult,
  pickOpponentTeam,
  pickOpponentTeamResult,
  resetMatchState,
} from "./matchModalSlice";
import { useAddMatch } from "./useAddMatch";

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
    teamName: team1,
    scored: score1,
    playersScoredGoals: playersScoredGoalsCurrentTeam,
  } = useSelector((state) => state.match.currentTeam);

  const {
    teamName: team2,
    scored: score2,
    playersScoredGoals: playersScoredGoalsOpponentTeam,
  } = useSelector((state) => state.match.opponentTeam);

  // Хук для обновления данных команды текущей и противоположной команды
  const { updateTeamRow: updateTeamRowCurrent, isPending: isPendingCurrent } =
    useCreateMatch("currentTeam");
  const { updateTeamRow: updateTeamRowOpponent, isPending: isPendingOpponent } =
    useCreateMatch("opponentTeam");

  // Формирование списка названий команд без текущей
  const teamsNames = removeStringFromArray(
    teams.map((team) => team.teamName),
    team1
  );

  const { addMatch } = useAddMatch();

  // Обработчик подтверждения изменений (submit)
  const onSubmit = async () => {
    // Асинхронно обновляем данные команд
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
          >
            <MenuItem value={team1}>{team1}</MenuItem>
          </TextField>

          {/* Выбор команды 2 */}
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
