import { Register } from "@/api/login";
const state = {};
const getters = {};
const mutations = {};
const actions = { //异步、同步 处理业务可以处理回调函数
  register(ctx, requestData) {
    return new Promise((resolve, reject) => {
      Register(requestData).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      });
    })
  }
}
//暴露出去
export default {
  //vuex命名方法
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};