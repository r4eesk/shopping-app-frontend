import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductsById } from "../services/ProductService";

const OrderProduct = ({ productId,quantity}) => {
  const [product, setProduct] = useState({});

  const productUrl = `/products/${productId}`;

  const getProduct = (productId) => {
    getProductsById(productId)
      .then((response) =>
        setProduct({
          ...response.data,
          img:
            "https://bunnynet-avatars.b-cdn.net/.ai/img/dalle-256/avatar/email-" +
            productId +
            "/rabbit.jpg?width=100",
        })
      )
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProduct(productId);
  }, [productId]);

  return (
    <div className="shadow-3 rounded p-2 my-3">
      <Link to={productUrl}>
        <h6>{product.title}</h6>
        <img
          src={product.img}
          className="img-fluid rounded"
          alt={product.title}
        />
      </Link>
      <p>Quantity : {quantity}</p>
    </div>
  );
};

export default OrderProduct;
