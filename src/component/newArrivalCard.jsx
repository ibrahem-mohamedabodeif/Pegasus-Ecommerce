import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense, lazy, useState } from "react";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { addToCart } from "../pages/cart/cartSlice";
import Loader from "../pages/loader/loader";
import { getProductes } from "../data/productes";
import { Pagination } from "@mui/material";
const DetailedProduct = lazy(() =>
  import("../pages/productes/detailedProduct")
);

export default function NewArrivalCard() {
  const { isLoading, data } = useQuery({
    queryKey: ["productes"],
    queryFn: getProductes,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const dispatch = useDispatch();

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [open, setOpen] = useState(false);

  const handleNavigate = (product) => {
    setOpen(true);
    setSelectedProduct(product);
  };

  const cartItem = (product) => {
    const price = product.sale > 0 ? product.sale : product.price;
    return {
      id: product.id,
      title: product.title,
      price,
      category: product.category,
      image: product.image,
      quantity: 1,
      totalPrice: price * 1,
    };
  };

  const newArrivalProducts = data?.filter(
    (product) => product.newArrival === "true"
  );

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProductes = newArrivalProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  if (isLoading) return <div>...Loading</div>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {currentProductes?.map((product) => (
            <a key={product.id} className="group">
              <div
                onClick={() => handleNavigate(product)}
                className=" max-h-72 h-64 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div>
                    <h3 className="mt-4 text-lg text-gray-900 flex gap-5">
                      {product.title}
                      <span className=" text-red-700  text-center text-[16px] font-semibold">
                        new
                      </span>
                    </h3>
                    <h2 className="text-sm text-gray-700">
                      ( {product.subTitle} )
                    </h2>
                  </div>
                  <div className="flex gap-10">
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
                </div>
                <div className=" text-xl flex gap-4 mr-2">
                  <button
                    onClick={() => {
                      dispatch(addToCart(cartItem(product)));
                      toast.success("product add to cart");
                    }}
                  >
                    <FontAwesomeIcon icon={faCartShopping} />
                  </button>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Pagination
            count={Math.ceil(newArrivalProducts?.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            size="large"
          />
        </div>
      </div>
      <Suspense fallback={<Loader />}>
        {open && (
          <DetailedProduct
            product={selectedProduct}
            isOpen={open}
            onClose={() => {
              setOpen(false);
            }}
          />
        )}
      </Suspense>
    </div>
  );
}
