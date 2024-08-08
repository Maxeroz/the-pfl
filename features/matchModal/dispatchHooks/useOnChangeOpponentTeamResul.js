import { useDispatch } from "react-redux";
import { pickOpponentTeamResult } from "../matchModalSlice";

export function useOnChangeOpponentTeamResults() {
  const dispatch = useDispatch();

  return (e) => {
    dispatch(pickOpponentTeamResult(e.target.value));
  };
}
