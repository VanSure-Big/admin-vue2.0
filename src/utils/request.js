import axios from "axios";
import { Message } from "element-ui";
/**
 * 拦截器
 */
//创建 BASEURL匹配环境变量下的api地址
const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devApi"; //判断是生产环境还是开发环境,此时是开发环境
//创建axios，赋给变量service
const service = axios.create({
  baseURL: BASEURL, //http://localhost:8080/devApi == http://www.web-jshtml.cn/productapi/devApi
  timeout: 15000 // 超时
});

/**
 * 请求拦截器(请求接口前，做一些数据处理)
 */
service.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器(请求接口后，返回数据进行拦截)
 */
service.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    // console.log(response);
    let data = response.data;
    //|| data.resCode ==  1003
    if (data.resCode !== 0) {
      Message.error(data.message);
      return Promise.reject(data);
    } else {
      return response;
    }
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
export default service;

/**
 * 使用export default时，不能存在多个default
 * 文件import 不需要划括号
 */
