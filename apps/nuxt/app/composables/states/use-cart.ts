import { defineStore } from "pinia";
import { ref, computed, onMounted } from "vue";
import { getCartListAPI, addCartListAPI, deleteCartListAPI } from "@/apis/cart";
import { useUserStore } from "./use-user";

interface CartItem {
	id: string;
	skuId: string;
	name: string;
	picture: string | string[];
	price: number;
	count: number;
	attrsText: string;
	selected?: boolean;
}

// API响应类型
interface ApiResponse {
	code: string;
	msg: string;
	result: any;
}

export const useCartStore = defineStore("cart", () => {
	// 获取用户状态
	const userStore = useUserStore();
	const isLogin = computed(() => !!userStore.profile.token);

	// 购物车列表
	const cartList = ref<CartItem[]>([]);

	// 更新购物车列表
	const updateCartList = async () => {
		if (isLogin.value) {
			try {
				const res = (await getCartListAPI()) as unknown as ApiResponse;
				cartList.value = res.result || [];
			} catch (error) {
				console.error("获取购物车列表失败", error);
			}
		}
	};

	// 计算商品总数
	const allCount = computed(() => {
		return cartList.value.reduce((sum, item) => sum + item.count, 0);
	});

	// 计算商品总价
	const allPrice = computed(() => {
		return cartList.value.reduce((sum, item) => sum + item.count * item.price, 0);
	});

	// 添加商品到购物车
	const addCart = async (item: CartItem) => {
		if (isLogin.value) {
			// 已登录，调用接口添加
			await addCartListAPI({ skuId: item.skuId, count: item.count });
			updateCartList();
		} else {
			// 未登录，操作本地购物车
			const goods = cartList.value.find((good) => good.skuId === item.skuId);
			if (goods) {
				// 已有该商品，增加数量
				goods.count += item.count;
			} else {
				// 没有该商品，添加到购物车
				cartList.value.push(item);
			}
		}
	};

	// 从购物车删除商品
	const deleteCart = async (skuId: string) => {
		if (isLogin.value) {
			// 已登录，调用接口删除
			await deleteCartListAPI([skuId]);
			updateCartList();
		} else {
			// 未登录，操作本地购物车
			const idx = cartList.value.findIndex((item) => item.skuId === skuId);
			cartList.value.splice(idx, 1);
		}
	};

	// 单选功能
	const singleCheck = (skuId: string, selected: boolean) => {
		const item = cartList.value.find((item) => item.skuId === skuId);
		if (item) item.selected = selected;
	};

	// 全选功能
	const allCheck = (selected: boolean) => {
		cartList.value.forEach((item) => {
			item.selected = selected;
		});
	};

	// 是否全选
	const isAll = computed(() => {
		return cartList.value.length > 0 && cartList.value.every((item) => item.selected);
	});

	// 已选择商品数量
	const selectedCount = computed(() => {
		return cartList.value.filter((item) => item.selected).reduce((sum, item) => sum + item.count, 0);
	});

	// 已选择商品总价
	const selectedPrice = computed(() => {
		return cartList.value.filter((item) => item.selected).reduce((sum, item) => sum + item.count * item.price, 0);
	});

	// 修改商品数量
	const changeCount = (skuId: string, count: number) => {
		const item = cartList.value.find((item) => item.skuId === skuId);
		if (item) item.count = count;
	};

	// 清空购物车
	const clearCart = () => {
		cartList.value = [];
	};

	// 初始化时获取购物车列表
	onMounted(() => {
		if (isLogin.value) {
			updateCartList();
		}
	});

	return {
		cartList,
		allCount,
		allPrice,
		addCart,
		deleteCart,
		updateCartList,
		singleCheck,
		allCheck,
		isAll,
		selectedCount,
		selectedPrice,
		changeCount,
		clearCart,
	};
});
