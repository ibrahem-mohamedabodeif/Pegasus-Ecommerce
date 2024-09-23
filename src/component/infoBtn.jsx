/* eslint-disable react/prop-types */
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function InfoBtn({ product, setOpen, setSelectedProduct }) {
  const handleNavigate = (product) => {
    setOpen(true);
    setSelectedProduct(product);
  };
  return (
    <button
      onClick={() => handleNavigate(product)}
      className="absolute left-2 top-1 text-slate-700 hover:text-white"
      aria-label="info-btn"
      name="info-btn"
    >
      <FontAwesomeIcon icon={faCircleInfo} size="lg" />
    </button>
  );
}
