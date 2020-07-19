import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 导入vue3.0的Composition API
import VueCompositionApi from "@vue/composition-api";
// 全局引入icons组件
import "./icons/index"
Vue.use(VueCompositionApi);
Vue.use(ElementUI);
Vue.config.productionTip = false;
// vue-cli3.0默认runtime运行模式 全局组件需要修改vue指向（config.js）
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
