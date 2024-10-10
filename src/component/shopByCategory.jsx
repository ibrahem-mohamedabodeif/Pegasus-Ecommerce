import { Link } from "react-router-dom";

export default function ShopByCategory() {
  return (
    <div className="mx-auto bg-white border-t pt-12 mb-10 max-sm:mb-5">
      <h2 className="text-3xl text-center font-bold tracking-tight text-gray-900 uppercase mb-5">
        SHOP BY CATEGORY
      </h2>
      <div className="mx-auto grid grid-cols-2 gap-4 max-w-7xl p-4 max-sm:grid-cols-1">
        {/* Left Side */}
        <Link to={"/productes?category=Hoodies"}>
          <div
            aria-label="grid-1"
            className="relative border h-[500px] rounded-xl overflow-hidden shadow-2xl group max-sm:h-[200px]"
          >
            <div className="relative -top-48 max-sm:top-0 max-sm:h-full">
              <img
                src="https://images.unsplash.com/photo-1618333293603-8d668eafa045?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hoodies Collection"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute inset-0 bg-gray-300 opacity-0 group-hover:opacity-25 transition-opacity"></div>
            <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold bg-black/50 px-2 py-1 max-sm:text-base">
              HOODIES
            </h1>
          </div>
        </Link>

        {/* Right Side */}
        <div aria-label="grid-2" className="flex flex-col gap-4">
          <Link to={"/productes?category=T-Shirt"}>
            <div className="relative border w-full h-60 overflow-hidden rounded-xl shadow-xl group max-sm:h-[200px]">
              <div className="relative -top-5 max-sm:top-0 max-sm:h-full">
                <img
                  src="https://img.freepik.com/free-photo/shirt-mockup-concept-with-plain-clothing_23-2149448751.jpg?t=st=1728305860~exp=1728309460~hmac=6a9626d3d9cbf69e5936ecaa0069f94e0a09817c79345cd22ebe68bfe515aa40&w=996"
                  alt="New Hoodies"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute inset-0 bg-gray-300 opacity-0 group-hover:opacity-25 transition-opacity"></div>
              <h1 className="absolute bottom-2 left-2 text-white text-lg font-bold bg-black/50 px-2 py-1 max-sm:text-base">
                T-SHIRTS
              </h1>
            </div>
          </Link>

          <Link to={"/productes?category=Long+Sleeve+Shirt"}>
            <div className="relative border w-full h-60 overflow-hidden rounded-xl shadow-xl group max-sm:h-[200px]">
              <div className="relative max-sm:h-full">
                <img
                  src="https://img.freepik.com/free-photo/hoodie-bowl-with-cereals-milk-beside_23-2148528056.jpg?t=st=1728306098~exp=1728309698~hmac=fb2708df1d776b5c92dfd7ec7684c4e3276ad808c729358a1ccb29b411e8ec65&w=996"
                  alt="Sale Hoodies"
                  className="object-fill w-full h-80 max-sm:h-full"
                />
              </div>
              <div className="absolute inset-0 bg-gray-300 opacity-0 group-hover:opacity-25 transition-opacity"></div>
              <h1 className="absolute bottom-2 left-2 text-white text-lg font-bold bg-black/50 px-2 py-1 max-sm:text-base">
                LONG SLEEVE SHIRTS
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
