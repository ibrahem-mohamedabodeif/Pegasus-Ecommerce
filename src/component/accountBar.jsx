import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import MegaMenu from "./megaMenu";
import { useUser } from "./context/authContext";

export default function AccountBar() {
  const [open, setOpen] = useState(false);
  const user = useUser();
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center"
        name="account"
      >
        {user ? (
          <span className="w-10 p-2 font-bold text-sm capitalize border rounded-full bg-black text-white">
            {user?.user_metadata?.name[0]}
          </span>
        ) : (
          <FontAwesomeIcon icon={faCircleUser} className="text-3xl" />
        )}
      </button>
      {open && (
        <div>
          <MegaMenu />
        </div>
      )}
    </div>
  );
}
