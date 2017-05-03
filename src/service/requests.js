import { URL } from './api'
import { http } from './base.js'

export const Request = {};
Request.Login = (options) => {
	return http.post(`${URL.USER_LOGIN}`, options);
}
Request.LoginOut = (options, headers) =>{
	return http.get(`${URL.USER_LOGINOUT}`, options, {'token': JSON.stringify(headers)});
}
Request.GetShopList = (options, headers) => {
	return http.get(`${URL.SHOP_LIST}`, options, {'token': JSON.stringify(headers)});
}
Request.GetUsers = (options, headers) =>{
	return http.get(`${URL.USER_LIST}`, options, {'token': JSON.stringify(headers)});
}
Request.GetProductList = (options, headers) =>{
	return http.get(`${URL.PRODUCT_LIST}`, options, {'token': JSON.stringify(headers)});
}
Request.PickProduct =  (options, headers) =>{
	return http.post(`${URL.POST_PRODUCT}`, options, {'token': JSON.stringify(headers)});
}
Request.GetDistanceList = (options, headers) =>{
	return http.get(`${URL.DISTANCE_LIST}`, options, {'token': JSON.stringify(headers)});
}
Request.DeliverProducts = (options, headers) =>{
	return http.get(`${URL.DELIVER_PRODUCTS}`, options, {'token': JSON.stringify(headers)});
}
Request.OnShelvesProducts = (options, headers) =>{
	return http.get(`${URL.ONSHELVES_PRODUCTS}`, options, {'token': JSON.stringify(headers)});
}
Request.CheckStoreProducts = (options, headers) =>{
	return http.get(`${URL.CHECKSTORE_PRODUCTS}`, options, {'token': JSON.stringify(headers)});
}
Request.OperationProducts = (options, headers) =>{
	return http.post(`${URL.POST_PRODUCT}`, options, {'token': JSON.stringify(headers)});
}