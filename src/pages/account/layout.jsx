import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../../component/navbar";
import SideBar from "../../component/sideBar";
import { useUser } from "../../component/context/authContext";

export default function AccountLayout() {
  const user = useUser();
  const navigate = useNavigate();
  if (!user) navigate("/signin");

  return (
    <>
      <NavBar />
      <div className="grid grid-cols-12 gap-2 fixed w-full h-full max-sm:flex max-sm:flex-col max-sm:space-x-0 md:space-x-10">
        <div className="col-span-2 pt-10 min-h-svh bg-white shadow-xl rounded-3xl md:col-span-1 lg:col-span-2">
          <SideBar />
        </div>
        <div className="mx-7 mt-10 col-span-10">
          <Outlet />
        </div>
      </div>
    </>
  );
}
