import supabase from "./supabase";

export async function signUp(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("fullName");
  const phone = formData.get("phoneNumber");

  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        phone,
      },
    },
  });

  if (signUpError) {
    return signUpError.message;
  }

  if (data?.user) {
    const { id, email, user_metadata } = data.user;
    const { error: insertError } = await supabase.from("users").insert([
      {
        id,
        email,
        name: user_metadata.name,
        phone: user_metadata.phone,
      },
    ]);

    if (insertError) {
      return insertError.message;
    }
  }

  return data;
}

export async function signIn(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    return error.message;
  }
  return data;
}

export async function signOut() {
  let { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function getProductes() {
  let { data, error } = await supabase.from("productes").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getProductById(productId) {
  let { data: producte, error } = await supabase
    .from("productes")
    .select("*")
    .eq("id", productId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return producte;
}

export async function getOrdersById(userId) {
  let { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("userId", userId);
  if (error) {
    throw new Error(error.message);
  }
  return orders;
}

export async function addWishProduct(product, userId) {
  // Check if the product is already in the wishlist
  const { data, error: checkError } = await supabase
    .from("wishList")
    .select("*")
    .eq("userId", userId)
    .eq("productId", product.id)
    .maybeSingle();

  if (checkError) {
    throw new Error(checkError.message);
  }

  if (data) {
    return { message: "Product already exists in wishlist" };
  }

  const wishProduct = {
    userId: userId,
    productId: product.id,
    productName: product.title,
    productSubtitle: product.subTitle,
    productImage: product.image,
    productPrice: product.price,
  };

  // Add product to wishlist
  const { data: newWishProduct, error } = await supabase
    .from("wishList")
    .insert([wishProduct])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return newWishProduct;
}

export async function getWishList(userId) {
  let { data: wishList, error } = await supabase
    .from("wishList")
    .select("*")
    .eq("userId", userId);
  if (error) {
    throw new Error(error.message);
  }
  return wishList;
}

export async function deleteWishProduct(productId) {
  const { error } = await supabase
    .from("wishList")
    .delete()
    .eq("productId", productId);

  if (error) {
    throw new Error(error.message);
  }
}
