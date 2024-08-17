import supabase from "./supabase";

export async function signup({ fullName, email, password }) {
  try {
    // Шаг 1: Регистрация пользователя
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullName, // Добавляем дополнительное поле в профиль
          avatar: "", // Вы можете добавить дополнительные поля по необходимости
        },
      },
    });

    // Шаг 2: Обработка ошибок
    if (error) {
      throw error; // Если есть ошибка, выбрасываем её
    }

    // Шаг 3: Добавление пользователя в таблицу профилей
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .insert([
        { id: data.user.id, fullName: fullName, role: "user" }, // Установка роли по умолчанию
      ]);

    if (profileError) throw new Error(profileError.message);

    // Шаг 4: Проверка регистрации
    if (data.user) {
      console.log("Регистрация успешна", data.user);
      return data.user;
    } else {
      throw new Error("Не удалось создать пользователя.");
    }
  } catch (error) {
    console.error("Ошибка при регистрации:", error.message);
    throw error; // Выбрасываем ошибку, чтобы она могла быть обработана в месте вызова
  }
}

export async function loginWithEmail({ email, password }) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message); // Генерируем ошибку с сообщением
    }

    return {
      success: true,
      data, // Данные пользователя
    };
  } catch (error) {
    throw new Error(error.message); // Генерируем ошибку с сообщением
  }
}

export async function getSessionAndUser() {
  try {
    // Получаем сессию из localStorage Supabase
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Ошибка получения сессии:", sessionError.message);
      return null;
    }

    // Если сессия существует, получаем данные пользователя
    if (session) {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Ошибка получения пользователя:", userError.message);
        return null;
      }

      // Возвращаем данные пользователя
      return user;
    } else {
      console.log("Сессия не найдена");
      return null;
    }
  } catch (error) {
    console.error("Ошибка при получении сессии и пользователя:", error);
    return null;
  }
}

export async function logout() {
  try {
    // Вызов метода signOut для выхода из системы
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message); // Генерируем ошибку, если она есть
    }

    // Успешный выход
    console.log("Вы успешно вышли из системы.");
  } catch (error) {
    console.error("Ошибка при выходе из системы:", error.message);
    throw error; // Перебрасываем ошибку для дальнейшей обработки
  }
}
export async function getRole(userId) {
  // Запрос к таблице profiles
  const { data, error } = await supabase
    .from("profiles")
    .select("role") // Укажите поля, которые хотите получить
    .eq("id", userId) // Фильтр по ID пользователя
    .single(); // Мы ожидаем одну запись

  if (error) {
    console.error("Error fetching user profile:", error.message);
    throw new Error("Ошибка при получении профиля пользователя");
  }

  // Убедимся, что данные существуют
  if (!data) {
    console.error("No data returned for user ID:", userId);
    throw new Error("Данные профиля пользователя не найдены");
  }

  return {
    role: data.role || null, // Если role не существует, вернуть null
  };
}
