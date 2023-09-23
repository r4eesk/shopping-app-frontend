import { apiService } from "./apiClient";

export const addNewAddressApi = (userId, address, token) => {
  return apiService.post(`/address/add/${userId}`, address, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAddressListApi = (userId, token) => {
  return apiService.get(`/address/get/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAddressByIdApi = (addressId, token) => {
  return apiService.get(`/address/getbyid/${addressId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteAddressByIdApi = (addressId, token) => {
  return apiService.delete(`/address/delete/${addressId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
