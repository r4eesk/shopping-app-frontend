import { MDBBtn, MDBCol, MDBRow, MDBTooltip } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import "./Order.css";
import { FiPackage } from "react-icons/fi";
import { FaClipboardCheck, FaShippingFast } from "react-icons/fa";
import { BiRightArrowAlt } from "react-icons/bi";
import OrderProduct from "./OrderProduct";

const Order = ({ order }) => {
  const [status, setStatus] = useState({
    placed: "",
    packed: "inactive",
    shipped: "inactive",
    delivered: "inactive",
  });
  const [statusText, setStatusText] = useState({
    placedText: "Order placed",
    packedText: "Packed",
    shippedText: "Shipped",
    deliveredText: "Delivered",
  });

  const setStatusStyle = (stat) => {
    if (stat == "PACKED") {
      setStatus({
        placed: "",
        packed: "",
        shipped: "inactive",
        delivered: "inactive",
      });
    } else if (stat == "SHIPPED") {
      setStatus({
        placed: "",
        packed: "",
        shipped: "",
        delivered: "inactive",
      });
    } else if (stat == "DELIVERED") {
      setStatus({
        placed: "",
        packed: "",
        shipped: "",
        delivered: "",
      });
    } else if (stat == "CANCELLED") {
      setStatus({
        placed: "cancelled",
        packed: "cancelled",
        shipped: "cancelled",
        delivered: "cancelled",
      });
      setStatusText({
        placedText: "Cancelled",
        packedText: "Cancelled",
        shippedText: "Cancelled",
        deliveredText: "Cancelled",
      });
    }
  };

  useEffect(() => {
    setStatusStyle(order.status);
  }, []);
  return (
    <div className="p-4 shadow-5 my-3">
      <div className="text-start">
        <h6>Order ID : #{order.id}</h6>
      </div>
      <MDBRow>
        <MDBCol md="4">
          <MDBRow>
            {Object.keys(order.products).map((product) => {
              return (
                <MDBCol size="6">
                  <OrderProduct
                    key={product}
                    productId={product}
                    quantity={order.products[product]}
                  />
                </MDBCol>
              );
            })}
          </MDBRow>
        </MDBCol>
        <MDBCol md="6" className="text-start">
          <h6>Delivering to:</h6>
          {order.address.fullName}
          <br />
          {order.address.addressLine1}
          <br />
          {order.address.addressLine2}
          <br />
          {order.address.city}
          <br />
          {order.address.pincode}
        </MDBCol>
        <MDBCol md="2" className="p-5">
          <MDBBtn color="danger">Cancel</MDBBtn>
        </MDBCol>
      </MDBRow>
      <MDBRow className="my-3">
        <MDBCol>
          <div className="container d-flex justify-content-center align-items-center">
            <div className="progresses">
              <MDBTooltip tag="span" title={statusText.placedText}>
                <div className={"steps " + status.placed}>
                  <BiRightArrowAlt />
                </div>
              </MDBTooltip>

              <span className={"line " + status.packed}></span>
              <MDBTooltip tag="span" title={statusText.packedText}>
                <div className={"steps " + status.packed}>
                  <FiPackage />
                </div>
              </MDBTooltip>

              <span className={"line " + status.shipped}></span>
              <MDBTooltip tag="span" title={statusText.shippedText}>
                <div className={"steps " + status.shipped}>
                  <FaShippingFast />
                </div>
              </MDBTooltip>

              <span className={"line " + status.delivered}> </span>
              <MDBTooltip tag="span" title={statusText.deliveredText}>
                <div className={"steps " + status.delivered}>
                  <FaClipboardCheck />
                </div>
              </MDBTooltip>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Order;
