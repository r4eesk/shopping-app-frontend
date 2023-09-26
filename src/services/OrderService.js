import { apiService } from "./apiClient";



export const getOrdersListApi = (userId,token) => {
  return apiService.get(`/order/get/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const purchaseApi = (userId,addressId,token) => {
  return apiService.post(`/order/new/${userId}?addressId=${addressId}`,{}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
