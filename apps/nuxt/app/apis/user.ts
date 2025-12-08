import request from "@/utils/request";

// 登录请求接口类型
interface LoginParams {
	account: string;
	password: string;
}

// 登录请求
export const loginAPI = (params: LoginParams) => {
	return request({
		url: "/login",
		method: "POST",
		data: params,
	});
};

interface LikeListParams {
	limit?: number;
}

/** 获取猜你喜欢数据 */
export const getLikeListAPI = ({ limit = 4 }: LikeListParams = {}) => {
	return request({
		url: "/goods/relevant",
		params: {
			limit,
		},
	});
};
