import { GetSms, Register, Login } from "@/api/login";
import { setToKen, setuserName, getuserName, removeToKen, removeuserName } from "@/utils/app";
const state = {
  toKen: "",
  userName: getuserName() || ""
};
const getters = {};
const mutations = {
  SET_TOKEN(state, value) {
    state.toKen = value
  },
  SET_USERNAME(state, value) {
    state.userName =value
  }
};
const actions = { //异步、同步 处理业务可以处理回调函数
  exit(cxt){
    return new Promise((resolve,reject) => {
      console.log(state.toKen);
      console.log(state.userName);
      removeToKen();
      removeuserName();
      cxt.commit("SET_TOKEN", "")
      cxt.commit("SET_USERNAME", "")
      console.log('退出成功！');
      resolve()
    })
  },
  login(ctx, loginData) {
    return new Promise((resolve, reject) => {
      Login(loginData).then(response => {
        let data = response.data.data;
        //vuex存储
        ctx.commit("SET_TOKEN", data.token);
        ctx.commit("SET_USERNAME", data.username);
        //cookie存储
        setToKen(data.token)
        setuserName(data.username)
        //后台返回的toKen存起来
        resolve(response)
      }).catch(error => {
        reject(error)
      });
    })
  },
  getSms(ctx, getSmsData) {
    return new Promise((resolve, reject) => {
      GetSms(getSmsData).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      });
    })
  },
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
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
