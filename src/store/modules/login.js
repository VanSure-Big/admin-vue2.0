
import { Login } from "@/api/login";
const state = {};
const getters = {};
const mutations = {};
const actions = { //异步、同步 处理业务可以处理回调函数
  login(ctx, loginData) {
    return new Promise((resolve, reject) => {
      Login(loginData).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      });
    })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
