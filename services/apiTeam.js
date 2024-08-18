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

export async function addNewTeam({ tableName, teamName, teamLogoFile }) {
  try {
    // Проверка наличия файла и его свойств
    if (!teamLogoFile || !teamLogoFile.name) {
      throw new Error("Файл логотипа команды не передан или некорректен.");
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(teamLogoFile.type)) {
      throw new Error(
        "Недопустимый формат файла. Пожалуйста, загрузите PNG или JPEG изображение."
      );
    }

    if (teamLogoFile.size > maxSizeInBytes) {
      throw new Error("Размер файла превышает допустимый лимит в 5MB.");
    }

    // Загрузка изображения в хранилище
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("teams-logos")
      .upload(`${teamLogoFile.name}`, teamLogoFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Ошибка при загрузке файла:", uploadError.message);
      throw uploadError;
    }

    console.log("Загрузка изображения успешна:", uploadData);

    // Генерация публичного URL
    const { data: publicUrlData, error: publicUrlError } = supabase.storage
      .from("teams-logos")
      .getPublicUrl(`${teamLogoFile.name}`); // Используем тот же путь, что и при загрузке

    if (publicUrlError) {
      console.error(
        "Ошибка при генерации публичного URL:",
        publicUrlError.message
      );
      throw publicUrlError;
    }

    const imageUrl = publicUrlData.publicUrl; // Исправлено извлечение URL

    console.log("Генерация публичного URL успешна:", imageUrl);

    const newTeamObj = {
      place: 0,
      imageUrl: imageUrl,
      teamName: teamName,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      scored: 0,
      missed: 0,
      difference: 0,
      points: 0,
      lastGames: [], // Используйте строку JSON, если это требуется
      playerCount: 0,
      pointsChart: [], // Используйте строку JSON, если это требуется
    };

    // Проверка наличия имени таблицы
    if (!tableName) {
      throw new Error("Имя таблицы не передано.");
    }

    // Добавление новой команды в таблицу
    const { data, error } = await supabase
      .from(tableName) // Используем переданное имя таблицы
      .insert([newTeamObj])
      .select("*")
      .single();

    if (error) {
      console.error(
        "Ошибка при добавлении новой команды в базу данных:",
        error.message
      );
      throw error;
    }

    console.log("Новая команда добавлена:", data);
    return data;
  } catch (error) {
    console.error("Ошибка при добавлении новой команды:", error.message);
    return null;
  }
}

export async function deleteTeamById({ tableName, id, imageUrl }) {
  try {
    if (!tableName || !id) {
      throw new Error("Имя таблицы и идентификатор должны быть указаны.");
    }

    // Шаг 1: Удаление всех игроков, связанных с командой
    const { error: deletePlayersError } = await supabase
      .from("players")
      .delete()
      .eq("team_id", id);
    if (deletePlayersError) {
      console.error("Ошибка при удалении игроков:", deletePlayersError.message);
      throw deletePlayersError;
    }
    console.log("Игроки успешно удалены из команды:", id);

    // Шаг 2: Удаление записи из таблицы команды
    const { error: deleteTeamError } = await supabase
      .from(tableName)
      .delete()
      .eq("id", id);
    if (deleteTeamError) {
      console.error(
        "Ошибка при удалении записи команды:",
        deleteTeamError.message
      );
      throw deleteTeamError;
    }
    console.log("Запись команды успешно удалена:", id);

    // Шаг 3: Удаление изображения из хранилища (если есть)
    if (imageUrl) {
      const fileName = decodeURIComponent(
        imageUrl.split("/").pop().split("?")[0]
      );
      const { error: storageError } = await supabase.storage
        .from("teams-logos")
        .remove([fileName]);
      if (storageError) {
        console.error(
          "Ошибка при удалении изображения из хранилища:",
          storageError.message
        );
      } else {
        console.log("Изображение успешно удалено:", fileName);
      }
    }

    return { success: true, message: "Запись команды и файл успешно удалены." };
  } catch (error) {
    console.error("Ошибка при удалении команды:", error.message);
    return { success: false, message: error.message };
  }
}
