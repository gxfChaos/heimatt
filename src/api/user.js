
// 导入http
import { instance } from '../utils/http'

export const userApi = {
    // 登录认证
    login(data) {
        return instance({
            url: '/app/v1_0/authorizations',
            method: 'POST',
            data
        })
    },
    // 拉黑用户
    blackList(autId) {
        return instance({
            url: '/app/v1_0/user/blacklists',
            method: 'POST',
            data: {
                target: autId
            }
        })
    },
    // 关注用户
    follow(autId) {
        return instance({
            url: "/app/v1_0/user/followings",
            method: 'POST',
            data: {
                target: autId
            }
        })
    },
    // 取消关注用户
    unfollow(autId) {
        return instance({
            url: `/app/v1_0/user/followings/${autId}`,
            method: 'DELETE',
        })
    },

    // 获取用户自己信息
    getSelfInfo() {
        return instance({
            url: "/app/v1_0/user"
        })
    }
}
