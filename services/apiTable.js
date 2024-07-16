import supabase from "./supabase";

export const getTable = async (selectedTable) => {
  const { data, error } = await supabase.from(selectedTable).select("*");

  if (error) {
    console.error(error);
    throw new Error("Profile could not be loaded");
  }

  return data;
};
