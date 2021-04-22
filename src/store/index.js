import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import app from "./modules/app";
import login from "./modules/login";
//这里用了模块化处理方法vue实例需要调用方法和值时需要加上模块名称例如 context.root.$store.state.app.isCollapse&&app/SET_COLLAPSE
export default new Vuex.Store({
  state: {},
  // 修改state值
  mutations: {},
  // 异步、同步 处理业务可以处理回调函数
  actions: {
  },
  // 模块化处理数据
  modules: {
    app,
    login
  }
});
