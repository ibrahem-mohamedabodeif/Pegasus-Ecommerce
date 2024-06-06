import { useForm } from "react-hook-form";
import NavBar from "../../component/navbar";
import Footer from "../../component/footer";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrder } from "../../data/orders";
import Shipping from "./shipping";
import { clearCart } from "./cartSlice";
import toast from "react-hot-toast";

export default function CheckOut() {
  const productes = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const productsData = productes.map(({ id, title, quantity, totalPrice }) => ({
    id,
    title,
    quantity,
    totalPrice,
  }));

  const { register, handleSubmit, reset } = useForm();

  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
      dispatch(clearCart());
      reset();
    },
    onError: () => {
      toast.error("error in add order");
    },
  });

  const onSubmit = (data) => {
    const order = productsData.map((product) => ({
      productId: product.id,
      productName: product.title,
      productQuantity: product.quantity,
      productPrice: product.totalPrice,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
    }));

    mutate(order);
  };

  if (isSuccess)
    return (
      <>
        <NavBar />
        <div className="flex flex-col gap-y-10  items-center my-36">
          <Shipping />
          <span className=" text-lg ">
            Your Order is prepared now and delivered soon, Have a nice day
          </span>
        </div>
        <Footer />
      </>
    );

  return (
    <>
      <NavBar />
      <div>
        <div className="font-sans bg-white p-4 mt-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-800 inline-block border-b-[3px] border-gray-800 pb-1">
                Checkout
              </h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-12">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-300">01</h3>
                    <h3 className="text-xl font-bold text-gray-800 mt-1">
                      Personal Details
                    </h3>
                  </div>

                  <div className="md:col-span-2">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input
                        disabled={isPending}
                        required
                        {...register("name")}
                        type="text"
                        placeholder="You name"
                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-slate-900 outline-none"
                      />

                      <input
                        disabled={isPending}
                        required
                        {...register("email")}
                        type="text"
                        placeholder="Email address"
                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-slate-900 outline-none"
                      />
                      <input
                        disabled={isPending}
                        required
                        {...register("phone")}
                        type="number"
                        placeholder="Phone number"
                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-slate-900 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-12">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-300">02</h3>
                    <h3 className="text-xl font-bold text-gray-800 mt-1">
                      Shipping Address
                    </h3>
                  </div>

                  <div className="md:col-span-2">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input
                        disabled={isPending}
                        required
                        {...register("address")}
                        type="text"
                        placeholder="address"
                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-slate-900 outline-none"
                      />
                      <input
                        disabled={isPending}
                        type="text"
                        placeholder="City"
                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-slate-900 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-end gap-4 mt-12 mb-10">
                  <button
                    disabled={isPending}
                    type="submit"
                    className="px-6 py-3 text-sm font-semibold tracking-wide bg-slate-800 text-white rounded-md hover:bg-slate-900"
                  >
                    Ship Now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
