import request from "@/utils/request";
import type { ApifoxModel_HomeCategoryHead } from "@/models/homeCategoryHead";
import type { UseAxiosOptions } from "@vueuse/integrations";
import { requestForUseAxios } from "@/utils/axios";

/** 获取商品分类信息 */
export function getCategoryAPI<T = ApifoxModel_HomeCategoryHead>(options?: UseAxiosOptions<T>) {
	return useAxios<T>("/home/category/head", requestForUseAxios, options);
}
