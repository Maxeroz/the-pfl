import supabase from "./supabase";

export const getProfile = async () => {
  const { data, error } = await supabase.from("profile").select("*");

  if (error) {
    console.error(error);
    throw new Error("Profile could not be loaded");
  }

  return data;
};
