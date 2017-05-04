import { URL } from './api'
import { http } from './base.js'

export const Request = {};
Request.Login = (options) => {
	return http.post(`${URL.USER_LOGIN}`, options);
}
Request.LoginOut = (options, headers) =>{
	return http.get(`${URL.USER_LOGINOUT}`, options);
}
Request.GetShopList = (options, headers) => {
	return http.get(`${URL.SHOP_LIST}`, options);
}
Request.GetUsers = (options, headers) =>{
	return http.get(`${URL.USER_LIST}`, options);
}
Request.GetProductList = (options, headers) =>{
	return http.get(`${URL.PRODUCT_LIST}`, options);
}
Request.PickProduct =  (options, headers) =>{
	return http.post(`${URL.POST_PRODUCT}`, options);
}
Request.GetDistanceList = (options, headers) =>{
	return http.get(`${URL.DISTANCE_LIST}`, options);
}
Request.DeliverProducts = (options, headers) =>{
	return http.get(`${URL.DELIVER_PRODUCTS}`, options);
}
Request.OnShelvesProducts = (options, headers) =>{
	return http.get(`${URL.ONSHELVES_PRODUCTS}`, options);
}
Request.CheckStoreProducts = (options, headers) =>{
	return http.get(`${URL.CHECKSTORE_PRODUCTS}`, options);
}
Request.OperationProducts = (options, headers) =>{
	return http.post(`${URL.OPERATE_PRODUCT}`, options);
}