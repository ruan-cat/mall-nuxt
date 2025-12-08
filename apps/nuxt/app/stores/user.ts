import { ref } from "vue";
import { defineStore } from "pinia";
import { loginAPI } from "@/apis/user";

// 用户信息类型
export interface UserInfo {
	token?: string;
	nickname?: string;
	account?: string;
	avatar?: string;
	mobile?: string;
	gender?: string;
	id?: string;
	[key: string]: any;
}

// 储存用户信息
export const useUserStore = defineStore(
	"user",
	() => {
		// 定义用户管理的state
		const userInfo = ref<UserInfo>({});

		// 定义获取数据的action函数
		const getUserInfo = async ({ account, password }: { account: string; password: string }) => {
			try {
				const res = await loginAPI({ account, password });
				userInfo.value = res.result;
				return res;
			} catch (error) {
				console.error("登录失败:", error);
				throw error;
			}
		};

		// 退出时清除用户信息
		const clearUserInfo = () => {
			userInfo.value = {};
		};

		return {
			getUserInfo,
			userInfo,
			clearUserInfo,
		};
	},
	{
		persist: true,
	},
);
