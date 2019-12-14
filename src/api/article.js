
// 导入axios
import { instance } from '../utils/http'

export const articleApi = {
    // 频道新闻推荐_V1.1
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
    },

    // 对文章不喜欢
    disLike(artId) {
        return instance({
            url: '/app/v1_0/article/dislikes',
            method: 'POST',
            data: {
                target: artId
            }
        })
    },

    // 对文章点赞
    like(artId) {
        return instance({
            url: '/app/v1_0/article/likings',
            method: 'POST',
            data: {
                target: artId
            }
        })
    },

    // 举报文章
    report(artId, type) {
        return instance({
            url: '/app/v1_0/article/reports',
            method: "POST",
            data: {
                target: artId,
                type,
                remark: ''
            }
        })
    },
    // 获取新闻文章详情
    getArticleDetail(artId) {
        return instance({
            url: `/app/v1_0/articles/${artId}`
        })
    }
}