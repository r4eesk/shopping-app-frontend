import { MDBContainer } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../security/AuthProvider";
import { getOrdersListApi} from "../services/OrderService";
import Order from "./Order";

const OrderComponent = () => {

    const authContext = useAuth();
    const user = authContext.user;
    const token = authContext.token;



  const [orders, setOrders] = useState([]);

  const getOrderList = (uId,tok) => {
    getOrdersListApi(uId,tok)
        .then(response => setOrders(response.data))
        .catch(error => authContext.logout(true,true))
  }

  useEffect(() => {
    getOrderList(user,token)
  }, [user]);

  return (
    <MDBContainer>
      <h3 className="my-4">My Orders</h3>
      {orders.map((order) => {
        return <Order order={order} key={order.id}/>;
      })}
    </MDBContainer>
  );
};

export default OrderComponent;
