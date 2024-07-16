import { useSelector, useDispatch } from "react-redux";
import { setLeague } from "./leagueSlice";
import { useUpdateLeague } from "./useUpdateLeague";
import { useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const LeagueSelector = () => {
  const league = useSelector((state) => state.league.leagueTier);
  const dispatch = useDispatch();

  const { isUpdating, updateLeague } = useUpdateLeague();

  useEffect(() => {
    updateLeague(league);
  }, []);

  const handleSelectChange = (event) => {
    const newLeague = event.target.value;

    dispatch(setLeague(newLeague));
    updateLeague(newLeague);
  };

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 130 }}>
      <InputLabel id="league-select" sx={{ fontSize: 20 }}>
        Выберите лигу
      </InputLabel>
      <Select
        labelId="league-select"
        value={league}
        onChange={handleSelectChange}
        disabled={isUpdating}
        label="Выберите лигу"
      >
        <MenuItem value="ПФЛ ЛИГА 1">ПФЛ ЛИГА 1</MenuItem>
        <MenuItem value="ПФЛ ЛИГА 2">ПФЛ ЛИГА 2</MenuItem>
        <MenuItem value="ПФЛ ЛИГА 3">ПФЛ ЛИГА 3</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LeagueSelector;
