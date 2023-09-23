import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthProvider";
import { addToCartApi, isInCartApi } from "../services/CartService";

import WishlistIcon from "./WishlistIcon";

const ProductComponent = ({ product }) => {
  const productUrl = `/products/${product.id}`;

  const [inCart, setInCart] = useState(false);

  const authContext = useAuth();

  const userId = authContext.user;

  const token = authContext.token;

  const authenticated = authContext.authenticated;

  const navigate = useNavigate();

  const addTocart = () => {
    if (authContext.authenticated === true) {
      addToCartApi(userId, product.id, 1, token)
        .then((response) => {
          setInCart(true);
        })
        .catch((error) => authContext.logout(true, true));
    } else {
      navigate("/login");
    }
  };

  const isIncart = (userId, productId, token) => {
    if (authContext.authenticated === true) {
      isInCartApi(userId, productId, token)
        .then((response) => setInCart(response.data.IsInCart))
        .catch((error) => {
          console.log(error);
          authContext.logout(true, true);
        });
    }
  };

  useEffect(() => {
    isIncart(userId, product.id, token);
  }, [userId, product.id, token]);

  return (
    <MDBContainer>
      <div className="my-3 p-3 bg-light shadow-5 rounded position-relative ">
        <WishlistIcon
          user={userId}
          product={product.id}
          authenticated={authenticated}
        />
        <MDBRow>
          <MDBCol md={3}>
            <Link to={productUrl}>
              <img
                src={product.img}
                className="img-fluid rounded"
                alt={product.title}
              />
            </Link>
          </MDBCol>

          <MDBCol md={6}>
            <Link to={productUrl}>
              <h4 className="text-dark">{product.title}</h4>
              <p className="text-wrap text-break text-dark">
                {product.short_description}
              </p>
            </Link>
          </MDBCol>

          <MDBCol md="3">
            {product.quantity < 10 && product.quantity > 0 && (
              <small className="text-warning">
                Only {product.quantity} units left
              </small>
            )}
            {product.quantity === 0 && (
              <small className="text-danger">Out of Stock!!!</small>
            )}
            <p className="m-1">₹{product.price.toFixed(2)}</p>

            {!inCart && (
              <MDBBtn color="dark" onClick={addTocart}>
                <FaShoppingCart /> Add to cart{" "}
              </MDBBtn>
            )}
            {inCart && (
              <div>
                <p className="text-success">Added in Cart</p>
                <Link to={"/cart/" + userId}>
                  <MDBBtn color="warning" onClick={addTocart}>
                    <FaShoppingCart /> Go to cart{" "}
                  </MDBBtn>
                </Link>
              </div>
            )}
          </MDBCol>
        </MDBRow>
      </div>
    </MDBContainer>
  );
};

export default ProductComponent;
