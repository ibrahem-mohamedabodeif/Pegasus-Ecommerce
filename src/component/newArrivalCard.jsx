import { useQuery } from "@tanstack/react-query";
import { Suspense, lazy, useState } from "react";
import Loader from "../pages/loader/loader";
import { getProductes } from "../data/productes";
import { Pagination, useMediaQuery } from "@mui/material";

import ProductItem from "./productItem";
const DetailedProduct = lazy(() =>
  import("../pages/productes/detailedProduct")
);

export default function NewArrivalCard() {
  const { isLoading, data } = useQuery({
    queryKey: ["productes"],
    queryFn: getProductes,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const itemsPerPage = isSmallScreen ? 2 : 4;

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [open, setOpen] = useState(false);

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
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {currentProductes?.map((product) => (
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
