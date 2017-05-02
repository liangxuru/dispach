import Vue from 'vue'
import VueResource from 'vue-resource'
import { default as message } from 'lib/message'
import router from '../router/index'


//启用http请求插件
Vue.use(VueResource);
Vue.http.options.xhr = {withCredentials: true};
//请求拦截
const TIMEOUT = 5000;
var request = (options) => {
    return Promise.all([Vue.http({
        headers: options.headers,
        url: options.url,
        method: options.method,
        body: options.body,
        params: options.params,
        timeout: TIMEOUT
    })]).then(response => {debugger;
        var result = response[0].body;
        if(result.StatusCode == 200){
        	return result.Value;
        }else if(result.StatusCode == 400){
            message.error(result.ErrorMessage);
        }else if(result.StatusCode == 302){
            router.replace('/login');
        }
    }).catch((response)=>{
        message.error('path route error~~');
    });
}

//http请求方式
export const http = {};
['get', 'post', 'put', 'delete'].forEach(method => {
    http[method] = (url, params, headers = {}) => {
        if (method === 'get') {
            return request({ url, params, method: method, headers: headers });
        }
        return request({ url, body: params, method: method, headers: headers });
    };
});