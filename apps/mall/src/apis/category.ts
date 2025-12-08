import request from "@/utils/request";

// 获取分类id的数据
export const getTopCategoryAPI = (id) => {
	return request({
		url: "/category",
		params: { id },
	});
};
// 分类数据获取
export const getBannerAPI = (params = {}) => {
	// 默认为1 商品为2
	const { distributionSite = "1" } = params;
	return request({
		url: "/home/banner",
		params: {
			distributionSite,
		},
	});
};
// 二级分类数据获取
export const getSubCategoryAPI = (id) => {
	return request({
		url: "/category/sub/filter",
		params: { id },
	});
};
// 分类基础列表数据获取
export const getSubCategoryListAPI = (data) => {
	return request({
		url: "/category/goods/temporary",
		method: "POST",
		data,
	});
};
