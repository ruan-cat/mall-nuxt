import request from "@/utils/request";
import type { GoodsProductAPI } from "@/models/goods";

/** 获取轮播图数据 */
export function getBannerAPI() {
	return request({
		url: "/home/banner",
	});
}

/** 获取新鲜好物数据 */
export function getNewGoodsAPI() {
	return request({
		url: "/home/new",
	});
}

/** 获取人气好物数据 */
export function getHotGoodsAPI() {
	return request({
		url: "home/hot",
	});
}

/** 获取商品数据 */
export function getGoodsProductAPI() {
	return request<any, GoodsProductAPI>({
		url: "/home/goods",
	});
}
