import { apiService } from "./apiClient"

export const loginUser = (username,password) => {
    return apiService.post('/authenticate',{
        username:username,
        password:password
    })
}