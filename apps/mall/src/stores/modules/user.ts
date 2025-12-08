import { ref } from "vue";
import { defineStore } from "pinia";
import { loginAPI } from "@/apis/user";
import { useCartStore } from "./cart";
import { mergeCartAPI } from "@/apis/cart";
// 储存用户信息
export const useUserStore = defineStore(
	"user",
	() => {
		// 调用购物车store
		const cartStore = useCartStore();

		// 定义用户管理的state
		const userInfo = ref({});

		// 定义获取数据的action函数
		const getUserInfo = async ({ account, password }) => {
			const res = await loginAPI({ account, password });
			userInfo.value = res.result;
			// 合并购物车操作
			await mergeCartAPI(
				cartStore.cartList.map((item) => {
					return {
						skuId: item.skuId,
						selected: item.selected,
						count: item.count,
					};
				}),
			);
			cartStore.updateCartList();
		};

		// 退出时清除用户信息
		const clearUserInfo = () => {
			userInfo.value = {};
			cartStore.clearCart();
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
