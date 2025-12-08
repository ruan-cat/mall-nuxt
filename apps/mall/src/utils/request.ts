import axios from "axios";
import { useUserStore } from "@/stores/index";
import { ElMessage } from "element-plus";
import router from "@/router";

/**
 * 创建axios实例
 */
export function createAxiosInstance() {
	const instance = axios.create({
		// https://pcapi-xiaotuxian-front-devtest.itheima.net
		baseURL: import.meta.env.VITE_base_url,

		// 请求超时时间
		timeout: 10000,
	});

	return instance;
}

/** 创建本项目最通用的请求实例 */
export function createRequest() {
	/**
	 * 通用的，标准的请求实例
	 */
	const request = createAxiosInstance();

	// 设置 axios 请求拦截器
	request.interceptors.request.use(
		function onFulfilled(config) {
			// 1.从pinia获取token数据
			const userStore = useUserStore();
			// @ts-ignore
			const token = userStore.userInfo.token;
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},

		function onRejected(error) {
			return Promise.reject(error);
		},
	);

	// 设置 axios 响应拦截器
	request.interceptors.response.use(
		function onFulfilled(value) {
			// 这里决定了 每一个接口返回值的数据 都默认完成data数据解包。
			return value.data;
		},

		function onRejected(error) {
			// 统一响应错误
			const userStore = useUserStore();
			console.warn(" 出现请求错误 错误如下： ", error);
			ElMessage.warning(error.response.data.message);
			// 401token失效处理
			// 1.清除用户数据
			// 2.跳转登录页
			if (error.response.status === 401) {
				userStore.clearUserInfo();
				router.push("/login");
			}
			return Promise.reject(error);
		},
	);

	return request;
}

/**
 * 通用的，标准的请求实例
 * @description
 * 本文件的默认导出
 */
const request = createRequest();

export default request;

/**
 * 创建用于useAxios的axios实例
 * @description
 * useAxios 使用具体的示例时，其拦截器是默认使用返回原来的数据的。
 *
 * 并不会使用我们配置的拦截器。
 *
 * 因此本实例将默认保持返回值为原值。
 */
export function createRequestForUseAxios() {
	/**
	 * 用于useAxios的axios实例
	 */
	const requestForUseAxios = createAxiosInstance();

	// 设置 axios 请求拦截器
	requestForUseAxios.interceptors.request.use(
		function onFulfilled(config) {
			// 1.从pinia获取token数据
			const userStore = useUserStore();
			// @ts-ignore
			const token = userStore.userInfo.token;
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},

		function onRejected(error) {
			return Promise.reject(error);
		},
	);

	// 设置 axios 响应拦截器
	requestForUseAxios.interceptors.response.use(
		function onFulfilled(value) {
			// 不做任何解包
			return value;
		},

		function onRejected(error) {
			// 统一响应错误
			const userStore = useUserStore();
			console.warn(" 出现请求错误 错误如下： ", error);
			ElMessage.warning(error.response.data.message);
			// 401token失效处理
			// 1.清除用户数据
			// 2.跳转登录页
			if (error.response.status === 401) {
				userStore.clearUserInfo();
				router.push("/login");
			}
			return Promise.reject(error);
		},
	);

	return requestForUseAxios;
}

export const requestForUseAxios = createRequestForUseAxios();
