import { defineStore } from "pinia";

interface CartItem {
	skuId: string;
	name: string;
	picture: string | string[];
	price: number;
	count: number;
	attrsText: string;
}

export const useCartStore = defineStore("cart", () => {
	const cartList = ref<CartItem[]>([]);

	const allCount = computed(() => cartList.value.reduce((sum, item) => sum + item.count, 0));

	const allPrice = computed(() => cartList.value.reduce((sum, item) => sum + item.count * item.price, 0));

	function deleteCart(skuId: string) {
		const index = cartList.value.findIndex((item) => item.skuId === skuId);
		if (index > -1) {
			cartList.value.splice(index, 1);
		}
	}

	return {
		cartList,
		allCount,
		allPrice,
		deleteCart,
	};
});
