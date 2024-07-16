import { useSelector, useDispatch } from "react-redux";
import { setLeague } from "./leagueSlice";
import { useUpdateLeague } from "./useUpdateLeague";

const LeagueSelector = () => {
  const league = useSelector((state) => state.league.leagueTier);
  const dispatch = useDispatch();

  const { isUpdating, updateLeague } = useUpdateLeague();

  const handleSelectChange = (event) => {
    dispatch(setLeague(event.target.value));
    updateLeague(league);
  };

  return (
    <div>
      <label htmlFor="league-select">Выберите лигу: </label>
      <select
        id="league-select"
        value={league}
        onChange={handleSelectChange}
        disabled={isUpdating}
      >
        <option value="ПФЛ ЛИГА 1">ПФЛ ЛИГА 1</option>
        <option value="ПФЛ ЛИГА 2">ПФЛ ЛИГА 2</option>
        <option value="ПФЛ ЛИГА 3">ПФЛ ЛИГА 3</option>
      </select>
    </div>
  );
};

export default LeagueSelector;
