//引入vue对象
import Vue from "vue";
//定义、引用icons组件 组件复用
import svgIcon from "./SvgIcons.vue";
Vue.component("svg-icon",svgIcon);
//解析./svg文件夹里的所有 .svg 文件
const req = require.context("./svg", false, /\.svg$/);
const requireAll = requireContext => {    
    return requireContext.keys().map(requireContext)
}
requireAll(req);
//require.context(‘./svg’, false, /\.svg$/) 参数说明：
//第一个：目标文件夹
//第二个：是否遍历子级目录
//第三个：定义遍历文件规则