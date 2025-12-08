import request from "@/utils/request";

interface CreateOrderData {
	[key: string]: any;
}

interface GetOrderParams {
	orderState?: number;
	page?: number;
	pageSize?: number;
}

/** 创建订单 */
export function createOrderAPI(data: CreateOrderData) {
	return request({
		url: "/member/order",
		method: "POST",
		data,
	});
}

/** 获取订单详情 */
export function getOrderAPI(id: string) {
	return request({
		url: `/member/order/${id}`,
	});
}

/** 获取订单列表 */
export function getUserOrderAPI(params: GetOrderParams) {
	return request({
		url: "/member/order",
		method: "GET",
		params,
	});
}
