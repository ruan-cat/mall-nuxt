import { getTopCategoryAPI } from "@/apis/category";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { ref, onMounted } from "vue";

export const useCategory = () => {
	// 定义变量
	const categoryData = ref({});
	const route = useRoute();

	// 面包屑逻辑
	// 如果路由变化，会传递id到这。如果id不变，那就默认是route.params.id
	const getCategoryData = async (id = route.params.id) => {
		const res = await getTopCategoryAPI(id);
		categoryData.value = res.result;
	};
	onMounted(() => getCategoryData());
	// 路由参数变化时可以把分类数据接口重新发送
	onBeforeRouteUpdate((to) => {
		// console.log(to)
		getCategoryData(to.params.id);
	});
	return {
		categoryData,
	};
};
