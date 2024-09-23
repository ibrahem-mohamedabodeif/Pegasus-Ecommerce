/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  deleteItem,
  increaseQuantity,
} from "../pages/cart/cartSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 max-sm:flex-row py-6  border-b border-gray-200 group">
        <div className="flex gap-10 max-sm:gap-0">
          <button onClick={() => dispatch(deleteItem(item.id))}>
            <FontAwesomeIcon
              icon={faTrash}
              className="text-lg text-red-600 max-sm:text-sm"
            />
          </button>
          <div className="w-full md:max-w-[126px] max-sm:max-w-[350px]">
            <img
              src={item.image}
              alt="perfume bottle image"
              className="mx-auto max-sm:mx-0 "
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 w-full">
          <div className="md:col-span-2">
            <div className="max-sm:gap-1 flex flex-col max-[500px]:items-center gap-1">
              <h6 className="font-semibold text-slate-800">{item.title}</h6>
              <h6 className="font-normal text-gray-500">size : {item.size}</h6>
              <h6 className="font-normal text-gray-500">
                color : {item.color}
              </h6>
              <h6 className="font-medium text-slate-800 mt-2">${item.price}</h6>
            </div>
          </div>
          <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
            <div className="flex items-center h-full max-sm:w-[200px]">
              <button
                onClick={() => dispatch(decreaseQuantity(item.id))}
                className="max-sm:w-14 max-sm:h-10 group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                name="decrease-btn"
              >
                <svg
                  className="stroke-gray-900 transition-all duration-500 group-hover:stroke-slate-800"
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M16.5 11H5.5"
                    stroke=""
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16.5 11H5.5"
                    stroke=""
                    strokeOpacity="0.2"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16.5 11H5.5"
                    stroke=""
                    strokeOpacity="0.2"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <span className="max-sm:w-12 max-sm:h-10 max-sm:py-1 border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg  max-sm:min-w-10  w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent">
                {item.quantity}
              </span>
              <button
                onClick={() => dispatch(increaseQuantity(item.id))}
                className="max-sm:w-14 max-sm:h-10 group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                name="increase-btn"
              >
                <svg
                  className="stroke-gray-900 transition-all duration-500 group-hover:stroke-slate-800"
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M11 5.5V16.5M16.5 11H5.5"
                    stroke=""
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11 5.5V16.5M16.5 11H5.5"
                    stroke=""
                    strokeOpacity="0.2"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11 5.5V16.5M16.5 11H5.5"
                    stroke=""
                    strokeOpacity="0.2"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
            <p className="font-bold text-lg leading-8 text-slate-800 text-center ">
              ${item.totalPrice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
