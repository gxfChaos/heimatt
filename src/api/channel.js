
// 导入axios
import { instance } from '../utils/http'

export const channelApi = {
    // 获取用户频道列表
    list() {
        return instance({
            url: '/app/v1_0/user/channels',
            method: 'GET'
        })
    }

}