import { MDBBtn, MDBBtnGroup, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductsById } from "../services/ProductService";
import { AiOutlineMinus, AiOutlinePlus, AiFillDelete } from "react-icons/ai";
import { removeFromCartApi, updateQuantityApi } from "../services/CartService";
import { useAuth } from "../security/AuthProvider";

const CartItem = ({ productId, quantity, setTotalItems }) => {
  const productUrl = `/products/${productId}`;

  const [product, setProduct] = useState({});
  const [removed, setRemoved] = useState(false);
  const [qnty, setQnty] = useState(quantity);

  const authContext = useAuth();

  const userId = authContext.user;
  const token = authContext.token;
  const authenticated = authContext.authenticated;

  const getProduct = (id) => {
    getProductsById(id)
      .then((response) => {
        const prd = {
          ...response.data,
          img: "https://bunnynet-avatars.b-cdn.net/.ai/img/dalle-256/avatar/email-"+id+"/rabbit.jpg?width=1000",
        };

        setProduct(prd);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const decreaseQuantity = () => {
    if (qnty !== 1)
      updateQuantityApi(userId, productId, qnty - 1, token)
        .then((response) => {
          setQnty((q) => q - 1);
          setTotalItems((q) => q - 1);
        })
        .catch((error) => authContext.logout(true, true));
  };

  const increaseQuantity = () => {
    updateQuantityApi(userId, productId, qnty + 1, token)
      .then((response) => {
        setQnty((q) => q + 1);
        setTotalItems((q) => q + 1);
      })
      .catch((error) => authContext.logout(true, true));
  };

  const removeFromCart = () => {
    removeFromCartApi(userId, productId, token)
      .then((response) => {
        setRemoved(true);
        setTotalItems((q) => q - qnty)
      })
      .catch((error) => authContext.logout(true, true));
  };

  useEffect(() => {
    getProduct(productId);
  }, [productId]);

  return (
    <div>
      {!removed && (
        <MDBRow className="my-3 shadow-5 rounded  p-3">
          <MDBCol size="3" className="my-auto">
            <Link to={productUrl}>
              <img
                src={product.img}
                className="img-fluid rounded"
                alt={product.title}
              />
            </Link>
          </MDBCol>

          <MDBCol size="6" className="my-auto">
            <Link to={productUrl}>
              <h4 className="text-dark">{product.title}</h4>
              <h3 className="text-dark">₹{product.price}</h3>
            </Link>
            {qnty > 1 && (
              <MDBBtn
                color="light text-danger"
                className="btn-sm"
                onClick={decreaseQuantity}
              >
                <AiOutlineMinus />
              </MDBBtn>
            )}
            {qnty <= 1 && (
              <MDBBtn
                color="light text-danger"
                className="btn-sm"
                onClick={removeFromCart}
              >
                <AiFillDelete />
              </MDBBtn>
            )}
            <span className="p-2 fs-6">{qnty}</span>
            <MDBBtn
              color="light text-success"
              className="btn-sm"
              onClick={increaseQuantity}
            >
              <AiOutlinePlus />
            </MDBBtn>
          </MDBCol>
          <MDBCol size="3" className="my-auto">
            <MDBBtn color="danger" onClick={removeFromCart}>
              <AiFillDelete />
              {"  Remove"}
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      )}
    </div>
  );
};

export default CartItem;
