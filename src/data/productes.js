import supabase from "./supabase";

export async function getProductes() {
  let { data, error } = await supabase.from("productes").select("*");

  if (error) {
    console.log(error);
  }

  return data;
}
