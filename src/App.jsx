import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";
import Loader from "./pages/loader/loader";
import AccountLayout from "./pages/account/layout";
import ProtectedRoutes from "./component/protectedRoutes";

const Productes = lazy(() => import("./pages/productes/productes"));
const Home = lazy(() => import("./pages/home/home"));
const Cart = lazy(() => import("./pages/cart/cart"));
const ContactUs = lazy(() => import("./component/contactUs"));
const CheckOut = lazy(() => import("./pages/cart/checkOut"));
const SignIn = lazy(() => import("./pages/signin/signin"));
const SignUp = lazy(() => import("./pages/signup/signup"));
const Account = lazy(() => import("./pages/account/account"));
const Orders = lazy(() => import("./pages/account/orders/orders"));
const WishList = lazy(() => import("./pages/account/wishlist/wishList"));
const ProductPage = lazy(() => import("./pages/productes/productPage"));

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
