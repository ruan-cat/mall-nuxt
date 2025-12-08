import request from "@/utils/request";

import { type ApifoxModel_goods } from "models/goods";
import { type UseAxiosOptions } from "@vueuse/integrations";

/** 获取商品详情 */
// export function getDetailAPI(id: string) {
// 	return request<any, ApifoxModel_goods>({
// 		url: "/goods",
// 		params: { id },
// 	});
// }

/** 获取商品详情 */
export function getDetailAPI<T = ApifoxModel_goods>(id: string, options?: UseAxiosOptions<T>) {
	return useAxios<T>("/goods", { params: { id } }, requestForUseAxios, options);
}

// 获取热榜商品
/**
 * 获取热榜商品
 * @param {Number} id - 商品id
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜
 * @param {Number} limit - 获取个数
 */
export const fetchHotGoodsAPI = ({ id, type, limit = 3 }) => {
	return request({
		url: "/goods/hot",
		params: {
			id,
			type,
			limit,
		},
	});
};
