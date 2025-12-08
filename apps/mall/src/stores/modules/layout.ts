import { ref } from "vue";
import { defineStore } from "pinia";
import { getCategoryAPI } from "@/apis/layout";

import { type ApifoxModel_HomeCategoryHead } from "@/models/homeCategoryHead";

export const useCategoryStore = defineStore("category", () => {
	// state 导航列表的数据管理
	const categoryList = ref<ApifoxModel_HomeCategoryHead["result"]>([]);

	// action 获取导航数据方法
	const getCategory = async () => {
		const res = await getCategoryAPI();
		categoryList.value = res.result;
		// console.log(" 准备获取导航数据 ");
		// const { data, execute } = getCategoryAPI({ immediate: true });
		// await execute();
		// console.log(" 获取导航数据完毕 data.value ", data.value);
		// if (data.value) {
		// 	categoryList.value = data?.value.result;
		// }
	};

	return {
		categoryList,
		getCategory,
	};
});
