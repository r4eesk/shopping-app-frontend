import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthProvider";
import { getCartApi } from "../services/CartService";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";

const CartComponent = () => {
  const [items, setItems] = useState({});
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const authContext = useAuth();
  const token = authContext.token;

  const { userId } = useParams();

  const getCartItems = (userId, token) => {
    getCartApi(userId, token)
      .then((response) => {
        const data = response.data;
        setItems(data.products);
        setProducts(Object.keys(data.products));
        setTotalItems(Object.values(data.products).reduce((x, y) => x + y, 0));
      })
      .catch((error) => {
        authContext.logout(true, true);
      });
  };

  useEffect(() => {
    getCartItems(userId, token);
  }, [userId]);

  return (
    <MDBContainer>
      <h3 className="pt-4">My Cart</h3>
      <MDBRow>
        <MDBCol md="8">
          {totalItems === 0 && (
            <div className="my-5">
              <h1>Your Cart is Empty!!</h1>
              <Link to="/products">
                <MDBBtn className="my-3">Shop now</MDBBtn>
              </Link>
            </div>
          )}
          {totalItems !== 0 && (
            <div>
              {products.map((item) => {
                return (
                  <CartItem
                    productId={item}
                    quantity={items[item]}
                    setTotalItems={setTotalItems}
                  />
                );
              })}
            </div>
          )}
        </MDBCol>

        <MDBCol md="4">
          <CartTotal totalItems={totalItems}  />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default CartComponent;
