import { FaCartPlus, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
import { CartItems } from "../types/types";

type produtProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItems) => string | undefined;
};

const ProductCard = ({
  productId,
  photo,
  name,
  price,
  stock,
  handler,
}: produtProps) => {


  return (
    <div className="productCard">
      <img src={`${server}/${photo}`} alt={name} />
      <p>{name ? `${name.slice(0, 30)}...` : ""}</p>
      <span>₹ {price}</span>
      <div>
        <button
          onClick={() =>
            handler({ productId, photo, name, price, stock, quantity: 1 })
          }
        >
          <FaCartPlus />
        </button>
        <Link to={`/${productId}`}>
          {" "}
          <button>
            <FaEye />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
