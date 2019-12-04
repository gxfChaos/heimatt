
// localStorage 
export const localData = {
    // 设置
    set(name, data) {
        window.localStorage.setItem(name, JSON.stringify(data));
    },
    // 获取
    get(name) {
        return JSON.parse(window.localStorage.getItem(name));
    },
    // 删除
    remove(name) {
        window.localStorage.removeItem(name);
    }
}