import NavBar from "../../component/navbar";
import Footer from "../../component/footer";
import { lazy, Suspense } from "react";
import Loader from "../loader/loader";
const HomeSec = lazy(() => import("./home-sec"));
const NewArrivalSec = lazy(() => import("./new-arrival-sec"));
const SaleSec = lazy(() => import("./sale-sec"));

export default function Home() {
  return (
    <>
      <NavBar />
      <Suspense fallback={<Loader />}>
        <div className="section">
          <HomeSec />
        </div>
        <div className="section">
          <NewArrivalSec />
        </div>
        <div className="section">
          <SaleSec />
        </div>
      </Suspense>
      <Footer />
    </>
  );
}
