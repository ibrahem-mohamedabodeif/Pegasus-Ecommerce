import { useUser } from "../../../component/context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../loader/loader";
import { deleteWishProduct, getWishList } from "../../../data/productes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function WishList() {
  const user = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: wishProductes, isLoading } = useQuery({
    queryKey: ["orders", user?.id],
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

  if (!user) navigate("/signin");

  if (isLoading) <Loader />;

  if (!wishProductes || wishProductes.length === 0) {
    return (
      <div className="text-2xl flex justify-center items-center h-96">
        No Productes yet
      </div>
    );
  }

  const handleDelete = (productId) => {
    deleteMutation.mutate(productId);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Wish List</h1>
      <div className="py-10 grid grid-cols-2 gap-y-10">
        {wishProductes.map((product) => (
          <div
            key={product.productId}
            className="flex max-w-md bg-white shadow rounded-lg overflow-hidden"
          >
            <div className="w-1/3 bg-cover">
              <img src={product.productImage} alt={product.productName} />
            </div>
            <div className="w-2/3 p-4 flex flex-col justify-between">
              <Link
                to={`/productes/${product.productId}`}
                className="text-gray-900 font-bold text-2xl"
              >
                {product.productName}
              </Link>
              <p className="mt-2 text-gray-600 text-sm">
                {product.productSubtitle}
              </p>

              <div className="flex item-center justify-between mt-3">
                <h1 className="text-gray-700 font-semibold text-lg">
                  ${product.productPrice}
                </h1>
                <button
                  onClick={() => handleDelete(product.productId)}
                  className="px-3 py-2 bg-red-300 hover:bg-red-600 text-white rounded"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
