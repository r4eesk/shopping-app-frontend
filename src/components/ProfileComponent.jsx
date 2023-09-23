import { MDBBtn } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthProvider";
import { getUserDetailsApi } from "../services/UserService";

const ProfileComponent = () => {
  const [userDetails, setUserDetails] = useState({});

  const authContext = useAuth();
  const user = authContext.user;
  const token = authContext.token;

  const getUserDetails = (userId) => {
    getUserDetailsApi(userId, token)
      .then((response) => setUserDetails(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserDetails(user);
  }, [user]);

  return (
    <div className="my-3">
      <h3>My Profile</h3>
      <div className="my-5">
        <p>Name : {userDetails.firstName + " " + userDetails.lastName} </p>
        <p>UserId : {userDetails.userId} </p>
        <p>Email : {userDetails.email} </p>
        
      </div>
      <Link to={`/address/${user}`}>
        <MDBBtn>Address</MDBBtn>
      </Link>
    </div>
  );
};

export default ProfileComponent;
