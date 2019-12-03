// 导入vue
import Vue from 'vue'
// 导入根组件
import App from './App.vue'
// 导入路由
import router from './router'
// 导入仓库
import store from './store'
// 设置为开发环境
Vue.config.productionTip = false
// vue实例
new Vue({
  router, //挂载路由到vue实例
  store, //挂载仓库到vue实例
  render: h => h(App) //渲染到app.vue
}).$mount('#app') //vue实例挂载到#app
