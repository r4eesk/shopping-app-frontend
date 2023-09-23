import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCol,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthProvider";
import { getWishlistApi } from "../services/WishListService";
import WishlistIcon from "./WishlistIcon";

const WishlistComponent = () => {
  const authContext = useAuth();
  const authenticated = authContext.authenticated;
  const token = authContext.token;
  const logout = authContext.logout;

  const { userId } = useParams();

  const [products, setProducts] = useState([]);

  const refreshWishlist = (userId, token) => {
    getWishlistApi(userId, token)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => logout(true, true));
  };

  useEffect(() => {
    refreshWishlist(userId, token);
  }, [userId]);
  return (
    <MDBContainer>
      <h3 className="my-4">My Wishlist</h3>
      <MDBRow>
        {products.map((product) => {
          product = {
            ...product,
            img:
              "https://bunnynet-avatars.b-cdn.net/.ai/img/dalle-256/avatar/email-" +
              product.id +
              "/rabbit.jpg?width=128",
          };
          return (
            <MDBCol size="6" lg="3" md="4" className="my-4 position-relative">
              <MDBCard className="p-3">
                <WishlistIcon
                  user={userId}
                  product={product.id}
                  authenticated={authenticated}
                />
                <Link to={`/products/${product.id}`}>
                  <MDBCardImage
                    src={product.img}
                    position="top"
                    alt="..."
                  />
                  <MDBCardBody>
                    <MDBCardTitle className="text-dark">
                      {product.title}
                    </MDBCardTitle>
                    <MDBCardText className="text-dark">
                      ₹{product.price}
                    </MDBCardText>
                  </MDBCardBody>
                </Link>
              </MDBCard>
            </MDBCol>
          );
        })}
      </MDBRow>
    </MDBContainer>
  );
};

export default WishlistComponent;
