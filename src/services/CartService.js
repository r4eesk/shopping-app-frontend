import { apiService } from "./apiClient";

export const getCartApi = (userId, token) => {
  return apiService.get(`/cart/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addToCartApi = (userId, productId, quantity, token) => {
  return apiService.post(
    `/cart/add/${userId}/${productId}?quantity=${quantity}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeFromCartApi = (userId, productId, token) => {
  return apiService.put(
    `/cart/remove/${userId}/${productId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateQuantityApi = (userId, productId, quantity, token) => {
  return apiService.put(
    `/cart/update/${userId}/${productId}?quantity=${quantity}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const isInCartApi = (userId, productId, token) => {
  return apiService.get(`/cart/isincart/${userId}/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTotalApi = (userId, token) => {
  return apiService.get(`/cart/total/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
