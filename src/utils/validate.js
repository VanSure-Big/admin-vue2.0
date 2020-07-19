/**
 * 过滤特殊字符
 */
export function stripscript(str) {
  var pattern = new RegExp(
    "[`~!@#%$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？ ]"
  );
  var rs = "";
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, "");
  }
  return rs;
}

/**
 * 验证邮箱
 */
export function vaildateEmail(value) {
  let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return !reg.test(value) ? true : false;
}

/**
 * 验证密码
 *
 */
export function validatePassword(value) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return !reg.test(value) ? true : false;
}

/**
 * 验证验证码
 *
 */
export function validateCode(value) {
  let reg = /^[A-Za-z0-9]{6}$/;
  return !reg.test(value) ? true : false;
}

/**
 * 使用export时，可以存在多个
 * 文件import 需要划括号
 */
