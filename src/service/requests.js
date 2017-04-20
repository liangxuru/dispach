import { URL } from './api'
import { http } from './base.js'

export const Request = {};
Request.GetShopList = (options) => {
	return http.get(`${URL.SHOP_LIST}`, options);
}
Request.GetUsers = (options) =>{
	return http.get(`${URL.USER_LIST}`, options);
}
Request.GetProductList = (options) =>{
	return http.get(`${URL.PRODUCT_LIST}`, options);
}
Request.Offshelves = (options) =>{
	return http.post(`${URL.OFF_SHELVES}`, options);
}
Request.Onproduct = (options) =>{
	return http.post(`${URL.ON_PRODUCT}`, options);
}
