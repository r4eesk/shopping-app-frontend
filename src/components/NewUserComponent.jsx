import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBContainer,
} from "mdb-react-ui-kit";
import { useState } from "react";
import "./Rotate.css";

import { IoIosCheckmarkCircleOutline, IoMdClose } from "react-icons/io";
import { RiRefreshLine } from "react-icons/ri";
import {
  checkUsernameAvailabilityApi,
  registerUserApi,
} from "../services/UserService";
import { useNavigate } from "react-router";

const NewUserComponent = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState("");
  const [rotate, setRotate] = useState("");
  const [empty, setEmpty] = useState(false);
  const [userExistsError, setUserExistsError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const onChangeFirstname = (event) => {
    setFirstname(event.target.value);
  };

  const onChangeLastname = (event) => {
    setLastname(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
    setUsernameAvailable("");
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const checkUsernameAvailabilty = (username) => {
    if (username !== "") {
      setRotate("rotate");
      checkUsernameAvailabilityApi(username)
        .then((response) => {
          setUsernameAvailable(response.data);
          setRotate("");
          setUserExistsError(false);
        })
        .catch((error) => {
          setUsernameAvailable("");
        });
    }
  };

  const navigate = useNavigate();

  const registerUser = (event) => {
    event.preventDefault();
    if (
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setEmailError(true);
      console.log("email")
      return
    }
    else{
      setEmailError(false);
    }
    if (
      username !== "" &&
      password !== "" &&
      email !== "" &&
      firstname !== "" &&
      lastname !== ""
    ) {
      setEmpty(false);
      const user = {
        userId: username,
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
        role: "USER",
      };
      registerUserApi(user)
        .then((response) => navigate("/login"))
        .catch((error) => {
          if (error.code === "ERR_BAD_REQUEST") setUserExistsError(true);
        });
    } else {
      setEmpty(true);
      setUserExistsError(false);
    }
  };
  return (
    <MDBContainer className="my-3">
      <h3 className="mb-3">Register</h3>
      <MDBRow>
        <MDBCol md="3" lg="4" sm="2"></MDBCol>
        <MDBCol md="6" lg="4" sm="8">
          {empty && (
            <div className="alert alert-warning">
              Please fill all the fields
            </div>
          )}
          {userExistsError && (
            <div className="alert alert-warning">
              Username/Email already exists!!!
            </div>
          )}
          {emailError && (
            <div className="alert alert-warning">
              Enter a valid email
            </div>
          )}
          <form>
            <MDBRow className="mb-4">
              <MDBCol>
                <MDBInput
                  label="First name"
                  value={firstname}
                  onChange={onChangeFirstname}
                />
              </MDBCol>
              <MDBCol>
                <MDBInput
                  label="Last name"
                  value={lastname}
                  onChange={onChangeLastname}
                />
              </MDBCol>
            </MDBRow>
            <MDBInput
              className="mb-4"
              type="email"
              label="Email address"
              value={email}
              onChange={onChangeEmail}
            />
            <MDBInput
              label="Username"
              value={username}
              onChange={onChangeUsername}
            />
            {usernameAvailable === "" && (
              <p className="mb-3 text-start">
                <span
                  className={"fs-4 check" + rotate}
                  onClick={() => checkUsernameAvailabilty(username)}
                >
                  <RiRefreshLine />
                </span>{" "}
                Check Username availability
              </p>
            )}

            {usernameAvailable === true && (
              <p className="mb-3 text-start ">
                <span className="text-success fs-4">
                  <IoIosCheckmarkCircleOutline />
                </span>{" "}
                Username is Available
              </p>
            )}

            {usernameAvailable === false && (
              <p className="mb-3 text-start ">
                <span className="text-danger fs-4">
                  <IoMdClose />
                </span>{" "}
                Username already taken!!
              </p>
            )}

            <MDBInput
              className="mb-4"
              type="password"
              label="Password"
              value={password}
              onChange={onChangePassword}
            />

            {/* <MDBCheckbox
              wrapperClass="d-flex justify-content-center mb-4"
              label="Subscribe to our newsletter"
              defaultChecked
            /> */}

            <MDBBtn className="mb-4" block onClick={registerUser}>
              Sign Up
            </MDBBtn>

            <div className="text-center">
              <p>or sign up with:</p>

              <MDBBtn floating color="secondary" className="mx-1">
                <MDBIcon fab icon="facebook-f" />
              </MDBBtn>

              <MDBBtn floating color="secondary" className="mx-1">
                <MDBIcon fab icon="google" />
              </MDBBtn>

              <MDBBtn floating color="secondary" className="mx-1">
                <MDBIcon fab icon="twitter" />
              </MDBBtn>

              <MDBBtn floating color="secondary" className="mx-1">
                <MDBIcon fab icon="github" />
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default NewUserComponent;
