import { Link } from "react-router-dom";

import NewArrivalCard from "../../component/newArrivalCard";

export default function NewArrivalSec() {
  return (
    <div className="bg-white border-t mb-20">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6  lg:max-w-7xl lg:px-8">
        <Link to="/productes?sortBy=newArrivals">
          <h2 className="text-3xl text-center  font-bold tracking-tight text-gray-900 uppercase mb-12">
            new arrival
          </h2>
        </Link>
        <div className=" h-[330px]">
          <NewArrivalCard />
        </div>
      </div>
    </div>
  );
}
