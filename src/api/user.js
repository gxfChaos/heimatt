
// 导入http
import { instance } from '../utils/http'

export const userApi = {
    // 登录认证
    login(data) {
        return instance({
            url: '/app/v1_0/authorizations',
            method: 'post',
            data
        })
    }
}
