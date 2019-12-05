// 导入vue
import Vue from 'vue';
// 导入路由
import VueRouter from 'vue-router';
// 导入组件
import login from '@/views/login';
import home from '../views/home';
import layout from '../views/layout';
import my from '../views/my';
// use路由
Vue.use(VueRouter);
// 暴露路由
export default new VueRouter({
  routes: [
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: '/layout',
      component: layout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: home
        },
        {
          path:'/my',
          name:'my',
          component:my
        }
      ]
    }
  ]
});
