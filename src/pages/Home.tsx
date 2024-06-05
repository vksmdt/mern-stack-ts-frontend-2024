import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { useLatestProductQuery } from "../redux/api/productApi";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItems } from "../types/types";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductQuery("");
  const dispatch = useDispatch();

  const addToCartHAndler = (cartItem: CartItems) => {
    if (cartItem.stock < 1) return toast.error("Out Of Stock");

    dispatch(addToCart(cartItem));
    toast.success("Added to Cart")
  };


  if (isError) {
    toast.error("Can Not Fetch The Products");
  }

  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link className="findmore" to={"/search"}>
          More
        </Link>
      </h1>

      <main>
        {isLoading ? (
          <Skeleton width="80vw" />
        ) : (
          data?.products.map((products) => {
            return (
              <ProductCard
                key={products._id}
                productId={products._id}
                name={products.name}
                photo={products.photo}
                price={products.price}
                stock={products.stock}
                handler={addToCartHAndler}
              />
            );
          })
        )}
      </main>
    </div>
  );
};

export default Home;
