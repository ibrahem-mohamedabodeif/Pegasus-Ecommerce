import { useUser } from "../../../component/context/authContext";
import { getOrdersById } from "../../../data/productes";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../loader/loader";
import { useNavigate } from "react-router-dom";
import { Suspense, useEffect } from "react";

export default function Orders() {
  const user = useUser();
  const navigate = useNavigate();
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: () => getOrdersById(user?.id),
  });

  useEffect(() => {
    if (!user) navigate("/signin");
  }, [user, navigate]);

  if (isLoading) <Loader />;

  if (!orders || orders.length === 0) {
    return (
      <div className="text-2xl flex justify-center items-center h-96">
        No Orders yet
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold uppercase">orders</h1>
      <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<Loader />}>
          {orders.map((order) => (
            <div
              key={order.productId}
              className="flex flex-col bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="h-48 bg-cover flex-shrink-0">
                <img
                  src={order.productImage}
                  alt={order.productName}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-4 flex flex-col justify-between flex-grow">
                <h1 className="text-gray-900 font-bold text-2xl text-center">
                  {order.productName}
                </h1>
                <p className="mt-2 text-gray-600 text-sm">to: {order.name}</p>
                <p className="mt-2 text-gray-600 text-sm">
                  address : {order.address}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <h1 className="text-gray-700 font-semibold text-lg">
                    ${order.productPrice} / {order.productQuantity} pieces
                  </h1>
                  <span
                    className={`px-3 py-2 text-white rounded ${
                      order.status === "on deliver"
                        ? "bg-green-400"
                        : "bg-green-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Suspense>
      </div>
    </div>
  );
}
