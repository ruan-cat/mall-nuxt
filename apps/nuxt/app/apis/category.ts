import request from "@/utils/request";

interface CategoryParams {
	id?: string;
	distributionSite?: string;
}

/** 获取分类数据 */
export function getTopCategoryAPI(id: string) {
	return request({
		url: "/category",
		params: { id },
	});
}

/** 获取轮播图数据 */
export function getBannerAPI(params: CategoryParams = {}) {
	const { distributionSite = "1" } = params;
	return request({
		url: "/home/banner",
		params: {
			distributionSite,
		},
	});
}

/** 获取二级分类数据 */
export function getSubCategoryAPI(id: string) {
	return request({
		url: "/category/sub/filter",
		params: { id },
	});
}

/** 获取分类基础列表数据 */
export function getSubCategoryListAPI(data: any) {
	return request({
		url: "/category/goods/temporary",
		method: "POST",
		data,
	});
}
