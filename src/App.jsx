import { BrowserRouter, Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Cart from "./pages/cart/cart";

import ContactUs from "./component/contactUs";
import CheckOut from "./pages/cart/checkOut";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";
import Loader from "./pages/loader/loader";
import SignIn from "./pages/signin/signin";
import SignUp from "./pages/signup/signup";
import Account from "./pages/account/account";
import Orders from "./pages/account/orders/orders";
import WishList from "./pages/account/wishlist/wishList";
import AccountLayout from "./pages/account/layout";
import ProtectedRoutes from "./component/protectedRoutes";
import ProductPage from "./pages/productes/productPage";

const Productes = lazy(() => import("./pages/productes/productes"));
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
            <Route path="/productes" element={<Productes />} />
            <Route path="/productes/:productId" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route
              path="/account"
              element={
                <ProtectedRoutes>
                  <AccountLayout />
                </ProtectedRoutes>
              }
            >
              <Route path="" element={<Account />} />
              <Route path="orders" element={<Orders />} />
              <Route path="wishlist" element={<WishList />} />
            </Route>
            <Route
              path="/check-out"
              element={
                <ProtectedRoutes>
                  <CheckOut />
                </ProtectedRoutes>
              }
            />

            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Suspense>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
