import request from "@/utils/request";

interface CartParams {
	skuId: string;
	count: number;
}

/** 加入购物车 */
export function addCartListAPI({ skuId, count }: CartParams) {
	return request({
		url: "/member/cart",
		method: "POST",
		data: {
			skuId,
			count,
		},
	});
}

/** 获取购物车列表 */
export function getCartListAPI() {
	return request({
		url: "/member/cart",
	});
}

/** 删除购物车商品 */
export function deleteCartListAPI(ids: string[]) {
	return request({
		url: "/member/cart",
		method: "DELETE",
		data: {
			ids,
		},
	});
}

/** 合并购物车 */
export function mergeCartAPI(data: any) {
	return request({
		url: "/member/cart/merge",
		method: "POST",
		data,
	});
}
