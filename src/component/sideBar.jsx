import {
  faBasketShopping,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="fixed h-screen mx-10 pt-10 max-sm:mx-4 md:mx-4 flex flex-col items-start gap-20 ">
      <Link to={"/account"} className="flex items-center gap-5">
        <FontAwesomeIcon icon={faUser} size="lg" />
        <span className="hidden lg:block lg:text-xl lg:font-semibold ">
          Account
        </span>
      </Link>
      <Link to={"/account/orders"} className="flex items-center  gap-5">
        <FontAwesomeIcon icon={faBasketShopping} size="lg" />
        <span className="hidden lg:block lg:text-xl lg:font-semibold">
          Orders
        </span>
      </Link>
      <Link to={"/account/wishlist"} className="flex items-center  gap-5">
        <FontAwesomeIcon icon={faHeart} size="lg" />
        <span className="hidden lg:block lg:text-xl lg:font-semibold">
          Wish List
        </span>
      </Link>
    </div>
  );
}
