import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useAuth } from "../security/AuthProvider";
import { getAddressListApi } from "../services/AddressService";
import CartTotal from "./CartTotal";
import { Link, useNavigate } from "react-router-dom";
import { purchaseApi } from "../services/OrderService";

const PlaceOrder = () => {
  const [addressList, setAddressList] = useState([]);
  const [address, setAddress] = useState({});
  const [outOfStockMessage, setOutOfStockMessage] = useState(false);
  const [emptyAddress, setEmptyAddress] = useState(true);

  const [addressModal, setAddressModal] = useState(false);
  const toggleShow = () => setAddressModal(!addressModal);

  const authContext = useAuth();
  const user = authContext.user;
  const token = authContext.token;

  const getAddressList = () => {
    getAddressListApi(user, token)
      .then((response) => {
        const data = response.data;
        if (data.length === 0) setEmptyAddress(true);
        else {
          setEmptyAddress(false);
          setAddressList(data);
          setAddress(data[0]);
        }

      })
      .catch((error) => {
        authContext.logout(true, true);
      });
  };

  const selectAddress = (adr) => {
    setAddress(adr);
    toggleShow();
  };

  const navigate = useNavigate()
  const purchase = () => {
    purchaseApi(user, address.id, token)
      .then(response => navigate(`/orders/${user}`))
      .catch(error => {
        if (error.response.data.message === "Product is not available") {
          setOutOfStockMessage(true);
          setTimeout(() => setOutOfStockMessage(true), 7000)
        }
        else {
          authContext.logout(true, true)
        }
      })
  }

  useEffect(() => {
    getAddressList();
  }, [user, token]);
  return (
    <MDBContainer className="my-3">
      <h3>Place Order</h3>
      <div className="position-absolute  top-0 start-50 translate-middle-x sticky-top">
        {outOfStockMessage && (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            One or more product is Out of Stock!!! Please remove it from the cart and continue purchasing.
          </div>
        )}
      </div>
      <MDBRow className="text-start">
        <MDBCol md="7">
        {emptyAddress && <MDBCol md="6">
          <h4>Address List is Empty!!!</h4>
          <Link to={`/address/${user}`}>
            <MDBBtn className="mt-1">Add new address</MDBBtn>
          </Link>
        </MDBCol>}
        {!emptyAddress && <MDBRow><MDBCol md="7">
          <h6>Deliver To : </h6>
          {address.fullName}
          <br />
          {address.addressLine1}
          <br />
          {address.addressLine2}
          <br />
          {address.city}
          <br />
          {address.pincode}
          <br />


        </MDBCol>
          <MDBCol md="5" className="p-5">
            <div className="text-center d-grid">
              <MDBBtn
                onClick={() => {
                  toggleShow();
                }}
              >
                Select Address
              </MDBBtn>
              
              <Link to={`/address/${user}`} className="d-grid">
                <MDBBtn className="mt-2">Add new address</MDBBtn>
              </Link>
            </div>
          </MDBCol>
        </MDBRow>}
        </MDBCol>

        <MDBCol md="5" >
          <CartTotal purchase={true} purchaseApi={purchase} />
        </MDBCol>

      </MDBRow>
      <MDBRow>

      </MDBRow>

      <MDBModal
        show={addressModal}
        setShow={setAddressModal}
        tabIndex="-1"
        className="text-center"
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Select Address</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div>
                {addressList.map((adres) => {
                  var selected = "";
                  if (adres.id === address.id) selected = "border-primary border-2"
                  return (
                    <div
                      className={"border rounded p-2 my-3 hover-shadow " + selected}
                      onClick={() => selectAddress(adres)}
                    >
                      {adres.fullName}
                      <br />
                      {adres.addressLine1}
                      <br />
                      {adres.addressLine2}
                      <br />
                      {adres.city}
                      <br />
                      {adres.pincode}
                      <br />
                    </div>
                  );
                })}

              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </MDBContainer>
  );
};

export default PlaceOrder;
