import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "@/stores";
import { addCartListAPI, getCartListAPI, deleteCartListAPI } from "@/apis/cart";

export const useCartStore = defineStore(
	"cart",
	() => {
		// 获取token
		const userStore = useUserStore();
		const isLogin = computed(() => userStore.userInfo.token);
		const updateCartList = async () => {
			const res = await getCartListAPI();
			cartList.value = res.result;
		};
		// 定义state
		const cartList = ref([]);
		// 定义action
		// 添加购物车
		const addCart = async (goods) => {
			// 判断是否登录
			const { skuId, count } = goods;
			if (isLogin.value) {
				// 登录之后加入购物车逻辑
				await addCartListAPI({ skuId, count });
				updateCartList();
			} else {
				// 未登录
				const item = cartList.value.find((item) => goods.skuId === item.skuId);
				// 如果已添加过
				if (item) {
					item.count += goods.count;
				} else {
					// 如果没添加
					cartList.value.push(goods);
				}
			}
		};
		// 删除购物车商品
		const deleteCart = async (skuId) => {
			if (isLogin.value) {
				await deleteCartListAPI([skuId]);
				updateCartList();
			} else {
				const idx = cartList.value.findIndex((item) => skuId === item.skuId);
				cartList.value.splice(idx, 1);
			}
		};
		// 计算总数
		const allCount = computed(() => {
			return cartList.value.reduce((sum, item) => sum + item.count, 0);
		});
		// 计算总价
		const allPrice = computed(() => {
			return cartList.value.reduce((sum, item) => sum + item.count * item.price, 0);
		});
		// 单选功能
		const singleCheck = (skuId, selected) => {
			const item = cartList.value.find((item) => item.skuId === skuId);
			item.selected = selected;
		};
		// 全选功能
		const allCheck = (selected) => {
			cartList.value.forEach((item) => {
				item.selected = selected;
			});
		};
		// 是否全选计算属性
		const isAll = computed(() => {
			return cartList.value.every((item) => item.selected);
		});
		// 购物车勾选数量
		const selectedCount = computed(() => {
			return cartList.value.filter((item) => item.selected).reduce((sum, item) => sum + item.count, 0);
		});
		// 购物车勾选总价
		const selectedPrice = computed(() => {
			return cartList.value.filter((item) => item.selected).reduce((sum, item) => sum + item.count * item.price, 0);
		});
		// 改变商品数量
		const changeCount = (skuId, count) => {
			const item = cartList.value.find((item) => item.skuId === skuId);
			item.count = count;
		};
		// 清空购物车
		const clearCart = () => {
			cartList.value = [];
		};
		return {
			addCart,
			cartList,
			deleteCart,
			allCount,
			allPrice,
			singleCheck,
			allCheck,
			isAll,
			selectedCount,
			selectedPrice,
			changeCount,
			clearCart,
			updateCartList,
		};
	},
	{ persist: true },
);
