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
Request.PickProduct =  (options) =>{
	return http.post(`${URL.POST_PRODUCT}`, options);
}
Request.GetDistanceList = (options) =>{
	return http.get(`${URL.DISTANCE_LIST}`, options);
}
Request.DeliverProducts = (options) =>{
	return http.get(`${URL.DELIVER_PRODUCTS}`, options);
}
Request.OnShelvesProducts = (options) =>{
	return http.get(`${URL.ONSHELVES_PRODUCTS}`, options);
}
Request.CheckStoreProducts = (options) =>{
	return http.get(`${URL.CHECKSTORE_PRODUCTS}`, options);
}