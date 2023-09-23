import { apiService } from "./apiClient";

export const checkUsernameAvailabilityApi = (username) => {
  return apiService.get(`/users/checkUsername/${username}`);
};

export const registerUserApi = (user) => {
  return apiService.post(`/users/register`, user);
};

export const getUserDetailsApi = (username, token) => {
  return apiService.get(`/users/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
