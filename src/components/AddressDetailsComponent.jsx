import {
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillHome } from "react-icons/ai";
import { BsFillBuildingsFill } from "react-icons/bs";
import { FaSchool } from "react-icons/fa";
import { useAuth } from "../security/AuthProvider";
import { deleteAddressByIdApi } from "../services/AddressService";
import AddressForm from "./AddressForm";

const AddressDetailsComponent = ({
  addresses,
  displayAddedMessage,
  displayUpdatedMessage,
  getAddressList,
}) => {
  const [addressModal, setAddressModal] = useState(false);
  const toggleShow = () => setAddressModal(!addressModal);

  const [addressID, setAddressId] = useState(-1);
  const [add, setAdd] = useState(false);

  const authContext = useAuth();

  const deleteAddressById = (id) => {
    deleteAddressByIdApi(id, authContext.token)
      .then((response) => {
        getAddressList();
      })
      .catch((error) => authContext.logout(true,true));
  };

  return (
    <div className="my-5 text-start">
      {addresses.map((address) => {
        return (
          <MDBRow key={address.id} className="shadow-5 rounded my-2 p-3 ps-5 ">
            <MDBCol size="12" md="8">
              <h6>{address.fullName}</h6>
              {address.addressLine1}
              <br />
              {address.addressLine2}
              <br />
              {address.city}
              <br />
              PIN : {address.pincode}
              <br />
              {address.type === "HOME" && <AiFillHome size="25" />}
              {address.type === "OFFICE" && <FaSchool size="25" />}
              {address.type === "OTHER" && <BsFillBuildingsFill size="25" />}
            </MDBCol>
            <MDBCol size="2" className="p-5">
              <MDBBtn
                color="danger"
                onClick={() => {
                  deleteAddressById(address.id);
                }}
              >
                <AiFillDelete size="20" />
              </MDBBtn>
            </MDBCol>
            <MDBCol size="2" className="p-5">
              <MDBBtn
                onClick={() => {
                  setAddressId(address.id);
                  setAdd(false);
                  toggleShow();
                }}
              >
                <AiFillEdit size="20" />
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        );
      })}
      <div className="my-5 text-center">
        <MDBBtn
          onClick={() => {
            setAddressId(-1);
            setAdd(true);
            toggleShow();
          }}
        >
          Add new Address
        </MDBBtn>
      </div>
      <MDBModal
        show={addressModal}
        setShow={setAddressModal}
        tabIndex="-1"
        className="text-center"
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                {!add && "Update Address"}
                {add && "Add new Address"}
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <AddressForm
                toggleShow={toggleShow}
                addressId={addressID}
                getAddressList={getAddressList}
                setAddressId={setAddressId}
                displayAddedMessage={displayAddedMessage}
                displayUpdatedMessage={displayUpdatedMessage}
              />
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default AddressDetailsComponent;
