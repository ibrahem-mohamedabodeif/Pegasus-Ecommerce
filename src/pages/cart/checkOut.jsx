import { useForm } from "react-hook-form";
import NavBar from "../../component/navbar";
import Footer from "../../component/footer";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrder } from "../../data/orders";
import Shipping from "./shipping";
import { clearCart } from "./cartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Error from "../error";
import { useUser } from "../../component/context/authContext";
import { useEffect } from "react";

export default function CheckOut() {
  const productes = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/signin");
  }, [navigate, user]);

  const productsData = productes.map(
    ({ id, title, quantity, totalPrice, image, size, color }) => ({
      id,
      title,
      quantity,
      totalPrice,
      image,
      size,
      color,
    })
  );

  const { register, handleSubmit, reset } = useForm();

  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
      dispatch(clearCart());
      reset();
    },
    onError: (error) => {
      toast.error("can't add order");
      console.log(error.message);
    },
  });

  const onSubmit = (data) => {
    const order = productsData.map((product) => ({
      userId: user.id,
      productId: product.id,
      productName: product.title,
      productQuantity: product.quantity,
      productPrice: product.totalPrice,
      productImage: product.image,
      size: product.size,
      color: product.color,
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
          <span className=" text-lg text-center ">
            Your Order is prepared now and delivered soon, Have a nice day
          </span>
          <button
            onClick={() => navigate("/")}
            className="border rounded-lg text-lg pl-6 pr-6 pt-2 pb-2 bg-slate-800 hover:bg-slate-700 text-white"
          >
            Back Home
          </button>
        </div>
        <Footer />
      </>
    );

  if (productes.length === 0) return <Error />;

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
                        placeholder="You First and Last Name"
                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-slate-900 outline-none"
                      />

                      <input
                        disabled={isPending}
                        required
                        {...register("email")}
                        type="email"
                        placeholder="Email address"
                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-slate-900 outline-none"
                      />
                      <input
                        disabled={isPending}
                        required
                        {...register("phone", { maxLength: 11, minLength: 11 })}
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
