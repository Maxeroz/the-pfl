import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function Team() {
  const league = useSelector((state) => state.league.leagueTier);
  const currentLeagueId = league.split(" ").slice(-1)[0]; // Исправление: получаем строку

  // Используем деструктуризацию массива, чтобы получить searchParams и setSearchParams
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Проверяем, нужно ли действительно обновлять параметры
    const existingLeagueId = searchParams.get("leagueId");

    if (existingLeagueId !== currentLeagueId) {
      searchParams.set("leagueId", currentLeagueId);
      setSearchParams(searchParams, { replace: true }); // используем replace, чтобы избежать добавления в историю
    }
  }, [currentLeagueId, searchParams, setSearchParams]);

  return <div>Team</div>;
}

export default Team;
