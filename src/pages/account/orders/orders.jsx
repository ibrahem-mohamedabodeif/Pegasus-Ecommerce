import { useUser } from "../../../component/context/authContext";
import { getOrdersById } from "../../../data/productes";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../loader/loader";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const user = useUser();
  const navigate = useNavigate();
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: () => getOrdersById(user?.id),
  });

  if (!user) if (!user) navigate("/signin");

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
      <h1 className="text-2xl font-semibold">Your Orders</h1>
      <div className="py-10 grid grid-cols-2 gap-y-10">
        {orders.map((order) => (
          <div
            key={order.productId}
            className="flex max-w-md bg-white shadow rounded-lg overflow-hidden"
          >
            <div className="w-1/3 bg-cover">
              <img src={order.productImage} alt={order.productName} />
            </div>
            <div className="w-2/3 p-4">
              <h1 className="text-gray-900 font-bold text-2xl">
                {order.productName}
              </h1>
              <p className="mt-2 text-gray-600 text-sm">to: {order.name}</p>
              <p className="mt-2 text-gray-600 text-sm">
                address : {order.address}
              </p>
              <div className="flex item-center justify-between mt-3">
                <h1 className="text-gray-700 font-semibold text-lg">
                  ${order.productPrice} / {order.productQuantity} piecies
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
      </div>
    </div>
  );
}
