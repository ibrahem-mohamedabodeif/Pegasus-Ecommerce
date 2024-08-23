import { useState } from "react";
import CartBtn from "./cartBtn";
import SaveButton from "./saveBtn";
import { addDays, format } from "date-fns";

/* eslint-disable react/prop-types */
export default function ProducteItemdetailed({ product }) {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const date = format(addDays(new Date(), 5), "dd-MM-yyyy");

  return (
    <div className="py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                className="w-full h-full object-contain"
                src={product.image}
                alt={product.title}
              />
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {product.title}
              </h2>
              <div className="flex items-center gap-8">
                <SaveButton product={product} />
                <CartBtn product={product} size={size} color={color} />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {product.subTitle}
            </p>
            <div className="flex justify-between items-center">
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Price :
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {" "}
                    ${product.price}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Availability :
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {" "}
                    {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
              <div className="w-36 text-gray-800 flex flex-col items-center border p-2 rounded-lg shadow">
                <span className="font-medium">Will delivered</span>
                <span className="mt-2 pt-2 font-medium border-t-2 w-full text-center">
                  {date}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Select Color:
              </span>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => setColor("black")}
                  className={`w-6 h-6 rounded-full bg-black dark:bg-gray-200 mr-2 ${
                    color === "black"
                      ? "ring-2 ring-gray-400 ring-offset-2 "
                      : ""
                  }`}
                ></button>
                <button
                  onClick={() => setColor("red")}
                  className={`w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2 ${
                    color === "red" ? "ring-2 ring-gray-400 ring-offset-2 " : ""
                  }`}
                ></button>
                <button
                  onClick={() => setColor("blue")}
                  className={`w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2 ${
                    color === "blue"
                      ? "ring-2 ring-gray-400 ring-offset-2 "
                      : ""
                  }`}
                ></button>
                <button
                  onClick={() => setColor("yellow")}
                  className={`w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2 ${
                    color === "yellow"
                      ? "ring-2 ring-gray-400 ring-offset-2 "
                      : ""
                  }`}
                ></button>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Select Size:
              </span>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => setSize("M")}
                  className={`bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600 ${
                    size === "M" ? "bg-gray-700 text-white" : ""
                  }`}
                >
                  M
                </button>
                <button
                  onClick={() => setSize("L")}
                  className={`bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600 ${
                    size === "L" ? "bg-gray-700 text-white" : ""
                  }`}
                >
                  L
                </button>
                <button
                  onClick={() => setSize("XL")}
                  className={`bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600 ${
                    size === "XL" ? "bg-gray-700 text-white" : ""
                  }`}
                >
                  XL
                </button>
                <button
                  onClick={() => setSize("XXL")}
                  className={`bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600 ${
                    size === "XXL" ? "bg-gray-700 text-white" : ""
                  }`}
                >
                  XXL
                </button>
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Product Description:
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
