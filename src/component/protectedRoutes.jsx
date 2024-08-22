import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "./context/authContext";
export default function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  //1- Load auth user
  const user = useUser();

  const isAuth = user?.role === "authenticated";

  //2-if there is no auth user navigate to sign page

  useEffect(
    function () {
      if (!isAuth) navigate("/signin");
    },
    [navigate, isAuth]
  );

  //3- if there is auth user
  return children;
}
