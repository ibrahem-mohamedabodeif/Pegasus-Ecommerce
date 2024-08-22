import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../data/productes";

export default function SignupForm() {
  const navigate = useNavigate();
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          try {
            await signUp(formData);
            navigate(-1);
          } catch {
            throw new Error();
          }
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Full Name
          </label>
          <div className="mt-2">
            <input
              name="fullName"
              type="text"
              required
              autoComplete="name"
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Phone Number
          </label>
          <div className="mt-2">
            <input
              name="phoneNumber"
              type="text"
              required
              autoComplete="phoneNumber"
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex ">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
          </div>
          <div className="mt-2 mb-7">
            <input
              name="password"
              type="password"
              required
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
        </div>
      </form>
      <p className="mt-10 text-center text-md text-gray-500">
        Have an account?{" "}
        <Link
          to={"/signin"}
          className="text-lg font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
