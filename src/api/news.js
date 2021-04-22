import service from "@/utils/request.js";

/**
 * 一级分类添加
 */
export function AddfristCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data
  });
}
/**
 * 子集分类查询
 */
export function SelectCategory() {
  return service.request({
    method: "post",
    url: "/news/getCategoryAll/",
  });
}
