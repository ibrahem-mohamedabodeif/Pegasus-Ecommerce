/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function OrderSummary({ cartItems }) {
  const totalPrice = cartItems.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const navigate = useNavigate();
  const shipping = 50;
  const handleCheckOut = () => {
    cartItems.length > 0
      ? navigate("/check-out")
      : toast.error("add products to cart");
  };
  return (
    <div
      aria-label="summary"
      className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-16"
    >
      <h2 className="font-manrope font-bold text-2xl leading-10 text-slate-800 pb-8 border-b border-gray-300">
        Order Summary
      </h2>
      <div className="mt-8">
        <div className="flex items-center justify-between pb-6">
          <p className="font-normal text-lg leading-8 text-slate-800">
            {cartItems.length} Items
          </p>
          <p className="font-medium text-lg leading-8 text-slate-800">
            ${totalPrice}
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between pb-6">
            <p className="font-normal text-lg leading-8 text-slate-800">
              Shipping
            </p>
            <p className="font-medium text-lg leading-8 text-slate-800">
              ${cartItems.length === 0 ? 0 : shipping}
            </p>
          </div>
          <div className="flex items-center justify-between py-8 border-t-2">
            <p className="font-medium text-xl leading-8 text-slate-800">
              {cartItems.length} Items
            </p>
            <p className="font-semibold text-xl leading-8 text-blue-600">
              ${cartItems.length === 0 ? 0 : totalPrice + shipping}
            </p>
          </div>
          <button
            onClick={() => handleCheckOut()}
            className="w-full text-center bg-slate-800 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-slate-900"
            name="cheched-btn"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
