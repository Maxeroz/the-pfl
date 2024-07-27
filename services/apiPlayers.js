import supabase from "./supabase";

export async function getAllPlayers() {
  try {
    // Выполняем запрос к таблице players
    const { data, error } = await supabase.from("players").select("*");

    // Обработка ошибок
    if (error) {
      console.error("Ошибка получения данных:", error.message);
      return [];
    }

    // Возвращаем данные
    return data;
  } catch (err) {
    console.error("Ошибка запроса:", err);
    return [];
  }
}

export async function updatePlayerById(id, playerData) {
  try {
    // Выполнение запроса на обновление записи в таблице players
    const { data, error } = await supabase
      .from("players") // Указываем таблицу
      .update(playerData) // Обновляем данные, используя объект playerData
      .eq("id", id); // Условие обновления по ID

    if (error) {
      throw error; // Если произошла ошибка, выбрасываем её
    }

    // Возвращаем данные обновлённого игрока
    return data;
  } catch (error) {
    console.error("Ошибка при обновлении игрока:", error.message);
    throw error;
  }
}
