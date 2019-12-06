// 导入vue
import Vue from 'vue';
// 导入vuex
import Vuex from 'vuex';
// 使用vuex
Vue.use(Vuex)
// 导入local方法
import { localData } from '../utils/localData'
// 暴露vuex
export default new Vuex.Store({
  state: {
    userInfo: localData.get('userToken') || {}
  },
  mutations: {
    SETINFO(state, payload) {
      state.userInfo = payload;
      // localData.set('userToken',payload);
    }
  },
  actions: {
  },
  modules: {
  }
})
