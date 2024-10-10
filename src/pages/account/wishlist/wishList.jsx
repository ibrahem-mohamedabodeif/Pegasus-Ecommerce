import { useUser } from "../../../component/context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../loader/loader";
import { deleteWishProduct, getWishList } from "../../../data/productes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Suspense, useEffect } from "react";

export default function WishList() {
  const user = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: wishProductes, isLoading } = useQuery({
    queryKey: ["wishList", user?.id],
    queryFn: () => getWishList(user?.id),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteWishProduct,
    onSuccess: () => {
      toast.success("Successfully deleted");
      queryClient.invalidateQueries(["wishList", user?.id]);
    },
    onError: () => {
      toast.error("Failed to delete");
    },
  });

  useEffect(() => {
    if (!user) navigate("/signin");
  }, [user, navigate]);

  if (isLoading) return <Loader />;

  if (!wishProductes || wishProductes.length === 0) {
    return (
      <div className="text-2xl flex justify-center items-center h-96">
        No Products yet
      </div>
    );
  }

  const handleDelete = (productId) => {
    deleteMutation.mutate(productId);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Wish List</h1>
      <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishProductes.map((product) => (
          <div
            key={product.productId}
            className="w-60 relative flex flex-col  items-center bg-white shadow rounded-lg overflow-hidden"
          >
            <Suspense fallback={<Loader />}>
              <div className="h-32 bg-cover flex-shrink-0">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="pt-2 flex flex-col justify-between flex-grow">
                <Link
                  to={`/productes/${product.productId}`}
                  className="text-gray-900 font-bold text-lg"
                >
                  {product.productName}
                </Link>
                <p className="pt-1 text-gray-600 text-center">
                  {product.productSubtitle}
                </p>

                <div className="flex justify-between items-center pb-4 pt-2">
                  <h1 className="text-gray-700 font-semibold text-xl">
                    ${product.productPrice} / piece
                  </h1>
                  <button
                    onClick={() => handleDelete(product.productId)}
                    className="absolute right-0 top-0 px-2 py-1 bg-red-400 hover:bg-red-600 text-white rounded"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  );
}
