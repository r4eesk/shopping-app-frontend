import {
  MDBContainer,
  MDBInput,
  MDBRadio,
  MDBBtnGroup,
  MDBBtn,
} from "mdb-react-ui-kit";
import { AiFillHome } from "react-icons/ai";
import { FaSchool } from "react-icons/fa";
import { BsFillBuildingsFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import {
  addNewAddressApi,
  getAddressByIdApi,
} from "../services/AddressService";
import { useAuth } from "../security/AuthProvider";

const AddressForm = ({
  toggleShow,
  displayAddedMessage,
  displayUpdatedMessage,
  addressId,
  getAddressList,
  setAddressId,
}) => {
  const [fullName, setFullName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [type, setType] = useState("HOME");
  const [valid, setValid] = useState(true);

  const authContext = useAuth();
  const userId = authContext.user;
  const token = authContext.token;

  const onChangeFullName = (event) => {
    setFullName(event.target.value);
  };
  const onChangeAddress1 = (event) => {
    setAddress1(event.target.value);
  };
  const onChangeAddress2 = (event) => {
    setAddress2(event.target.value);
  };
  const onChangeCity = (event) => {
    setCity(event.target.value);
  };
  const onChangePin = (event) => {
    setPin(event.target.value);
  };
  const onChangeType = (value) => {
    setType(value);
  };

  const clearForm = () => {
    setFullName("");
    setAddress1("");
    setAddress2("");
    setCity("");
    setPin("");
    setType("HOME");
    setValid(true);
  };

  const getAddressById = (addressId) => {
    console.log(addressId + "test");
    if (addressId !== -1) {
      getAddressByIdApi(addressId, token)
        .then((response) => {
          const address = response.data;
          setFullName(address.fullName);
          setAddress1(address.addressLine1);
          setAddress2(address.addressLine2);
          setCity(address.city);
          setPin(address.pincode);
          setType(address.type);
        })
        .catch((error) => authContext.logout(true, true));
    } else {
      clearForm();
    }
  };

  const addNewAddress = () => {
    if (
      fullName.length > 5 &&
      address1.length > 5 &&
      city.length > 5 &&
      pin.length > 5 &&
      /^\d+$/.test(pin)
    ) {
      const address = {
        fullName: fullName,
        addressLine1: address1,
        addressLine2: address2,
        city: city,
        pincode: pin,
        type: type,
      };
      if (addressId !== -1) address.id = addressId;
      addNewAddressApi(userId, address, token)
        .then((response) => {
          clearForm();
          setAddressId(-1);
          toggleShow();
          getAddressList();
          if (addressId === -1) displayAddedMessage();
          else displayUpdatedMessage();
        })
        .catch((error) =>{ authContext.logout(true,true)});
    } else setValid(false);
  };

  useEffect(() => {
    getAddressById(addressId, token);
  }, [addressId]);

  return (
    <MDBContainer>
      {!valid && <div className="alert alert-warning">Enter Valid details</div>}
      <form>
        <MDBInput
          className="mb-4"
          label="Full Name"
          value={fullName}
          onChange={onChangeFullName}
          required
        />
        <MDBInput
          className="mb-4"
          label="Address Line 1"
          value={address1}
          onChange={onChangeAddress1}
        />
        <MDBInput
          className="mb-4"
          label="Address Line 2"
          value={address2}
          onChange={onChangeAddress2}
        />
        <MDBInput
          className="mb-4"
          label="City"
          value={city}
          onChange={onChangeCity}
        />
        <MDBInput
          className="mb-4"
          label="Pincode"
          value={pin}
          onChange={onChangePin}
        />
        <MDBBtnGroup>
          <MDBRadio
            btn
            btnColor="light"
            id="type1"
            name="type"
            value="HOME"
            wrapperTag="span"
            label={
              <span className="fs-6 d-flex align-items-center">
                <AiFillHome />
                &nbsp;HOME
              </span>
            }
            onClick={() => {
              onChangeType("HOME");
            }}
            checked={type === "HOME"}
          />
          <MDBRadio
            btn
            btnColor="light"
            id="type2"
            name="type"
            value="OFFICE"
            wrapperTag="span"
            label={
              <span className="fs-6 d-flex align-items-center">
                <FaSchool />
                &nbsp;OFFICE
              </span>
            }
            onClick={() => {
              onChangeType("OFFICE");
            }}
            checked={type === "OFFICE"}
          />
          <MDBRadio
            btn
            btnColor="light"
            id="type3"
            name="type"
            value="OTHER"
            wrapperTag="span"
            label={
              <span className="fs-6 d-flex align-items-center">
                <BsFillBuildingsFill />
                &nbsp;OTHER
              </span>
            }
            onClick={() => {
              onChangeType("OTHER");
            }}
            checked={type === "OTHER"}
          />
        </MDBBtnGroup>
      </form>
      <hr />
      <div className=" p-1">
        <MDBBtn color="danger" onClick={clearForm}>
          Clear
        </MDBBtn>
        <MDBBtn className="mx-3" color="secondary" onClick={toggleShow}>
          Close
        </MDBBtn>
        <MDBBtn onClick={addNewAddress}>
          {addressId === -1 && "Add"}
          {addressId !== -1 && "Update"}
        </MDBBtn>
      </div>
    </MDBContainer>
  );
};

export default AddressForm;
