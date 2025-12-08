// https://prazdevs.github.io/pinia-plugin-persistedstate/frameworks/nuxt-3.html
import { createPersistedState } from "pinia-plugin-persistedstate";

export default defineNuxtPlugin((nuxtApp) => {
	// 只在客户端环境注册插件
	if (process.client) {
		// @ts-expect-error - nuxtApp.$pinia存在但TS无法识别
		nuxtApp.$pinia.use(createPersistedState());
	}
});
