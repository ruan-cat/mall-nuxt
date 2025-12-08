import { type ApifoxModel_HomeCategoryHead } from "@/models/homeCategoryHead";
import { type UseAxiosOptions } from "@vueuse/integrations";

// 获取商品分类信息
// export const getCategoryAPI = () => {
// 	return request<any, ApifoxModel_HomeCategoryHead>({
// 		url: "/home/category/head",
// 	});
// };

/** 获取商品分类信息 */
export function getCategoryAPI<T = ApifoxModel_HomeCategoryHead>(options?: UseAxiosOptions<T>) {
	return useAxios<T>("/home/category/head", requestForUseAxios, options);
}

// () => {
// 	return request<any, ApifoxModel_HomeCategoryHead>({
// 		url: "/home/category/head",
// 	});
// };
