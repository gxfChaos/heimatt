// 导入vue
import Vue from 'vue';
// 导入vant
import Vant, { Lazyload, ImagePreview } from 'vant';
// 导入vant css
import 'vant/lib/index.css';
// use vant
Vue.use(Vant);
Vue.use(Lazyload);
Vue.use(ImagePreview);
// 导入根组件
import App from './App.vue';
// 导入路由
import router from './router';
// 导入仓库
import store from './store';
// 导入初始化css
import './style/base.css';
// 导入字体文件
import './style/iconfont.css';
// 使用全局过滤器
import './filters/dateFilter'
// 设置为开发环境
Vue.config.productionTip = false
// vue实例
new Vue({
  router, //挂载路由到vue实例
  store, //挂载仓库到vue实例
  render: h => h(App) //渲染到app.vue
}).$mount('#app') //vue实例挂载到#app
