/* eslint-disable react/prop-types */
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import { addWishProduct } from "../data/productes";
import { useUser } from "./context/authContext";

export default function SaveButton({ product }) {
  const user = useUser();
  const handleAddToWishList = async (product) => {
    if (!user) {
      toast.error("You need to sign in first.");
      return;
    }
    try {
      const result = await addWishProduct(product, user.id);
      if (result?.message) {
        toast.error(result.message);
      } else {
        toast.success("Added to Wishlist");
      }
    } catch (error) {
      toast.error("Failed to add to wishlist: " + error.message);
    }
  };
  return (
    <button
      onClick={() => handleAddToWishList(product)}
      className="hover:text-red-400"
      name="save-btn"
    >
      <FontAwesomeIcon icon={faHeart} size="xl" />
    </button>
  );
}
