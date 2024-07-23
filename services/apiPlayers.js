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
