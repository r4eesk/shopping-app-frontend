import {
  MDBContainer,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useAuth } from "../security/AuthProvider";
import { getAddressListApi } from "../services/AddressService";
import AddressDetailsComponent from "./AddressDetailsComponent";

const AddressComponent = () => {
 

  const [addressList, setAddressList] = useState([]);

  const [added, setAdded] = useState(false);
  const displayAddedMessage = () => {
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 3000);
  };

  const [updated, setUpdated] = useState(false);
  const displayUpdatedMessage = () => {
    setUpdated(true);

    setTimeout(() => {
      setUpdated(false);
    }, 3000);
  };

  const authContext = useAuth();
  const user = authContext.user;
  const token = authContext.token;

  const getAddressList = () => {
    getAddressListApi(user, token)
      .then((response) => {
        const data = response.data;
        setAddressList(data);
      })
      .catch((error) => {
        authContext.logout(true, true);
      });
  };

  useEffect(() => {
    getAddressList();
  }, [user, token]);

  return (
    <MDBContainer className="my-3">
        <div className="sticky-top">
      {added && (
        <div className="position-absolute top-0 start-50 translate-middle-x sticky-top">
          <div className="alert alert-success">New address added!!!</div>
        </div>
      )}
      {updated && (
        <div className="position-absolute  top-0 start-50 translate-middle-x  sticky-top">
          <div className="alert alert-success">Updated!!!</div>
        </div>
      )}
      </div>
      <h3>Saved Addresses</h3>
      {addressList.length===0&&'No Saved addresses!!!'}
      <AddressDetailsComponent
        addresses={addressList}
        displayUpdatedMessage={displayUpdatedMessage}
        displayAddedMessage={displayAddedMessage}
        getAddressList={getAddressList}
      />
      
      
      
      
    </MDBContainer>
  );
};

export default AddressComponent;
