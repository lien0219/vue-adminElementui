// 品牌管理接口

import request from "@/utils/request";

// /admin/product/baseTrademark/{page}/{limit}  品牌列表接口
export const reqTradeMarkList = (page, limit) =>
  request({
    url: `/admin/product/baseTrademark/${page}/${limit} `,
    method: "get",
  });

//  /admin/product/baseTrademark/save  新增品牌  post 两个参数
//  /admin/product/baseTrademark/update 修改品牌 put 三个参数
export const reqAddOrUpdateTradeMark = (tradeMark) => {
  // ID带给服务器  修改
  if (tradeMark.id) {
    return request({
      url: "/admin/product/baseTrademark/update",
      method: "put",
      data: tradeMark,
    });
  } else {
    // 新增
    return request({
      url: "/admin/product/baseTrademark/save",
      method: "post",
      data: tradeMark,
    });
  }
};

// 删除品牌  /admin/product/baseTrademark/remove/{id}

export const reqDeleteTradeMark = (id) => {
  request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: "delete",
  });
};
