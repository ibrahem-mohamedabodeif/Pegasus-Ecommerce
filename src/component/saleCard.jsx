/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { Suspense, lazy, useState } from "react";
import { Pagination, useMediaQuery } from "@mui/material";
import Loader from "../pages/loader/loader";
import { getProductes } from "../data/productes";
import ProductItem from "./productItem";
const DetailedProduct = lazy(() =>
  import("../pages/productes/detailedProduct")
);

export default function SaleCard({ style }) {
  const { isLoading, data } = useQuery({
    queryKey: ["productes"],
    queryFn: getProductes,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const itemsPerPage = isSmallScreen ? 2 : 4;

  const onSaleProducts = data?.filter((product) => product.sale > 0);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProductes = onSaleProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [open, setOpen] = useState(false);

  if (isLoading) return <Loader />;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8">
        <div className={style}>
          <Suspense fallback={<Loader />}>
            {currentProductes?.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                setOpen={setOpen}
                setSelectedProduct={setSelectedProduct}
              />
            ))}
          </Suspense>
        </div>
        <div className="mt-10 flex justify-center">
          <Pagination
            count={Math.ceil(onSaleProducts?.length / itemsPerPage)}
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
