import supabase from "./supabase";

export async function loginWithEmail({ email, password }) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error; // Если возникла ошибка, бросаем её для обработки
    }

    return {
      success: true,
      data, // Данные пользователя
    };
  } catch (error) {
    return {
      success: false,
      error: error.message, // Сообщение об ошибке
    };
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
