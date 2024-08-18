import supabase from "./supabase";

/**
 * Получение игроков по ID команды
 * @param {string} teamId - ID команды
 * @returns {Promise<object[]>} - Возвращает массив объектов игроков
 * @throws {Error} - Ошибка при получении игроков
 */
export const getPlayersByTeamId = async (teamId) => {
  if (!teamId) {
    console.error("Ошибка: teamId не может быть пустым.");
    throw new Error("teamId обязателен.");
  }

  try {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .eq("team_id", teamId);

    if (error) {
      console.error("Ошибка получения игроков:", error.message);
      throw new Error("Не удалось получить игроков команды.");
    }

    return data;
  } catch (err) {
    console.error("Ошибка выполнения запроса:", err.message);
    throw new Error("Произошла ошибка при выполнении запроса.");
  }
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

export async function getMatchesFromLast24Hours() {
  const { data, error } = await supabase
    .from("allMatches")
    .select("*")
    .gte(
      "created_at",
      new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    );

  if (error) {
    console.error("Ошибка получения данных:", error);
    return [];
  }

  return data;
}

export async function planMatch({
  team1,
  team2,
  team1ImgUrl,
  team2ImgUrl,
  team1Id,
  team2Id,
  date,
}) {
  try {
    // Добавляем запись в таблицу allMatches
    const { data: matchData, error } = await supabase
      .from("allMatches")
      .insert([
        {
          team1,
          team2,
          team1ImgUrl,
          team2ImgUrl,
          team1Id,
          team2Id,
          isFinished: false,
          date,
        },
      ])
      .single(); // Возвращает одну запись

    if (error) {
      throw error; // Генерируем ошибку, если что-то пошло не так
    }

    console.log("Запись успешно добавлена:", matchData);
    return matchData;
  } catch (error) {
    console.error("Ошибка при добавлении записи:", error.message);
    return null;
  }
}
