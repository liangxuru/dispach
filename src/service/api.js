/**
 * 引用环境与请求url配置
 */

//是否为发布环境
const release = process.env.NODE_ENV === 'production';
const isofficial = location.href.indexOf('wx.mrich.com') > -1;//是否为正式环境

const WEAPON_VERSION = '1.0.2';

// http://localhost:18130/api/Ground/GetProductsBySportType?SportType=6&spid=10742
// http://news-at.zhihu.com/api/4/news/latest
var root = {
    host: release && isofficial ? 'http://wx.mrich.com:18888/api' : 'http://123.57.21.63:18888/api'
};

//请求url
export const URL = {};
URL.USER_LOGIN = `${root.host}/user/loginon`;
//登出
URL.USER_LOGINOUT = `${root.host}/user/LoginOut`;
//小铺列表
URL.SHOP_LIST = `${root.host}/PickUp/Index`;
//用户列表
URL.USER_LIST = `${root.host}/Deliver/GetDeliverList`;
//商品列表
URL.PRODUCT_LIST = `${root.host}/PickUp/PickProducts`;
//捡货
URL.POST_PRODUCT = `${root.host}/PickUp/PickProducts`;
//商品下架
URL.OFF_SHELVES = `${root.host}/Shop/ProductOffShelves`;
//上货
URL.ON_PRODUCT = `${root.host}/Shop/OnProduct`;
//距离列表
URL.DISTANCE_LIST = `${root.host}/Deliver/index`;
//下架列表
URL.DELIVER_PRODUCTS = `${root.host}/Deliver/DeliverProducts`;
//上架列表
URL.ONSHELVES_PRODUCTS = `${root.host}/Deliver/OnShelvesProducts`;
//盘点列表
URL.CHECKSTORE_PRODUCTS = `${root.host}/Deliver/CheckStoreProducts`;
//[下架，盘点，上货]操作 (0：上货 1：盘点 2：下架某类商品一定数量（还在售）3：全部下架某类商品(禁止售卖))
URL.OPERATE_PRODUCT = `${root.host}/Deliver/OperationProducts`;