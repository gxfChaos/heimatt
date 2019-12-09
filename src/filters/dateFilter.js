import Vue from 'vue';

// 加载语言包
import dayjs from 'dayjs';
// 全局使用简体中文 
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
// 加载相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime';
// 使用相对时间插件
dayjs.extend(relativeTime);

Vue.filter('dateFilter', (value) => {
    return dayjs().from(dayjs(value));
})