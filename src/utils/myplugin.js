import store from '../store';

import router from '../router';

export const myplugin = {
    install(Vue) {
        Vue.prototype.$checkLogin = function () {
            let userInfo = store.state.userInfo;
            if (!userInfo || !userInfo.token) {
                router.push('/checkLogin');
                return true;
            }
            return false;
        }
    }
}