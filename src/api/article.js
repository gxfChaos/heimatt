
// 导入axios
import { instance } from '../utils/http'

export const articleApi = {
    list(channel_id, timestamp) {
        return instance({
            url: "/app/v1_1/articles",
            method: "GET",
            params: {
                channel_id,
                timestamp: timestamp || Date.now(),
                with_top: 0
            }
        })
    }
}