import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownToggle,
  MDBDropdownMenu,
} from "mdb-react-ui-kit";

import { useState } from "react";
import { GrMenu } from "react-icons/gr";
import { FaUserAlt } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../security/AuthProvider";

const NavbarPage = () => {
  const [showBasic, setShowBasic] = useState(false);

  const authContext = useAuth();

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand tag={Link} to="/products">
          <img src="/hbox-logo.png" height="36" />
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <GrMenu />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBNavbarLink
                active
                aria-current="page"
                tag={Link}
                to="/products"
              >
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink tag={Link} to="/products">
                Link
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
          {authContext.authenticated && (
            <MDBDropdown>
              <MDBDropdownToggle
                nav
                caret
                color="light"
                rippleColor="dark"
                className="fs-6"
              >
                <FaUserAlt />
              </MDBDropdownToggle>

              <MDBDropdownMenu className="dropdown-default text-center">
                <NavLink to={`/profile/${authContext.user}`}>
                  <MDBDropdownItem href="#!">
                    <div className="d-grid gap-2">
                      <MDBBtn color="light" rippleColor="dark">
                        Profile
                      </MDBBtn>
                    </div>
                  </MDBDropdownItem>
                </NavLink>
                <NavLink to={`/orders/${authContext.user}`}>
                  <MDBDropdownItem href="#!">
                    <div className="d-grid gap-2">
                      <MDBBtn color="light" rippleColor="dark">
                        My Orders
                      </MDBBtn>
                    </div>
                  </MDBDropdownItem>
                </NavLink>
                <NavLink to={`/wishlist/${authContext.user}`}>
                  <MDBDropdownItem href="#!">
                    <div className="d-grid gap-2">
                      <MDBBtn color="light" rippleColor="dark">
                        My Wishlist
                      </MDBBtn>
                    </div>
                  </MDBDropdownItem>
                </NavLink>
                <NavLink to={`/cart/${authContext.user}`}>
                  <MDBDropdownItem href="#!">
                    <div className="d-grid gap-2">
                      <MDBBtn color="light" rippleColor="dark">
                        My cart
                      </MDBBtn>
                    </div>
                  </MDBDropdownItem>
                </NavLink>
                <MDBDropdownItem
                  onClick={() => authContext.logout(false, true)}
                >
                  <div className="d-grid gap-2">
                    <MDBBtn color="light" rippleColor="dark">
                      Logout
                    </MDBBtn>
                  </div>
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          )}

          {!authContext.authenticated && (
            <NavLink to="/login">
              <MDBBtn outline className="mx-2" color="dark">
                Login
              </MDBBtn>
            </NavLink>
          )}
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default NavbarPage;
