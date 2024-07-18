import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getTable } from "../../services/apiTable";

const tableMapping = {
  "ПФЛ ЛИГА 1": "league1_table",
  "ПФЛ ЛИГА 2": "league2_table",
  "ПФЛ ЛИГА 3": "league3_table",
};

export function useTable() {
  const league = useSelector((state) => state.league.leagueTier);

  // Получаем имя таблицы на основе выбранной лиги
  const selectedTable = tableMapping[league];

  const {
    isLoading,
    data: tableData,
    error,
  } = useQuery({
    queryKey: ["table", league],
    queryFn: () => getTable(selectedTable),
  });

  return { isLoading, tableData: tableData || [], error };
}
