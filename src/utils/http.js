// 导入axios
import axios from 'axios'
// 创建axios实例对象
const instance = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn'
});
// 请求拦截器
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});
// 响应拦截器
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export {
    instance
}