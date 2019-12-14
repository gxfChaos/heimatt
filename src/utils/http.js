// 导入axios
import axios from 'axios'
// 导入仓库
import store from '../store'
// 导入 json-bigint
import jsonbigint from 'json-bigint'
// 创建axios实例对象
const instance = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn',
    transformResponse: [function (data) {
        try {
            return jsonbigint.parse(data);
        } catch (error) {
            return JSON.parse(data);
        }
    }]
});
const refreshToken = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn',
});
// 请求拦截器
instance.interceptors.request.use(function (config) {
    // 获取token
    let userInfo = store.state.userInfo;
    // 用户登录了携带token
    if (userInfo && userInfo.token) {
        config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
// 响应拦截器
instance.interceptors.response.use(function (response) {
    return response;
}, async function (error) {
    // token失效
    if (error.response.status == 401) {
        let userInfo = store.state.userInfo;
        if (userInfo && userInfo.refresh_token) {
            let res = await refreshToken({
                url: '/app/v1_0/authorizations',
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${userInfo.refresh_token}`
                }
            });
            userInfo.token = res.data.data.token;
            store.commit('SETINFO', userInfo);
            return instance(error.config);
        }
    }
    return Promise.reject(error);
});

export {
    instance
}