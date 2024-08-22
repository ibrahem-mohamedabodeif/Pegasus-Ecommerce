import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-t-2">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 gap-y-8 md:gap-8 py-10 max-w-sm mx-auto sm:max-w-3xl lg:max-w-full">
          <div className="col-span-full mb-10  lg:col-span-2 lg:mb-0 my-auto">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" className="w-10" />
              <span className="uppercase font-bold text-2xl">pegasus</span>
            </div>

            <p className="py-8 text-sm text-gray-500 lg:max-w-sm text-center lg:text-left">
              Trusted in more than 100 countries & 5 million customers. Have any
              query ?
            </p>
          </div>

          <div className="lg:mx-auto text-left ">
            <h4 className="text-lg text-gray-900 font-medium mb-7">PEGASUS</h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-6">
                <Link to="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li className="mb-6">
                <Link
                  to="/productes"
                  className=" text-gray-600 hover:text-gray-900"
                >
                  products
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className=" text-gray-600 hover:text-gray-900"
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:mx-auto text-left ">
            <h4 className="text-lg text-gray-900 font-medium mb-7 uppercase">
              Products
            </h4>
            <ul className="text-sm  transition-all duration-500">
              <li className="mb-6">
                <Link
                  to="/productes"
                  className="text-gray-600 hover:text-gray-900"
                >
                  All products
                </Link>
              </li>
              <li className="mb-6">
                <Link
                  to="/productes?filter=newArrivals"
                  className=" text-gray-600 hover:text-gray-900"
                >
                  New Arrival
                </Link>
              </li>
              <li>
                <Link
                  to="/productes?filter=sale"
                  className=" text-gray-600 hover:text-gray-900"
                >
                  On Sale
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-7 border-t border-gray-200">
          <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
            <span className="text-sm text-gray-500 ">
              ©<a>pegasus</a> 2024, All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
