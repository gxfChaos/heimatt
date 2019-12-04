// 导入vue
import Vue from 'vue';
// 导入路由
import VueRouter from 'vue-router';
// 导入组件
import login from '@/views/login';
// use路由
Vue.use(VueRouter);
// 暴露路由
export default new VueRouter({
  routes: [
    {
      path: "/login",
      name: "login",
      component: login
    }
  ]
});
