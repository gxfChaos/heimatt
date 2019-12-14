import { instance } from '../utils/http'

export const commentApi = {
    // 获取评论
    getComment({ artId, offset, limit }) {
        return instance({
            url: '/app/v1_0/comments',
            params: {
                type: 'a',
                source: artId,
                offset,
                limit,
            }
        })
    },
    // 获取评论回复
    getCommentReply({ comId, offset, limit }) {
        return instance({
            url: '/app/v1_0/comments',
            params: {
                type: 'c',
                source: comId,
                offset,
                limit,
            }
        })
    },

    // 添加评论
    addComment({ artId, content }) {
        return instance({
            url: "/app/v1_0/comments",
            method: 'POST',
            data: {
                target: artId,
                content
            }
        })
    },

    // 添加评论回复
    addCommentReply({ comId, content, artId }) {
        return instance({
            url: "/app/v1_0/comments",
            method: 'POST',
            data: {
                target: comId,
                content,
                art_id: artId
            }
        })
    }
}