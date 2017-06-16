import Vue from 'vue'
import VueResource from 'vue-resource'
import { default as message } from 'lib/message'
import router from '../router/index'
import { WebStorageCache } from 'lib/StorageCache'

//启用http请求插件
Vue.use(VueResource);
Vue.http.options.xhr = { withCredentials: true };
Vue.http.interceptors.push((request, next) => {
    request.credentials=true;
    // next();
    let timeout;
    // 如果某个请求设置了timeout,那么超过该时间，会终端该（abort）请求,并执行请求设置的钩子函数onTimeout方法，不会执行then方法。
    if (request.timeout) {
        timeout = setTimeout(() => {
            if(request.onTimeout) {
                request.onTimeout(request);
                request.abort()
            }  
        }, request.timeout);
    }
    next((response) => {
       clearTimeout(timeout);
　　　　return response;
    })
});
//请求拦截
const TIMEOUT = 50000;
var request = (options) => {
    return Promise.all([Vue.http({
        headers: options.headers,
        url: options.url,
        method: options.method,
        body: options.body,
        params: options.params,
        timeout: TIMEOUT,
        onTimeout: (request) => {
           message.error("请求超时");
        }
    })]).then(response => {
        var result = response[0].body;
        if(result.StatusCode == 200){
        	return result.Value;
        }else if(result.StatusCode == 400){
            message.error(result.ErrorMessage);
        }else if(result.StatusCode == 302){
            message.error(result.ErrorMessage);
            router.replace('/login');
            $("#app .cover").hide();
        }
    }).catch((response)=>{
        message.error('data load error~~');
    });
}

//http请求方式
export const http = {};
['get', 'post', 'put', 'delete'].forEach(method => {
    http[method] = (url, params, headers = {}) => {
        headers["token"] = JSON.stringify(WebStorageCache.get("token"));
        if (method === 'get') {
            return request({ url, params, method: method, headers: headers });
        }
        return request({ url, body: params, method: method, headers: headers });
    };
});


new Vue();