import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import "./LoginComponent.css";
import { useAuth } from "../security/AuthProvider";
import LoggedOutAlert from "./LoggedoutAlert";
import { Link } from "react-router-dom";

const LoginComponent = () => {
  const [username, setUsername] = useState("raeesk");
  const [password, setPassword] = useState("raeesk");
  const [emtyFields,setEmptyFields] = useState(false)
  const onChangeUsername = (event) => setUsername(event.target.value);
  const onChangePassword = (event) => setPassword(event.target.value);

  const authContext = useAuth();

  const login = (username,password) => {
    if(username!==''&&password!==''){
      authContext.login(username,password)
      setEmptyFields(false)

    }
    else{
      setEmptyFields(true)
    }
    
  }

  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Login"
          />
        </MDBCol>

        <MDBCol col="4" md="6" lg="4" className="offset-lg-1">
          {!authContext.valid && (
            <div className="alert alert-danger" role="alert">
              Invalid credentials
            </div>
          )}
          {emtyFields && (
            <div className="alert alert-warning" role="alert">
              Please enter Username/Email and password
            </div>
          )}
          <MDBInput
            wrapperClass="mb-4"
            label="Email address/Username"
            type="email"
            size="lg"
            onChange={onChangeUsername}
            value={username}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            type="password"
            size="lg"
            onChange={onChangePassword}
            value={password}
          />

          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox
              name="flexCheck"
              value=""
              id="flexCheckDefault"
              label="Remember me"
            />
            <a href="!#">Forgot password?</a>
          </div>

          <MDBBtn
            className="mb-4 w-100"
            size="lg"
            onClick={() => login(username, password)}
          >
            Sign in
          </MDBBtn>

          <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#393f81" }}>
              Register here
            </Link>
          </p>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
          </div>

          <MDBBtn
            className="mb-4 w-100"
            size="lg"
            style={{ backgroundColor: "#3b5998" }}
          >
            <MDBIcon className="mx-2" />
            <span className="p-2">
              <FaFacebookF />
            </span>{" "}
            Continue with Facebook
          </MDBBtn>

          <MDBBtn
            className="mb-4 w-100"
            size="lg"
            style={{ backgroundColor: "#DB4437" }}
          >
            <MDBIcon className="mx-2" />
            <span className="p-2">
              <FaGoogle />
            </span>{" "}
            Continue with Google
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LoginComponent;
