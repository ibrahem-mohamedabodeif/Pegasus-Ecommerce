import NavBar from "../../component/navbar";
import Footer from "../../component/footer";
import { Suspense, lazy } from "react";
import Loader from "../loader/loader";
const ProductesCard = lazy(() => import("./productesCard"));
const Sort = lazy(() => import("./sort"));

export default function Productes() {
  return (
    <>
      <NavBar />
      <Suspense fallback={<Loader />}>
        <Sort
          productes={
            <ProductesCard style="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8" />
          }
        />
      </Suspense>
      <Footer />
    </>
  );
}
