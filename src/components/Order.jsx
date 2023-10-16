
import { useEffect, useState } from "react";
import "./Order.css";
import { FiPackage } from "react-icons/fi";
import { FaClipboardCheck, FaShippingFast } from "react-icons/fa";
import { BiRightArrowAlt } from "react-icons/bi";
import OrderProduct from "./OrderProduct";
import { cancelOrderApi } from "../services/OrderService";
import { useAuth } from "../security/AuthProvider";
import {
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBTooltip,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

const Order = ({ order }) => {

  const [cancelConfirmWindow, setCancelConfirmWindow] = useState(false);

  const toggleShow = () => setCancelConfirmWindow(current => !current);

  const authContext = useAuth()
  //const user = authContext.user
  const token = authContext.token

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

  const cancelOrder = () => {
    cancelOrderApi(order.id, token)
      .then(response => {
        console.log(response)
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
        })
      })
      .catch(error => authContext.logout(true,true))
  }

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
          {status.placed !== "cancelled" && <MDBBtn color="danger" onClick={toggleShow}>Cancel</MDBBtn>}
          {status.placed === "cancelled" && <MDBBtn color="danger" disabled>Cancelled</MDBBtn>}

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

      <MDBModal tabIndex='-1' show={cancelConfirmWindow} setShow={setCancelConfirmWindow}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <p>
                Do you want to cancel this order?
              </p>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='primary' onClick={toggleShow}>
                No
              </MDBBtn>
              <MDBBtn color="danger" onClick={() => {
                cancelOrder();
                toggleShow();
              }}>Yes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

    </div>
  );
};

export default Order;
