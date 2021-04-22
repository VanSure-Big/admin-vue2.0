import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./router/premit";
import store from "./store";
// 导入vue3.0的Composition API
import VueCompositionApi from "@vue/composition-api";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//全局引入方法
// import global from "@/utils/global.js"
// 全局引入icons组件
import "./icons/index";
Vue.use(VueCompositionApi);
Vue.use(ElementUI);
// Vue.use(global);
Vue.config.productionTip = false;
// vue-cli3.0默认runtime运行模式 全局组件需要修改vue指向（config.js）
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
