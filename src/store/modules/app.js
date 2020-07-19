const state = {
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
};
const getters = {
  isCollapse: state => state.isCollapse
};
const mutations = {  // 同步 没有回调处理事情
  //state必须传，可以不传value
  SET_COLLAPSE(state){
    state.isCollapse = !state.isCollapse
    //html5本地存储
    sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
  }
};
const actions = { //异步、同步 处理业务可以处理回调函数
  // return new Promise((resolve, reject) =>{})
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};