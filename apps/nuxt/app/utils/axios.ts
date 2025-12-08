import axios from "axios";

export const requestForUseAxios = axios.create({
	baseURL: "/api",
	timeout: 10000,
});

// 请求拦截器
requestForUseAxios.interceptors.request.use(
	(config) => {
		config.cancelToken = undefined;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// 响应拦截器
requestForUseAxios.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		if (axios.isCancel(error)) {
			console.log("请求已被取消");
			return Promise.resolve({ cancelled: true });
		}
		return Promise.reject(error);
	},
);
