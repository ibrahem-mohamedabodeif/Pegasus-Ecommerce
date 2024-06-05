import { useQuery } from "@tanstack/react-query";
import { getProductes } from "../../data/productes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice";
import { useSearchParams } from "react-router-dom";
import { Suspense, lazy, useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../loader/loader";
import { Pagination } from "@mui/material";

const DetailedProduct = lazy(() => import("./detailedProduct"));

export default function ProductesCard({ style }) {
  const { isLoading, data: productes } = useQuery({
    queryKey: ["productes"],
    queryFn: getProductes,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [searchParams, setSearchParams] = useSearchParams();
  const filtedValue = searchParams.get("category") || "All products";

  const filteredProduct = useMemo(() => {
    if (!productes) return [];
    switch (filtedValue) {
      case "Hoodies":
      case "Long Sleeve Shirt":
      case "T-Shirt":
        return productes.filter((product) => product.category === filtedValue);
      case "All products":
      default:
        return productes;
    }
  }, [productes, filtedValue]);

  const sortedValue = searchParams.get("sortBy") || "";
  const [field] = sortedValue.split(":");

  useEffect(() => {
    if (field === "disable") {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.delete("sortBy");
        return newParams;
      });
    }
  }, [field, setSearchParams]);

  const sortedProductes = useMemo(() => {
    if (!filteredProduct) return [];
    switch (field) {
      case "newArrivals":
        return filteredProduct.filter((item) => item.newArrival === "true");
      case "sale":
        return filteredProduct.filter((item) => item.sale > 0);
      case "priceh":
        return [...filteredProduct].sort((a, b) => b.price - a.price);
      case "pricel":
        return [...filteredProduct].sort((a, b) => a.price - b.price);
      default:
        return filteredProduct;
    }
  }, [filteredProduct, field]);

  const currentProductes = useMemo(() => {
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    return sortedProductes.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [sortedProductes, currentPage, itemsPerPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

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

  if (isLoading) return <div>...Loading</div>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className={style}>
          {currentProductes.map((product) => (
            <a key={product.id} className="group">
              <div
                onClick={() => handleNavigate(product)}
                className="max-h-72 h-64 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>

              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="mt-4 text-lg text-gray-900 flex items-center gap-6">
                    {product.title}
                    {product.newArrival === "true" && (
                      <span className="text-red-700 text-center text-[16px] font-semibold">
                        new
                      </span>
                    )}
                  </h3>
                  <h2 className="text-sm text-gray-700">
                    ( {product.subTitle} )
                  </h2>
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

                <div className="text-xl mr-2">
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
        <div className="mt-14 flex justify-center">
          <Pagination
            count={Math.ceil(sortedProductes.length / itemsPerPage)}
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
            onClose={() => setOpen(false)}
          />
        )}
      </Suspense>
    </div>
  );
}
