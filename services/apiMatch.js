import supabase from "./supabase";

export const getPlayersByTeamName = async (teamName) => {
  if (!teamName) return;

  // Получаем team_id по названию команды
  const { data: teamData, error: teamError } = await supabase
    .from("league1_table")
    .select("id") // Предполагаем, что у вас есть колонка id
    .eq("teamName", teamName)
    .single(); // Получаем только одну запись

  if (teamError || !teamData) {
    console.error("Error fetching team data:", teamError);
    throw new Error("Команда не найдена");
  }

  const teamId = teamData.id;

  // Теперь получаем игроков по team_id
  const { data, error: playerError } = await supabase
    .from("players")
    .select("*")
    .eq("team_id", teamId);

  if (playerError) {
    console.error("Error fetching players:", playerError);
    throw new Error("Не удалось получить игроков команды");
  }

  return data; // Возвращаем массив игроков
};

export const getTeamRow = async (teamName) => {
  try {
    const { data, error } = await supabase
      .from("league1_table")
      .select("*")
      .eq("teamName", teamName)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error(
      "Ошибка получения строки команды из таблицы league1_table:",
      error
    );
    throw error;
  }
};

export const updateLeagueTableByTeamName = async (teamName, updatedTeamRow) => {
  // Обновляем данные команды
  const { data: updatedTeam, error: updateError } = await supabase
    .from("league1_table")
    .update(updatedTeamRow)
    .eq("teamName", teamName)
    .select();

  if (updateError) {
    console.error(updateError);
    throw new Error("Error updating team data");
  }

  // Получаем все команды для пересчета мест
  const { data: allTeams, error: fetchError } = await supabase
    .from("league1_table")
    .select("*")
    .order("points", { ascending: false });

  if (fetchError) {
    console.error(fetchError);
    throw new Error("Error fetching all teams data");
  }

  // Пересчитываем места
  let place = 1;
  for (const team of allTeams) {
    const { error: placeError } = await supabase
      .from("league1_table")
      .update({ place })
      .eq("teamName", team.teamName);

    if (placeError) {
      console.error(placeError);
      throw new Error("Error updating team place");
    }
    place++;
  }

  return updatedTeam;
};

export async function addMatch(newMatch) {
  console.log(newMatch);
  try {
    // Выполнение запроса на вставку новой записи
    const { data, error } = await supabase
      .from("allMatches")
      .insert([newMatch]);

    if (error) {
      throw error;
    }

    console.log("New match added:", data);
    return data;
  } catch (error) {
    console.error("Error adding match:", error.message);
    throw error;
  }
}
