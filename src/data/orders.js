import supabase from "./supabase";

export async function addOrder(order) {
  const { data, error } = await supabase.from("orders").insert(order).select();

  if (error) {
    console.log(error);
    throw new Error(error, "can't add order");
  }

  return data;
}
