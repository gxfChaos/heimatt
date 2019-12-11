// 导入vue
import Vue from 'vue';
// 导入路由
import VueRouter from 'vue-router';
// 导入组件
import login from '@/views/login';
import home from '../views/home';
import layout from '../views/layout';
import my from '../views/my';
import search from '../views/search'
import searchResult from '../views/searchResult'
import { articleDetail } from '../views/articleDetail'
// use路由
Vue.use(VueRouter);
// 暴露路由
export default new VueRouter({
  routes: [
    // 登录
    {
      path: "/login",
      name: "login",
      component: login
    },
    // 登录-验证
    {
      path: '/checkLogin',
      name: 'checkLogin',
      component: login
    },
    // layout
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
          path: '/my',
          name: 'my',
          component: my
        },
        {
          path: '/search',
          name: 'search',
          component: search
        }
      ]
    },
    // 搜索结果
    {
      path: '/searchResult/:key',
      name: 'searchResult',
      component: searchResult
    },
    // 文章详情
    {
      path: '/articleDetail/:artId',
      name: 'articleDetail',
      component: articleDetail
    }
  ]
});
