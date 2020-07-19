import { GetSms } from "@/api/login";

const state = {};
const getters = {};
const mutations = {};
const actions = { //异步、同步 处理业务可以处理回调函数
      getSms(ctx, getSmsData) {
      return new Promise((resolve, reject) => {
        GetSms(getSmsData).then(response => {
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