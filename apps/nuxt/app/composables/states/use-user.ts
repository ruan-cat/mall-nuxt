import { defineStore } from "pinia";
import { loginAPI } from "@/apis/user";

// API响应类型
interface ApiResponse {
	code: string;
	msg: string;
	result: any;
}

interface Profile {
	id: string;
	account: string;
	mobile: string;
	token: string;
	avatar: string;
	nickname: string;
	gender: string;
	birthday: string;
	cityCode: string;
	provinceCode: string;
	profession: string;
}

interface LoginParams {
	account: string;
	password: string;
}

export const useUserStore = defineStore(
	"user",
	() => {
		const profile = ref<Profile>({
			id: "",
			account: "",
			mobile: "",
			token: "",
			avatar: "",
			nickname: "",
			gender: "",
			birthday: "",
			cityCode: "",
			provinceCode: "",
			profession: "",
		});

		// 登录获取用户信息
		const getUserInfo = async ({ account, password }: LoginParams) => {
			try {
				const res = (await loginAPI({ account, password })) as unknown as ApiResponse;
				// 存储用户信息到state
				profile.value = res.result;
				// 返回用户信息
				return res.result;
			} catch (error) {
				// 登录失败时抛出错误
				return Promise.reject(error);
			}
		};

		function setUser(payload: Profile) {
			profile.value = payload;
		}

		function logout() {
			profile.value = {
				id: "",
				account: "",
				mobile: "",
				token: "",
				avatar: "",
				nickname: "",
				gender: "",
				birthday: "",
				cityCode: "",
				provinceCode: "",
				profession: "",
			};

			// 退出登录后可以执行其他操作，如跳转到首页
			navigateTo("/");
		}

		// 为了兼容Nav组件中的调用，添加clearUserInfo方法作为logout的别名
		function clearUserInfo() {
			logout();
		}

		return {
			profile,
			getUserInfo,
			setUser,
			logout,
			clearUserInfo,
		};
	},
	{
		// 持久化配置
		persist: true,
	},
);
