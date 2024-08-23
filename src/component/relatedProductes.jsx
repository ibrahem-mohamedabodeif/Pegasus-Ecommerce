/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { getProductes } from "../data/productes";
import { Pagination, useMediaQuery } from "@mui/material";
import ProductItem from "./productItem";
import Loader from "../pages/loader/loader";
import DetailedProduct from "../pages/productes/detailedProduct";

export default function RelatedProductes({ product }) {
  const { isLoading, data: productes } = useQuery({
    queryKey: ["productes"],
    queryFn: getProductes,
  });

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [open, setOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const itemsPerPage = isSmallScreen ? 2 : 4;

  const relatedProductes =
    productes?.filter((item) => item.category === product.category) || [];

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProductes = relatedProductes.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8">
        {currentProductes.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {currentProductes.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  setOpen={setOpen}
                  setSelectedProduct={setSelectedProduct}
                />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Pagination
                count={Math.ceil(relatedProductes.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                size="medium"
              />
            </div>
          </>
        ) : (
          <p className="text-xl font-bold flex justify-center">
            No related products found.
          </p>
        )}
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
    </div>
  );
}
