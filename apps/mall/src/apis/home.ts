import request from "@/utils/request";

import { GoodsProductAPI } from "@/models/goods";

// 获取轮播图数据
export const getBannerAPI = () => {
	return request({
		url: "/home/banner",
	});
};
// 获取新鲜好物数据
export const getNewGoodsAPI = () => {
	return request({
		url: "/home/new",
	});
};
// 获取人气好物数据
export const getHotGoodsAPI = () => {
	return request({
		url: "home/hot",
	});
};

// 获取商品数据
export const getGoodsProductAPI = () => {
	return request<any, GoodsProductAPI>({
		url: "/home/goods",
	});
};
