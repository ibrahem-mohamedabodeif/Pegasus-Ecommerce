import { BrowserRouter, Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Cart from "./pages/cart/cart";

import ContactUs from "./component/contactUs";
import CheckOut from "./pages/cart/checkOut";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";
import Loader from "./pages/loader/loader";

const Productes = lazy(() => import("./pages/productes/productes"));
const DetailedProduct = lazy(() => import("./pages/productes/detailedProduct"));
const Home = lazy(() => import("./pages/home/home"));

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productes" element={<Productes />}>
              <Route path=":productTitle" element={<DetailedProduct />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/check-out" element={<CheckOut />} />
          </Routes>
        </Suspense>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
