/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { getProductes } from "../../data/productes";
import { useSearchParams } from "react-router-dom";
import { Suspense, lazy, useState, useMemo, useEffect } from "react";
import Loader from "../loader/loader";
import { Pagination } from "@mui/material";
import ProductItem from "../../component/productItem";

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

  if (isLoading || isFetching || isPending) return <Loader />;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className={style}>
          <Suspense fallback={<Loader />}>
            {currentProductes.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                setOpen={setOpen}
                setSelectedProduct={setSelectedProduct}
              />
            ))}
          </Suspense>
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
