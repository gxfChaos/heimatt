import {instance} from '../utils/http'

export const searchApi = {
    // 获取联想建议（自动补全）
    getThink(key){
        return instance({
            url:'/app/v1_0/suggestion',
            method:'GET',
            params:{
                q:key
            }
        })
    }
}