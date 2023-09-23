import { apiService } from "./apiClient";

export const isWishlistedApi = (userId, productId, token) => {
  return apiService.get(`/wishlist/isWishlisted/${userId}/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addToWishlistApi = (userId, productId, token) => {
  return apiService.post(`/wishlist/${userId}/${productId}`, {},{
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
};

export const removeFromWishlistApi = (userId, productId, token) => {
  return apiService.put(`/wishlist/remove/${userId}/${productId}`,{}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getWishlistApi = (userId, token) => {
  return apiService.get(`/wishlist/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
