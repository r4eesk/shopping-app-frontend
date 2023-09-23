import { MDBCol, MDBContainer, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import ProductImageCarousel from "./ProductImageCarousel";
import { FaShoppingCart } from "react-icons/fa";
import { getProductsById } from "../services/ProductService";

import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../security/AuthProvider";
import WishlistIcon from "./WishlistIcon";
import { addToCartApi, isInCartApi } from "../services/CartService";

const ProductDetailsComponent = () => {
  const [product, setProduct] = useState({});
  const [inCart, setInCart] = useState(false);

  const authContext = useAuth();

  const userId = authContext.user;

  const authenticated = authContext.authenticated;

  const token = authContext.token;

  const { productId } = useParams();

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

  const getProduct = (id) => {
    getProductsById(id)
      .then((response) => {
        setProduct({
          ...response.data,
          img: "https://bunnynet-avatars.b-cdn.net/.ai/img/dalle-256/avatar/email-"+id+"/rabbit.jpg?width=400",
        });
      })
      .catch((error) =>
        navigate("/error", {
          state: {
            error: error.message,
          },
        })
      );
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
    getProduct(productId);
    isIncart(userId, productId, token);
  }, []);
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="5" className="sticky position-relative">
          <WishlistIcon
            user={userId}
            product={productId}
            authenticated={authenticated}
          />
          <ProductImageCarousel image={product.img} />
          <MDBRow>
            <MDBCol col="7">
              {!inCart && (
                <div className="d-grid gap-2 col-8 mx-auto">
                  <MDBBtn color="dark" onClick={addTocart}>
                    <FaShoppingCart /> Add to cart{" "}
                  </MDBBtn>
                </div>
              )}
              {inCart && (
                <div>
                  <p className="text-success">Added in Cart</p>
                  <Link to={"/cart/" + userId}>
                    <div className="d-grid gap-2 col-8 mx-auto">
                      <MDBBtn color="warning" onClick={addTocart}>
                        <FaShoppingCart /> Go to cart{" "}
                      </MDBBtn>
                    </div>
                  </Link>
                </div>
              )}
            </MDBCol>
          </MDBRow>
        </MDBCol>
        <MDBCol md="7" className="text-start p-5">
          <h4>{product.title}</h4>
          <h2 className="text-dark">{product.price}</h2>
          <p className="text-wrap text-break">{product.short_description}</p>
          <p className="text-wrap text-break">{product.description}</p>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ProductDetailsComponent;
