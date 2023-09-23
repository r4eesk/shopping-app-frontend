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

const PlaceOrder = () => {
  const [addressList, setAddressList] = useState([]);
  const [address, setAddress] = useState({});

  const [addressModal, setAddressModal] = useState(false);
  const toggleShow = () => setAddressModal(!addressModal);

  const authContext = useAuth();
  const user = authContext.user;
  const token = authContext.token;

  const getAddressList = () => {
    getAddressListApi(user, token)
      .then((response) => {
        const data = response.data;
        setAddressList(data);
        setAddress(data[0]);
      })
      .catch((error) => {
        authContext.logout(true, true);
      });
  };

  const selectAddress = (adr) => {
    setAddress(adr);
    toggleShow();
  };

  useEffect(() => {
    getAddressList();
  }, [user, token]);
  return (
    <MDBContainer className="my-3">
      <h3>Place Order</h3>
      <MDBRow className="text-start">
        <MDBCol md="4">
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
        <MDBCol md="3" className="p-5">
          <div className="text-center">
            <MDBBtn
              onClick={() => {
                toggleShow();
              }}
            >
              Select Address
            </MDBBtn>
          </div>
        </MDBCol>
        <MDBCol md="5" >
          <CartTotal purchase={true} />
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
                    if (adres.id===address.id) selected="border-primary border-2"
                  return (
                      <div
                        className={"border rounded p-2 my-3 hover-shadow "+selected}
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
                <h5>Go to <span className="fst-italic fw-bolder">Profile -&gt; Address </span> to add new address</h5>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </MDBContainer>
  );
};

export default PlaceOrder;
