import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../component/navbar";
import { decreaseQuantity, deleteItem, increaseQuantity } from "./cartSlice";
import Footer from "../../component/footer";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const totalPrice = cartItems.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shipping = 50;
  const handleCheckOut = () => {
    cartItems.length > 0
      ? navigate("/check-out")
      : toast.error("add products to cart");
  };
  return (
    <>
      <NavBar />
      <div className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
          <div className="grid grid-cols-12">
            <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-16 w-full max-xl:max-w-3xl max-xl:mx-auto">
              <div
                aria-label="header"
                className="flex items-center justify-between pb-8 border-b border-gray-300"
              >
                <h2 className="font-manrope font-bold text-2xl leading-10 text-slate-800">
                  Shopping Cart
                </h2>
                <h2 className="font-manrope font-bold text-lg leading-8 text-slate-800">
                  {cartItems.length} Items
                </h2>
              </div>
              {cartItems.length === 0 ? (
                <h2 className="text-2xl font-mono text-center my-12 ">
                  Add products to cart
                </h2>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id}>
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
                          <div className="max-sm:gap-1 flex flex-col max-[500px]:items-center gap-3">
                            <h6 className="font-semibold text-base leading-7 text-slate-800">
                              {item.title}
                            </h6>
                            <h6 className="font-normal text-base leading-7 text-gray-500">
                              {item.category}
                            </h6>
                            <h6 className="font-medium text-base leading-7 text-slate-800">
                              ${item.price}
                            </h6>
                          </div>
                        </div>
                        <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                          <div className="flex items-center h-full max-sm:w-[200px]">
                            <button
                              onClick={() =>
                                dispatch(decreaseQuantity(item.id))
                              }
                              className="max-sm:w-14 max-sm:h-10 group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
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
                              onClick={() =>
                                dispatch(increaseQuantity(item.id))
                              }
                              className="max-sm:w-14 max-sm:h-10 group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
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
                ))
              )}
            </div>
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
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
