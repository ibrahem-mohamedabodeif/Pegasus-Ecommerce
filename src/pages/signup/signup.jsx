import logo from "../../../public/logo.png";
import { Suspense } from "react";
import SignupForm from "./signupForm";
import Loader from "../loader/loader";

export default function SignUp() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src={logo} alt="LOGO" width={150} className="mx-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Be a member of our community
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <Suspense fallback={<Loader />}>
          <SignupForm />
        </Suspense>
      </div>
    </div>
  );
}
