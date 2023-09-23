import { apiService } from "./apiClient"



export const getAllProducts = (page,sort,size) =>{
    return apiService.get(`products?pageNo=${page}&sortBy=${sort}&pageSize=${size}`)
}

export const getProductsByCategory = (category,page,sort,size) => {
    return apiService.get(`products/${category}?pageNo=${page}&sortBy=${sort}&pageSize=${size}`)
}

export const getProductsById = (id) => {
    return apiService.get(`products/id/${id}`)
}