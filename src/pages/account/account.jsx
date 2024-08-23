import { useNavigate } from "react-router-dom";
import { useUser } from "../../component/context/authContext";
import { useEffect } from "react";

export default function Account() {
  const user = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/signin");
  }, [user, navigate]);
  return (
    <div className="mb-10">
      <div className="w-auto relative flex items-center max-sm:flex-col gap-10 border p-5 mr-7">
        <span className="border rounded-full text-4xl w-32 text-center p-10 bg-black text-white capitalize">
          {user?.user_metadata.name[0]}
        </span>
        <div className="flex flex-col gap-4 max-sm:w-full max-sm:overflow-scroll">
          <span className="text-xl font-semibold capitalize">
            {user?.user_metadata.name}
          </span>
          <span className="text-lg">{user?.user_metadata.email}</span>
          <span className="text-lg">{user?.user_metadata.phone}</span>
        </div>
      </div>
    </div>
  );
}
