import { apiService } from "./apiClient"



export const getAllProducts = (page,sort,size,stock) =>{
    return apiService.get(`products?pageNo=${page}&sortBy=${sort}&pageSize=${size}&stock=${stock}`)
}

export const getProductsByCategory = (category,page,sort,size,stock) => {
    return apiService.get(`products/${category}?pageNo=${page}&sortBy=${sort}&pageSize=${size}&stock=${stock}`)
}

export const getProductsById = (id) => {
    return apiService.get(`products/id/${id}`)
}