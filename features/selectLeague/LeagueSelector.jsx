import { useSelector, useDispatch } from "react-redux";
import { setLeague } from "./leagueSlice";
import { useUpdateLeague } from "./useUpdateLeague";
import { useEffect } from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  font-weight: 600;
  color: var(--color-brand-900);
`;

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
    <div>
      <StyledLabel htmlFor="league-select">Выберите лигу: </StyledLabel>
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
