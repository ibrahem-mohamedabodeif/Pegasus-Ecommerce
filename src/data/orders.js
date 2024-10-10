import supabase from "./supabase";

export async function addOrder(orders) {
  const results = [];

  for (const order of orders) {
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert(order)
      .select();

    if (orderError) {
      throw new Error("can't add order: " + orderError.message);
    }

    const { data: productData, error: productError } = await supabase
      .from("productes")
      .select("quantity")
      .eq("id", order.productId)
      .single();

    if (productError) {
      throw new Error("can't fetch product quantity: " + productError.message);
    }

    const newQuantity = productData.quantity - order.productQuantity;

    const { data: updatedProductData, error: updateError } = await supabase
      .from("productes")
      .update({ quantity: newQuantity })
      .eq("id", order.productId)
      .select();

    if (updateError) {
      throw new Error("can't update product quantity: " + updateError.message);
    }

    results.push({ orderData, updatedProductData });
  }

  return results;
}

export async function updateOrderStatus(id, status) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error, "can't update order");
  }

  return data;
}
