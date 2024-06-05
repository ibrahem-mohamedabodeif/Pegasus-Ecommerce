import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice";
import toast from "react-hot-toast";

export default function DetailedProduct({ product, isOpen, onClose }) {
  const cartItem = (product) => {
    const quantity = 1;
    const price = product.sale > 0 ? product.sale : product.price;
    return {
      id: product.id,
      title: product.title,
      price,
      category: product.category,
      image: product.image,
      quantity,
      totalPrice: quantity * price,
    };
  };
  const dispatch = useDispatch();

  if (!product) return null;

  return (
    <Transition show={isOpen}>
      <Dialog className="relative z-10" onClose={onClose}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <DialogPanel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-xl">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>

                    <FontAwesomeIcon
                      icon={faXmark}
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font text-gray-900 sm:pr-12">
                        {product.category}
                      </h2>
                      <p className=" mt-4 text-sm text-gray-500">
                        {product.subTitle}
                      </p>
                      <p className=" mt-4 text-sm text-gray-500">
                        {product.description}
                      </p>

                      <section
                        aria-labelledby="information-heading"
                        className="mt-5 lg:mt-20"
                      >
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>

                        <div className="flex justify-between">
                          <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                            {product.title}
                          </h2>
                          {product.sale > 0 ? (
                            <div className="flex gap-8">
                              <p className="text-2xl opacity-90 text-gray-900 line-through">
                                $ {product.price}
                              </p>
                              <p className="text-2xl text-gray-900">
                                $ {product.sale}
                              </p>
                            </div>
                          ) : (
                            <p className="text-2xl text-gray-900">
                              $ {product.price}
                            </p>
                          )}
                        </div>
                      </section>

                      <section
                        aria-labelledby="options-heading"
                        className="mt-10"
                      >
                        <h3 id="options-heading" className="sr-only">
                          Product options
                        </h3>

                        <button
                          onClick={() => {
                            dispatch(addToCart(cartItem(product)));
                            onClose();
                            toast.success("product add to cart");
                          }}
                          type="submit"
                          className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-slate-900 px-8 py-3 text-base font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Add to cart
                        </button>
                      </section>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
