import { apiService } from "./apiClient";



export const getOrdersListApi = (userId,token) => {
  return apiService.get(`/order/get/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
