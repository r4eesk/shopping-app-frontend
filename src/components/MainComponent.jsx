import NavbarPage from "./NavbarPage";
import ListProductsComponent from "./ListProductsComponent";
import FooterComponent from "./FooterComponent";
import ProductDetailsComponent from "./ProductDetailsComponent";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MDBContainer } from "mdb-react-ui-kit";
import LoginComponent from "./LoginComponent";
import ErrorComponent from "./ErrorComponent";
import  { useAuth } from "../security/AuthProvider";
import WishlistComponent from "./WishlistComponent";
import LoggedOutAlert from "./LoggedoutAlert";
import CartComponent from "./CartComponent";
import NewUserComponent from "./NewUserComponent";
import ProfileComponent from "./ProfileComponent";
import AddressComponent from "./AddressComponent";
import OrderComponent from "./OrderComponent";
import PlaceOrder from "./PlaceOrder";

const AuthenticatedRoute = ({ children }) => {
  const authContext = useAuth();
  if (authContext.authenticated) return children;
  return <Navigate to="/login" />;
};

const LoggedInRoute = ({ children }) => {
  const authContext = useAuth();
  if (!authContext.authenticated) return children;
  return <Navigate to="/products" />;
};

const MainComponent = () => {
  const authContext = useAuth();
  return (
    <div className="d-flex flex-column min-vh-100 ">
      <BrowserRouter>
        <NavbarPage />
        <LoggedOutAlert
          warning={authContext.logoutWarning}
          logout={authContext.loggedout}
        />

        <Routes>
          <Route
            path="/"
            element={
              <LoggedInRoute>
                <LoginComponent />
              </LoggedInRoute>
            }
          />
          <Route
            path="/login"
            element={
              <LoggedInRoute>
                <LoginComponent />
              </LoggedInRoute>
            }
          />
          <Route
            path="/register"
            element={
              <LoggedInRoute>
                <NewUserComponent />
              </LoggedInRoute>
            }
          />
          <Route
            path="/orders/:userId"
            element={
              <AuthenticatedRoute>
                <OrderComponent />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/wishlist/:userId"
            element={
              <AuthenticatedRoute>
                <WishlistComponent />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/cart/:userId"
            element={
              <AuthenticatedRoute>
                <CartComponent />
              </AuthenticatedRoute>
            }
          />
           <Route
            path="/cart/order/:userId"
            element={
              <AuthenticatedRoute>
                <PlaceOrder />
              </AuthenticatedRoute>
            }
          />

          <Route
            path="/profile/:userId"
            element={
              <AuthenticatedRoute>
                <ProfileComponent />
              </AuthenticatedRoute>
            }
          />

          <Route
            path="/address/:userId"
            element={
              <AuthenticatedRoute>
                <AddressComponent />
              </AuthenticatedRoute>
            }
          />
          <Route path="/products" element={<ListProductsComponent />} />
          <Route
            path="/products/:productId"
            element={<ProductDetailsComponent />}
          />
          <Route path="/error" element={<ErrorComponent />} />
          <Route path="*" element={<ErrorComponent />} />
        </Routes>

        <FooterComponent />
      </BrowserRouter>
    </div>
  );
};

export default MainComponent;
