import axios from "axios";
import { useUserStore } from "@/composables/states/use-user";

// 创建axios实例
const request = axios.create({
	baseURL: "/api",
	timeout: 10000,
});

// 请求拦截器
request.interceptors.request.use(
	(config) => {
		// 从store获取token数据
		const userStore = useUserStore();
		const token = userStore.profile?.token;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// 响应拦截器
request.interceptors.response.use(
	(response) => {
		// 直接返回后端的数据
		return response.data;
	},
	(error) => {
		// 统一错误处理
		console.warn("请求错误:", error);
		if (error.response?.status === 401) {
			// 401处理: 清除用户数据，跳转登录页
			const userStore = useUserStore();
			userStore.clearUserInfo();
			// nuxt中使用navigateTo
			navigateTo("/login");
		}
		return Promise.reject(error);
	},
);

export default request;
