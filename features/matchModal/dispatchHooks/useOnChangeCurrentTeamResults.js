import { useDispatch } from "react-redux";
import { pickCurrentTeamResult } from "../matchModalSlice";

export function useOnChangeCurrentTeamResults() {
  const dispatch = useDispatch();

  return (e) => {
    dispatch(pickCurrentTeamResult(e.target.value));
  };
}
