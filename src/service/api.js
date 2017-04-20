/**
 * 引用环境与请求url配置
 */

//是否为发布环境
const release = process.env.NODE_ENV === 'production';

const WEAPON_VERSION = '1.0.2';

// http://localhost:18130/api/Ground/GetProductsBySportType?SportType=6&spid=10742
// http://news-at.zhihu.com/api/4/news/latest
var root = {
    host: release ? 'http://test.mrich.com/api' : 'http://test.weixin.com/api'
};

//请求url
export const URL = {};

//小铺列表
URL.SHOP_LIST = `${root.host}/Shop/GetShopList`;
//用户列表
URL.USER_LIST = `${root.host}/Shop/GetUserList`;
//商品列表
URL.PRODUCT_LIST = `${root.host}/Shop/GetProductList`;
//商品下架
URL.OFF_SHELVES = `${root.host}/Shop/ProductOffShelves`;
//上货
URL.ON_PRODUCT = `${root.host}/Shop/OnProduct`;