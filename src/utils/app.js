import cookie from "cookie_js";
//获取存储ToKen值
const adminToKen = "admin_toKen";

export function setToKen(toKen) {
  return cookie.set(adminToKen, toKen)
}
export function getToKen() {
  return cookie.get(adminToKen)
};
export function removeToKen() {
  return cookie.remove(adminToKen)
}
//获取存储userName值
const adminUserName = "admin_UserName";

export function setuserName(value) {
  return cookie.set(adminUserName, value)
}
export function getuserName() {
  return cookie.get(adminUserName)
}
export function removeuserName() {
  return cookie.remove(adminUserName)
}
//从vuex login.js中获取