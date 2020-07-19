import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
//引入组件
import Layout from "@/views/Layout/index.vue"
const routes = [
  {
    path: "/",
    redirect: "/Login",
    meta: {
      name: "主页"
    },
    hidden: true
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      name: "登录"
    },
    hidden: true,
    component: () => import("../views/Login/index.vue")
  },
  {
    path: "/layout",
    name: "Layout",
    redirect: "/index",
    meta: {
      icon: "console",
      name: "控制台"
    },
    component: Layout,
    // component: () => import("../views/Layout/index.vue"),
    children: [
      {
        path: "/index",
        name: "Index",
        meta: {
          name: "首页"
        },
        component: () => import("../views/Console/index.vue")
      }
    ]
  },
  /**
   * 信息管理
   */
  {
    path: "/info",
    name: "Info",
    meta: {
      name: "信息管理",
      icon: "info"
    },
    component: Layout,
    // component: () => import("../views/Layout/index.vue"),
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta: {
          name: "信息列表"
        },
        component: () => import("../views/Info/index.vue")
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta: {
          name: "信息分类"
        },
        component: () => import("../views/Info/category.vue")
      }
    ]
  },
  /**
   * 用户管理
   */
  {
    path: "/user",
    name: "User",
    meta: {
      name: "用户管理",
      icon: "user"
    },
    component: Layout,
    // component: () => import("../views/Layout/index.vue"),
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          name: "用户列表"
        },
        component: () => import("../views/User/index.vue")
      }
    ]
  },
];

const router = new VueRouter({
  mode: "hash",
  routes
});

export default router;
