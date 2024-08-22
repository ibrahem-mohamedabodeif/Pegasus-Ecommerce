import { Link } from "react-router-dom";
import { useUser } from "./context/authContext";
import { signOut } from "../data/productes";

export default function MegaMenu() {
  const user = useUser();
  return (
    <div className="text-xl absolute right-0 flex flex-col items-start gap-4 border p-4 rounded-lg  bg-white shadow-xl z-20">
      <Link to={"/account/orders"}>Orders</Link>
      <Link
        to={"/account/wishlist"}
        className=" after:content-[''] after:block after:mt-4 after:w-24 after:h-px after:bg-black"
      >
        Wish list
      </Link>
      <Link to={"/account"}>Account</Link>
      {user ? (
        <button onClick={() => signOut()}>Logout</button>
      ) : (
        <Link to={"/signin"}>Sign In</Link>
      )}
    </div>
  );
}
