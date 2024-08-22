import { useSelector } from "react-redux";
import NavBar from "../../component/navbar";
import Footer from "../../component/footer";
import OrderSummary from "../../component/orderSummary";
import CartItem from "../../component/cartItem";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart);

  return (
    <>
      <NavBar />
      <div className="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
          <div className="grid grid-cols-12">
            <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-16 w-full max-xl:max-w-3xl max-xl:mx-auto">
              <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                <h2 className="font-manrope font-bold text-2xl leading-10 text-slate-800">
                  Shopping Cart
                </h2>
                <h2 className="font-manrope font-bold text-lg leading-8 text-slate-800">
                  {cartItems.length} Items
                </h2>
              </div>
              {cartItems.length === 0 ? (
                <h2 className="text-2xl font-mono text-center my-12 ">
                  Add products to cart
                </h2>
              ) : (
                cartItems.map((item) => <CartItem key={item.id} item={item} />)
              )}
            </div>
            <OrderSummary cartItems={cartItems} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
