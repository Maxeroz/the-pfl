import supabase from "./supabase";

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
