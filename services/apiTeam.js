import supabase from "./supabase";

export async function getTeamInfo(queryLeagueId, teamId) {
  // Формируем имя таблицы
  const tableName = `league${queryLeagueId}_table`;

  try {
    // Выполняем запрос к таблице для получения данных команды
    const { data, error } = await supabase
      .from(tableName) // Используем переменную tableName для динамического обращения
      .select("*") // Выбираем все поля (можно изменить, если нужны конкретные поля)
      .eq("id", teamId) // Условие, чтобы получить строку по teamId
      .single(); // Ожидаем единственную строку в результате

    if (error) {
      console.error("Ошибка при получении данных команды:", error);
      return null; // Возвращаем null при ошибке
    }

    return data; // Возвращаем данные команды, если всё прошло успешно
  } catch (err) {
    console.error("Ошибка выполнения запроса:", err);
    return null; // Возвращаем null при ошибке выполнения запроса
  }
}
