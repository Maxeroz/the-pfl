import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

const TeamPaginationContext = createContext();

function TeamChartPagination({ children }) {
  // Трек текущей страницы отображения графика
  const [currentPage, setCurrentPage] = useState(0);

  // Определение начала текующей недели
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const day = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - day + (day === 0 ? -6 : 1)); // Пн
    return startOfWeek.toISOString().split("T")[0];
  });

  const handlePrevWeek = () => {
    const date = new Date(currentWeekStart);
    date.setDate(date.getDate() - 7);
    setCurrentWeekStart(date.toISOString().split("T")[0]);

    setCurrentPage((current) => current - 1);
  };

  const handleNextWeek = () => {
    const date = new Date(currentWeekStart);
    date.setDate(date.getDate() + 7);
    setCurrentWeekStart(date.toISOString().split("T")[0]);

    setCurrentPage((current) => current + 1);
  };

  return (
    <TeamPaginationContext.Provider
      value={{
        currentWeekStart,
        handlePrevWeek,
        handleNextWeek,
        currentPage,
      }}
    >
      {children}
    </TeamPaginationContext.Provider>
  );
}

export function useTeamPaginationContext() {
  const context = useContext(TeamPaginationContext);
  if (context === undefined)
    throw new Error(
      "TeamPaginationContext was used outside TeamPaginationProdiver"
    );
  return context;
}

export default TeamChartPagination;
