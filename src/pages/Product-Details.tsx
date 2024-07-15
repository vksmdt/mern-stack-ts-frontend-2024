import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { Skeleton } from "../components/Loader";
import { useSingleProductDetailsQuery } from "../redux/api/productApi";
import { server } from "../redux/store";

import { CartItems } from "../types/types";
import toast from "react-hot-toast";
import { addToCart } from "../redux/reducer/cartReducer";

const crtitm: CartItems = {
  productId: "",
  photo: "",
  name: "",
  price: 0,
  stock: 0,
  quantity: 0,
};

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { data, isLoading } = useSingleProductDetailsQuery(params.id!);
  const { name, price, stock, photo } = data?.product || crtitm;

  const addToCartHAndler = (cartItem: CartItems) => {
    if (cartItem.stock < 1) return toast.error("Out Of Stock");

    dispatch(addToCart(cartItem));
    toast.success("Added to Cart");
  };

  return (
    <div>
      <main className="product-details">
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            {" "}
            <section>
              <strong>ID - {data?.product._id}</strong>
              <img src={`${server}/${photo}`} alt="Product" />
              <p>{data?.product.name}</p>
              {stock > 0 ? (
                <span className="green">{stock} Available</span>
              ) : (
                <span className="red"> Not Available</span>
              )}
              <h3>₹{data?.product.price}</h3>
            </section>
            <article className="shipping-info-card">
              <h1>Product details</h1>
              <h5>Product Info</h5>
              <h1>{data?.product.name}</h1>
              <p>Description: {`this is product`}</p>

              <h1>Price: {data?.product.price}</h1>

              <h5>Stock</h5>
              <p>
                {" "}
                {stock > 0 ? (
                  <span className="green">{data?.product.stock} Available</span>
                ) : (
                  <span className="red"> Not Available</span>
                )}
              </p>
              <button
                className="shipping-btn"
                onClick={() =>
                  addToCartHAndler({
                    productId: data?.product._id as string,
                    photo,
                    name,
                    price,
                    stock,
                    quantity: 1,
                  })
                }
              >
                Add to cart
              </button>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default ProductDetails;
