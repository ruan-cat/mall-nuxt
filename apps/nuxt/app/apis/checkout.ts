import request from "@/utils/request";

/** 获取订单信息 */
export function getCheckInfoAPI() {
	return request({
		url: "/member/order/pre",
	});
}
