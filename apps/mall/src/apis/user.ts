import request from "@/utils/request";
// 登录请求
export const loginAPI = ({ account, password }) => {
	return request({
		url: "/login",
		method: "POST",
		data: {
			account,
			password,
		},
	});
};
// 猜你喜欢数据请求
export const getLikeListAPI = ({ limit = 4 }) => {
	return request({
		url: "/goods/relevant",
		params: {
			limit,
		},
	});
};
