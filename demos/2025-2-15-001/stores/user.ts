import { defineStore } from "pinia";

interface UserInfo {
	token: string;
	nickname: string;
}

export const useUserStore = defineStore("user", () => {
	// 使用组合式API写法，更符合Nuxt3的风格
	const userInfo = ref<UserInfo>({
		token: "",
		nickname: "",
	});

	function clearUserInfo() {
		userInfo.value = {
			token: "",
			nickname: "",
		};
	}

	return {
		userInfo,
		clearUserInfo,
	};
});
