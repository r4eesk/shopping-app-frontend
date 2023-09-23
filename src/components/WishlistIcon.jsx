import { MDBTooltip } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../security/AuthProvider";
import {
  addToWishlistApi,
  isWishlistedApi,
  removeFromWishlistApi,
} from "../services/WishListService";

const WishlistIcon = ({ user, product, authenticated }) => {
  const [wishlisted, setWislisted] = useState(false);

  const authContext = useAuth();

  const token = authContext.token;

  const logout = authContext.logout;

  const isWishListed = (userId, productId, token) => {
    if (authenticated) {
      isWishlistedApi(userId, productId, token)
        .then((response) => {
          if (response.data.isWishlisted === true) {
            setWislisted(true);
          } else {
            setWislisted(false);
          }
        })
        .catch((error) => {
          logout(true,true);
        });
    }
  };

  const addToWishlist = (userId, productId, token) => {
    if (authenticated) {
      addToWishlistApi(userId, productId, token)
        .then((response) => {
          setWislisted(true);
        })
        .catch((error) => {
          console.log(error);
          logout(true,true);
        });
    }
  };

  const removeFromWishlist = (userId, productId, token) => {
    if (authenticated) {
      removeFromWishlistApi(userId, productId, token)
        .then((response) => {
          setWislisted(false);
        })
        .catch((error) => logout(true,true));
    }
  };

  useEffect(() => isWishListed(user, product, token), [user, product]);
  return (
    <div>
      {wishlisted && authenticated && (
        <div
          className="position-absolute top-0 end-0 fs-5 p-0 text-danger"
          onClick={() => removeFromWishlist(user, product, token)}
        >
          <MDBTooltip
            tag="span"
            wrapperProps={{ href: "#" }}
            title="Add to Wishlist"
          >
            <span classname="">
              <FaHeart />
            </span>
          </MDBTooltip>
        </div>
      )}

      {!wishlisted && authenticated && (
        <div
          className="position-absolute top-0 end-0 fs-5 p-0 text-secondary"
          onClick={() => addToWishlist(user, product, token)}
        >
          <MDBTooltip
            tag="span"
            wrapperProps={{ href: "#" }}
            title="Add to Wishlist"
          >
            <span classname="">
              <FaHeart />
            </span>
          </MDBTooltip>
        </div>
      )}
    </div>
  );
};
export default WishlistIcon;
