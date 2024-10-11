import { useUser } from "../../../component/context/authContext";
import { getOrdersById } from "../../../data/productes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../loader/loader";
import { useNavigate } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { updateOrderStatus } from "../../../data/orders";

export default function Orders() {
  const user = useUser();
  const navigate = useNavigate();
  const [openOrderMenu, setOpenOrderMenu] = useState(null);
  const [orderItem, setOrderItem] = useState();
  const [orderMenu, setOrderMenu] = useState(false);

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: () => getOrdersById(user?.id),
  });
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ id, status }) => updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });

  const handleCancelled = (id) => {
    const status = "cancelled";
    mutate({ id, status });
    setOpenOrderMenu(null); // Close the menu when the order is cancelled
  };

  useEffect(() => {
    if (!user) navigate("/signin");
  }, [user, navigate]);

  if (isLoading) return <Loader />;

  if (!orders || orders.length === 0) {
    return (
      <div className="text-2xl flex justify-center items-center h-96">
        No Orders yet
      </div>
    );
  }

  const toggleMenu = (orderId) => {
    if (openOrderMenu === orderId) {
      setOpenOrderMenu(null);
    } else {
      setOpenOrderMenu(orderId);
    }
  };

  return (
    <div className="relative">
      <h1 className="text-2xl font-semibold uppercase">orders</h1>
      <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Suspense fallback={<Loader />}>
          {orders.map((order) => (
            <div
              key={order.id}
              className="relative w-72 flex flex-col bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="h-32 bg-cover flex-shrink-0">
                <img
                  src={order.productImage}
                  alt={order.productName}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-4 flex flex-col justify-between flex-grow">
                <h1 className="text-gray-900 font-bold text-lg text-center">
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
                    className={`px-3 py-2 text-white rounded capitalize font-semibold ${
                      order.status === "shipping"
                        ? "bg-blue-400"
                        : order.status === "pickup"
                        ? "bg-orange-600"
                        : order.status === "cancelled"
                        ? "bg-red-600"
                        : "bg-green-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
              <button
                className={`${
                  order.status !== "cancelled"
                    ? "absolute right-5 top-2"
                    : "hidden"
                }`}
                onClick={() => toggleMenu(order.id)} // Toggle dropdown for specific order
              >
                <FontAwesomeIcon icon={faEllipsis} className="text-2xl" />
              </button>
              {openOrderMenu === order.id && order.status !== "cancelled" && (
                <div className="absolute top-7 right-2 flex flex-col gap-4 bg-white pt-4 pb-4 p-2 rounded-xl shadow-2xl">
                  <button
                    className="capitalize border-b pb-4 border-black"
                    onClick={() => {
                      setOrderItem(order);
                      setOrderMenu(true);
                      setOpenOrderMenu(null);
                    }}
                  >
                    order tracking
                  </button>
                  <button
                    className="capitalize -mt-1"
                    onClick={() => handleCancelled(order.id)}
                  >
                    Cancel order
                  </button>
                </div>
              )}
            </div>
          ))}
        </Suspense>
      </div>
      {orderMenu && orderItem && (
        <div className="h-fit pb-5 fixed w-72 px-2 bg-black right-0 top-16 rounded-lg text-white">
          <div className="flex justify-between my-1">
            <h1 className="text-lg">Order details</h1>
            <button
              className="text-red-500 cursor-pointer"
              onClick={() => setOrderMenu(!orderMenu)}
            >
              close
            </button>
          </div>
          <div className="text-center my-10">
            <div className="flex gap-2 items-center justify-center">
              <img src="/pegasus.png" className="w-12" />
              <h1 className="text-2xl font-bold tracking-widest">PEGASUS</h1>
            </div>
            <span className="text-neutral-700 capitalize text-sm">
              order #{orderItem.id}
            </span>
          </div>
          <div className="mt-5 flex justify-between border-b pb-3">
            <span className="font-semibold">Order Number</span>
            <span className="text-neutral-700">#{orderItem.id}</span>
          </div>
          <div className="pt-3">
            <h1 className="font-semibold tracking-wide">Order Summary</h1>
            <div className="flex flex-col gap-2 mt-5">
              <div className="flex justify-between">
                <span>Price</span>
                <span>{orderItem.productPrice}$</span>
              </div>
              <div className="flex justify-between pb-2">
                <span>Shipping</span>
                <span>20$</span>
              </div>
              <div className="flex justify-between border-t pt-2 pb-5">
                <span className="tracking-widest">Total</span>
                <span>{orderItem.productPrice + 20}$</span>
              </div>
            </div>
          </div>
          <div className="border-t pt-2">
            <h1>Order Status</h1>
            <div className="flex flex-col gap-4 mt-5">
              <div className="flex gap-3 items-center">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-blue-900 text-lg"
                />
                <span>order request</span>
              </div>
              <div className="flex gap-3 items-center">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className={`text-lg ${
                    orderItem.status === "pickup" ||
                    orderItem.status === "shipping" ||
                    orderItem.status === "completed"
                      ? "text-blue-900"
                      : ""
                  }`}
                />
                <span>Pickup</span>
              </div>
              <div
                className={`flex gap-3 items-center ${
                  orderItem.status !== "shipping" ||
                  orderItem.status === "completed"
                    ? "text-neutral-700"
                    : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className={`text-lg ${
                    orderItem.status === "shipping" ||
                    orderItem.status === "completed"
                      ? "text-blue-900"
                      : ""
                  }`}
                />
                <span>Shipping</span>
              </div>
              <div
                className={`flex gap-3 items-center ${
                  orderItem.status !== "completed" ? "text-neutral-700" : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className={`text-lg ${
                    orderItem.status === "completed" ? "text-blue-900" : ""
                  }`}
                />
                <span>Received</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
