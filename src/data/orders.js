import supabase from "./supabase";

export async function addOrder(order) {
  const { data, error } = await supabase.from("orders").insert(order).select();

  if (error) {
    console.log("can not added");
  }

  return data;
}
