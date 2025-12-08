import axios from "axios";

function createAxiosInstance() {
	const instance = axios.create({
		baseURL: "https://pcapi-xiaotuxian-front-devtest.itheima.net",

		/** 请求超时时间 */
		timeout: 10000,

		/** 允许跨域 */
		withCredentials: true,

		/** 不使用任何代理 避免本机电脑的配置影响请求 */
		proxy: false,
	});

	return instance;
}

function main() {
	const instance = createAxiosInstance();

	// const url = `https://pcapi-xiaotuxian-front-devtest.itheima.net/home/category/head`;
	const url = `https://pcapi-xiaotuxian-front-devtest.itheima.net/home/hot`;

	instance({
		url,
		method: "get",
	}).then((res) => {
		console.log(" ? ", res.data);
	});
}

main();
