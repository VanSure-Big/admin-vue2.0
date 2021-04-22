import router from "./index";
import store from "../store/index"
//引入方法
import { getToKen, removeToKen, removeuserName } from "@/utils/app";
const whiteRouter = ['/login']; // 创建路由白名单
//路由守卫
router.beforeEach((to, from, next) => {
  // to 即将进入的路由地址
  // from 上一个路由地址
  if( getToKen()) {
    // console.log(to.path);
    if (to.path === '/login') {
      //清除token username
      removeToKen();
      removeuserName();
      store.commit("login/SET_TOKEN","")
      store.commit("login/SET_USERNAME","")
      next();
    }else{
      next();
    }
  }else{
    if(whiteRouter.indexOf(to.path) !== -1) { // indexOf方法，判断数组中是否存有指定的某个对象，如果不存在就返回-1
      next();
    }else{
      next('/login');
    }
  }
})
/**
 * 1、第一次在导航中直接进入index页面时，参数to被改变成 "./index"，触发路由指向，执行beforeEach()
 * 2、再一次next指向login，再次发生路由指向，再次执行beforeEach()，参数to被改变成 "./login"
 * 3、白名单判断存在，直接执行next(). 因为没有参数，所以不会再次执行beforeEach()
 */