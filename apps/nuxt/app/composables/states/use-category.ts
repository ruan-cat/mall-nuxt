import { defineStore } from "pinia";
import { getCategoryAPI } from "@/apis/layout";
import type { ApifoxModel_HomeCategoryHead } from "@/models/homeCategoryHead";

export const useCategoryStore = defineStore("category", () => {
	const categoryList = ref<ApifoxModel_HomeCategoryHead[]>([]);

	async function getCategory() {
		const { data } = await getCategoryAPI();
		// @ts-ignore
		categoryList.value = data.result;
	}

	return {
		categoryList,
		getCategory,
	};
});
