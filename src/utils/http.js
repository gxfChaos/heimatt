// 导入axios
import axios from 'axios'
// 导入仓库
import store from '../store'
// 创建axios实例对象
const instance = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn'
});
// 请求拦截器
instance.interceptors.request.use(function (config) {
    // // 获取token
    let token = store.state.userInfo.token;
    // 用户登录了携带token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
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