/* eslint-disable react/prop-types */
import InfoBtn from "./infoBtn";
import SaveButton from "./saveBtn";
import { Link } from "react-router-dom";

export default function ProductItem({ product, setOpen, setSelectedProduct }) {
  return (
    <div className="group relative">
      <div className="relative max-sm:h-44 max-h-72 h-64 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <InfoBtn
          product={product}
          setOpen={setOpen}
          setSelectedProduct={setSelectedProduct}
        />
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="flex justify-between items-baseline">
        <div>
          <Link to={`/productes/${product.id}`}>
            <h3 className="mt-4 text-lg text-gray-900 flex items-center gap-6">
              {product.title}
            </h3>
          </Link>
          <h2 className="text-sm text-gray-700">( {product.subTitle} )</h2>
          {product.sale > 0 ? (
            <div className="flex gap-6">
              <p className="mt-1 text-lg font-medium text-gray-900 opacity-60 line-through">
                ${product.price}
              </p>
              <p className="mt-1 text-lg font-medium text-gray-900">
                ${product.sale}
              </p>
            </div>
          ) : (
            <p className="mt-1 text-lg font-medium text-gray-900">
              ${product.price}
            </p>
          )}
        </div>
        <SaveButton product={product} />
      </div>
    </div>
  );
}
