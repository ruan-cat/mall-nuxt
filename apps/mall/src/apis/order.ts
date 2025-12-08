import request from "@/utils/request";

// 创建订单接口
export const createOrderAPI = (data) => {
	return request({
		url: "/member/order",
		method: "POST",
		data,
	});
};
// 获取订单详情页
export const getOrderAPI = (id) => {
	return request({
		url: `/member/order/${id}`,
	});
};
// 我的订单获取
export const getUserOrderAPI = (params) => {
	return request({
		url: "/member/order",
		method: "GET",
		params,
	});
};
