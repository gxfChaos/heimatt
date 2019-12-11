import { instance } from '../utils/http'

export const searchApi = {
    // 获取联想建议（自动补全）
    getThink(key) {
        return instance({
            url: '/app/v1_0/suggestion',
            method: 'GET',
            params: {
                q: key
            }
        })
    },
    // 获取搜索结果
    getSearchResult({ page, perpage, key }) {
        return instance({
            url: '/app/v1_0/search',
            method: 'GET',
            params: {
                page,
                per_page: perpage,
                q: key
            }
        })
    }
}