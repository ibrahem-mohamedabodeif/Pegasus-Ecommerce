import { Link, useParams } from "react-router-dom";
import NavBar from "../../component/navbar";
import ProducteItemdetailed from "../../component/producteItemdetailed";
import { getProductById } from "../../data/productes";
import { useQuery } from "@tanstack/react-query";
import Loader from "../loader/loader";
import Footer from "../../component/footer";
import RelatedProductes from "../../component/relatedProductes";

export default function ProductPage() {
  const { productId } = useParams();
  const {
    isLoading,
    data: product,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["product"],
    queryFn: () => getProductById(productId),
  });

  if (isFetching || isLoading || isPending) return <Loader />;
  return (
    <>
      <NavBar />
      <div className="pt-20 pl-14 text-xl font-semibold">
        <Link to={"/productes"}>Productes</Link>
        <span className="text-gray-600"> / {product.title}</span>
      </div>
      <ProducteItemdetailed product={product} />
      <div className="border-t-2 pt-10 mb-14">
        <h1 className="text-2xl font-semibold mb-10 mx-14">
          Related productes
        </h1>
        <RelatedProductes product={product} />
      </div>
      <Footer />
    </>
  );
}
