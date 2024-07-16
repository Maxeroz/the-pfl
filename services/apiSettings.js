import supabase from "./supabase";

export const getSettings = async () => {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
};

export const updateLeagueSetting = async (league) => {
  const { error } = await supabase
    .from("settings")
    .update({ leagueTier: league })
    .eq("id", 1); // Предполагая, что у вас одна строка в таблице settings с id = 1

  if (error) {
    console.error("Error updating league setting:", error);
  }
};
