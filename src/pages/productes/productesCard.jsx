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

const ProductesCard = ({ style }) => {
  const {
    isLoading,
    data: productes,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["productes"],
    queryFn: getProductes,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);

  const categoryValue = searchParams.get("category") || "All products";
  const sortValue = searchParams.get("sort") || "disable";
  const filterValue = searchParams.get("filter") || "disable";

  const filteredProducts = useMemo(() => {
    if (!productes) return [];

    let filtered = productes;

    if (categoryValue !== "All products") {
      filtered = productes.filter(
        (product) => product.category === categoryValue
      );
    }

    if (sortValue !== "disable") {
      const [field, order] = sortValue.split(":");
      filtered = filtered.sort((a, b) => {
        if (order === "desc") {
          return b[field] - a[field];
        } else {
          return a[field] - b[field];
        }
      });
    }

    if (filterValue !== "disable") {
      if (filterValue === "newArrivals") {
        filtered = filtered.filter((item) => item.newArrival === "true");
      } else if (filterValue === "sale") {
        filtered = filtered.filter((item) => item.sale > 0);
      }
    }

    return filtered;
  }, [productes, categoryValue, sortValue, filterValue]);

  const currentProductes = useMemo(() => {
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [filteredProducts, currentPage, itemsPerPage]);

  useEffect(() => {
    if (sortValue === "disable" || filterValue === "disable") {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        if (sortValue === "disable") newParams.delete("sort");
        if (filterValue === "disable") newParams.delete("filter");
        return newParams;
      });
    }
  }, [sortValue, filterValue, setSearchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortValue, filterValue, categoryValue]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleNavigate = (product) => {
    setOpen(true);
    setSelectedProduct(product);
  };

  const addToCartHandler = (product) => {
    const price = product.sale > 0 ? product.sale : product.price;
    const item = {
      id: product.id,
      title: product.title,
      price,
      category: product.category,
      image: product.image,
      quantity: 1,
      totalPrice: price * 1,
    };
    dispatch(addToCart(item));
    toast.success("Product added to cart");
  };

  if (isLoading) return <Loader />;
  if (isFetching) return <Loader />;
  if (isPending) return <Loader />;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className={style}>
          {currentProductes.map((product) => (
            <a key={product.id} className="group">
              <div
                onClick={() => handleNavigate(product)}
                className="max-sm:h-44 max-h-72 h-64 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
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
                  <button onClick={() => addToCartHandler(product)}>
                    <FontAwesomeIcon icon={faCartShopping} />
                  </button>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <Pagination
            count={Math.ceil(filteredProducts.length / itemsPerPage)}
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
};

export default ProductesCard;
