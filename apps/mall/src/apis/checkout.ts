import request from "@/utils/request";

// 获取订单信息
export const getCheckInfoAPI = () => {
	return request({
		url: "/member/order/pre",
	});
};
