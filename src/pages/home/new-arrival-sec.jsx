import { Link } from "react-router-dom";

import NewArrivalCard from "../../component/newArrivalCard";

export default function NewArrivalSec() {
  return (
    <div className="bg-white border-t mb-20 max-sm:mb-5">
      <div className="mx-auto max-w-2xl px-4 pt-16 sm:px-6  lg:max-w-7xl lg:px-8">
        <Link to="/productes?filter=newArrivals">
          <h2 className="text-3xl text-center  font-bold tracking-tight text-gray-900 uppercase mb-12">
            new arrival
          </h2>
        </Link>
        <div className=" h-[330px] overflow-auto max-sm:h-[400px]">
          <NewArrivalCard />
        </div>
      </div>
    </div>
  );
}
