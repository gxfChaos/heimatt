
// 导入axios
import { instance } from '../utils/http'
import { all } from 'q'

export const channelApi = {
    // 获取用户频道列表
    list() {
        return instance({
            url: '/app/v1_0/user/channels',
            method: 'GET'
        })
    },
    // 全部频道列表
    all() {
        return instance({
            url: '/app/v1_0/channels',
            method: 'GET',
        })
    },
    // 批量修改用户频道列表（重置式）
    edit(channels) {
        return instance({
            url: '/app/v1_0/user/channels',
            method: 'PUT',
            data: {
                channels
            }
        })
    }

}