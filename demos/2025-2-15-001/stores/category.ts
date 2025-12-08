import { defineStore } from "pinia";

interface Category {
	id: number;
	name: string;
}

export const useCategoryStore = defineStore("category", () => {
	const categoryList = ref<Category[]>([]);

	async function getCategoryList() {
		const { data } = await useHttp<Category[]>("/category");
		if (data.value) {
			categoryList.value = data.value;
		}
	}

	// 在组件挂载时自动获取分类列表
	if (process.client) {
		onMounted(() => {
			if (!categoryList.value.length) {
				getCategoryList();
			}
		});
	}

	return {
		categoryList,
		getCategoryList,
	};
});
