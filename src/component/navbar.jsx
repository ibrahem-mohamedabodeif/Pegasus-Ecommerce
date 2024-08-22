import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AccountBar from "./accountBar";

export default function NavBar() {
  const cartItems = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className=" flex justify-between items-center mt-4 ml-8 mr-8">
      <div className="relative hidden max-sm:block">
        <button onClick={() => handleOpen()}>
          <FontAwesomeIcon icon={faBars} className="text-xl" />
        </button>

        {open && (
          <div className="absolute w-36 rounded-xl top-10 -left-5 flex flex-col border p-4 gap-y-5 shadow-lg bg-white z-50">
            <Link to="/productes" onClick={handleOpen}>
              <span className=" font-medium">Productes</span>
            </Link>
            <Link to="/productes?filter=sale" onClick={handleOpen}>
              <span className=" font-medium">Sale</span>
            </Link>
            <Link to="/productes?filter=newArrivals" onClick={handleOpen}>
              <span className=" font-medium">New Arrival</span>
            </Link>

            <Link to="/contact-us" onClick={handleOpen}>
              <span className=" font-medium">Contact Us</span>
            </Link>
          </div>
        )}
      </div>
      <Link to="/">
        <div className="relative flex items-center space-x-2">
          <img src="/logo.png" className="w-10" alt="Logo" />
          <span className="uppercase font-bold text-2xl max-sm:hidden">
            Pegasus
          </span>
        </div>
      </Link>
      <div className=" capitalize text-lg flex gap-12 max-sm:hidden">
        <Link to="/productes">
          <span>productes</span>
        </Link>
        <Link to="/productes?filter=sale">
          <span>sale</span>
        </Link>
        <Link to="/contact-us">
          <span>Contact us</span>
        </Link>
      </div>
      <div className=" flex items-center space-x-5 text-2xl">
        <Badge badgeContent={cartItems.length} color="primary">
          <Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping} />
          </Link>
        </Badge>
        <AccountBar />
      </div>
    </div>
  );
}
