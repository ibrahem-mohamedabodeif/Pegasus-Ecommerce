import { Link } from "react-router-dom";
import SaleCard from "../../component/saleCard";

export default function SaleSec() {
  return (
    <div className="bg-white border-t mb-20 max-sm:mb-5">
      <div className="mx-auto max-w-2xl px-4 pt-16 sm:px-6  lg:max-w-7xl lg:px-8">
        <Link to="/productes?sortBy=sale">
          <h2 className="text-3xl text-center  font-bold  text-gray-900 capitalize tracking-wide mb-12">
            on Sale
          </h2>
        </Link>
        <div className=" h-[330px] overflow-auto max-sm:h-[400px]">
          <SaleCard style="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 " />
        </div>
      </div>
    </div>
  );
}
