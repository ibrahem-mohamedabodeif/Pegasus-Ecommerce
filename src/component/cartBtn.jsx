/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { useUser } from "./context/authContext";
import { addToCart } from "../pages/cart/cartSlice";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function CartBtn({ product, size, color }) {
  const user = useUser();
  const dispatch = useDispatch();

  const addToCartHandler = (product, size, color) => {
    if (!size || !color) {
      toast.error("You should choose color and size");
      return; // Prevent further execution if validation fails
    }
    const price = product.sale > 0 ? product.sale : product.price;
    const item = {
      userId: user?.id,
      id: product.id,
      title: product.title,
      price,
      category: product.category,
      image: product.image,
      quantity: 1,
      totalPrice: price * 1,
      size: size,
      color: color,
    };

    dispatch(addToCart(item));
    toast.success("Product added to cart");
  };
  return (
    <div className="text-xl mr-2 hover:text-blue-500">
      <button
        disabled={product.quantity === 0}
        className={`flex items-center ${
          product.quantity === 0 ? "cursor-not-allowed" : ""
        }`}
        onClick={() => addToCartHandler(product, size, color)}
        name="cart"
      >
        <FontAwesomeIcon icon={faCartShopping} />
      </button>
    </div>
  );
}
