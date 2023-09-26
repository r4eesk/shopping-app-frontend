import { MDBBtn, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthProvider";
import { getTotalApi } from "../services/CartService";

const CartTotal = ({ totalItems, purchase,purchaseApi }) => {
  const [total, setTotal] = useState({
    cartTotal: 0.0,
    delivery: 0.0,
    discount: 0.0,
    tax: 0.0,
    total: 0.0,
  });

  const authContext = useAuth();
  const token = authContext.token;

  const { userId } = useParams();

  const getTotal = (user, tok) => {
    getTotalApi(user, tok)
      .then((response) => {
        setTotal(response.data);
      })
      .catch((error) => authContext.logout(true, true));
  };

  useEffect(() => {
    getTotal(userId, token);
  }, [totalItems]);

  return (
    <div className="p-3 position-sticky shadow-5  fixed-top rounded my-3">
      <h4>Total</h4>
      <hr />
      <MDBRow>
        {totalItems&&<p>Total Items : {totalItems}</p>}
        <MDBCol>
          <p className="text-start">Price</p>
        </MDBCol>
        <MDBCol>
          <p className="text-start">₹{total.cartTotal.toFixed(2)}</p>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol>
          <p className="text-start">GST</p>
        </MDBCol>
        <MDBCol>
          <p className="text-start">₹{total.tax.toFixed(2)}</p>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol>
          <p className="text-start ">Discount</p>
        </MDBCol>
        <MDBCol>
          <p className="text-start text-success">
            -₹{total.discount.toFixed(2)}
          </p>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol>
          <p className="text-start">Delivery</p>
        </MDBCol>
        <MDBCol>
          <p className="text-start">₹{total.delivery.toFixed(2)}</p>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol>
          <h6 className="text-start">Total</h6>
        </MDBCol>
        <MDBCol>
          <h6 className="text-start">₹{total.total.toFixed(2)}</h6>
        </MDBCol>
      </MDBRow>
      {total.total !== 0 && !purchase && (
        <Link to={"/cart/order/" + userId}>
          <MDBBtn color="success my-4">Place Order</MDBBtn>
        </Link>
      )}
      {total.total === 0 && !purchase && (
        <MDBBtn color="dark my-4" disabled>
          Place Order
        </MDBBtn>
      )}

      {total.total !== 0 && purchase && (
        <MDBBtn color="success my-4" onClick={purchaseApi} >
          Purchase
        </MDBBtn>
      )}
    </div>
  );
};

export default CartTotal;
