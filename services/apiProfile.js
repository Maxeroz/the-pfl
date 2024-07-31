import supabase from "./supabase";

export const getProfile = async () => {
  const { data, error } = await supabase.from("profile").select("*");

  if (error) {
    console.error(error);
    throw new Error("Profile could not be loaded");
  }

  return data;
};

export async function updateTransferWindow(id, transferWindowValue) {
  // Выполняем запрос на обновление
  const { data, error } = await supabase
    .from("profile") // Указываем таблицу
    .update({ transferWindow: transferWindowValue }) // Обновляем свойство
    .eq("id", id); // Условие для строки, которую нужно обновить

  // Обработка результата
  if (error) {
    console.error("Ошибка при обновлении:", error);
    throw error; // Вы можете обработать ошибку по-другому, например, вернуть сообщение об ошибке
  }

  console.log("Обновлено успешно:", data);
}
